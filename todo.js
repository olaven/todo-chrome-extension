const KEY_ENTER = 13; 

//NOTE: REFACTOR 

let app = new Vue({
    el : "#app",
    data : {
        input : "",
        inputPlaceholder : "Enter todo here",
        todos : [], 
        done : []
    }, 
    init(){
        chrome.storage.sync.get(["todos"], result => {
            for(todo of result.todos){
                app.setTodo(todo); 
            } 
        });
        chrome.storage.sync.get(["done"], result => {
            for(todo of result.done){
                app.setDone(todo); 
            }
        });
    },
    methods : {
        handleKeyDown : (event) => {
            if(event.keyCode == KEY_ENTER && app.input != ""){
                app.setTodo(app.input); 
            } 
        }, 
        setTodo : (todo) => {
            app.set(todo, app.done, app.todos);
            app.updateStorage(); 
        }, 
        setDone : (todo) => {
            app.input = ""; 
            app.set(todo, app.todos, app.done); 
            app.updateStorage(); 
        },
        cleanDone : () => {
            app.done = []; 
            app.updateStorage();   
        }, 
        updateStorage: () => {
            console.log("-------------------------------"); 
            console.log(app.todos); 
            console.log(app.done); 

            chrome.storage.sync.set({ todos: app.todos });
            chrome.storage.sync.set({ done: app.done });
        },
        //sets todo and removes from done or oposite + application specific details 
        set : (item, setFrom, setTo) => {
            if(item instanceof Event){
                item = item.target.innerHTML; 
            }
            app.moveBetweenArrays(item, setFrom, setTo); 
        }, 
        //adds item to one array and removes from the other 
        moveBetweenArrays: (item, removeFrom, addTo) => {
            removeFrom.filter(x => x !== item); 
            addTo.push(item); 
        }
    }
}); 
