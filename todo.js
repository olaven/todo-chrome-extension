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
            //this is an event, not the raw todo-string  
            if(typeof todo != "string"){
                todo = todo.target.innerHTML; 
            }
            app.input = "";
            //filter from done
            app.done = app.done.filter(t => t !== todo); 
            app.todos.push(todo); 

            app.updateStorage(); 
        }, 
        setDone : (todo) => {
            if(todo instanceof Event){
                todo = todo.target.innerHTML; 
            }
            //filter from todos and add to done 
            app.todos = app.todos.filter(t => t !== todo); 
            app.done.unshift(todo);

            app.updateStorage(); 
        },
        cleanDone : () => {
            app.done = []; 
            app.updateStorage();   
        }, 
        updateStorage: () => {
            console.log("todos: ");
            console.log(app.todos);
            console.log("done: "); 
            console.log(app.done);

            chrome.storage.sync.set({ todos: app.todos });
            chrome.storage.sync.set({ done: app.done });
        }, 
    }
}); 


