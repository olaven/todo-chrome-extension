const KEY_ENTER = 13; 

let app = new Vue({
    el : "#app", 
    data : {
        header : "Todo app", 
        input : "",
        todos : [], 
        done : []
    }, 
    methods : {
        handleKeyDown : (event) => {
            if(event.keyCode == KEY_ENTER){
                app.setTodo(app.input); 
            } 
        }, 
        setTodo : (todo) => {
            if(typeof todo != "string"){
                //this is an event, not the raw todo-string  
                todo = todo.target.innerHTML; 
            }
            app.input = "";
            //filter from done
            app.done = app.done.filter(d => d !== todo); 
            app.todos.unshift(todo); 
        }, 
        setDone : (event) => {
            let todo = event.target.innerHTML; 
            //filter from todos and add to done 
            app.todos = app.todos.filter(t => t !== todo); 
            app.done.unshift(todo); 
        }
    }
}); 
