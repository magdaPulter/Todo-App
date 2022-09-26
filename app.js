
// initial variables 
const newTodoInput = document.querySelector('.new-todo')
const newTodosList = document.getElementById('new-todos-list')

// Create the new todo
class NewTodo{
    constructor(title){
        this.title = title
    }

    render(){
        const todo = document.createElement('div')
        todo.className = 'todo'
        todo.innerHTML = `
                <div class="check-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                </div>
                <p> ${this.title} </p>
                <img class="delete-btn" src="images/icon-cross.svg" alt="">
        `
        newTodosList.append(todo)
        newTodoInput.value = ''
    }
}

class TodoAdded{
    constructor() {}

    items = []
    itemsLeftQty = 0

    createTodo() {
        newTodoInput.addEventListener('keypress',(e) => {
            if(e.key === 'Enter'){
                if(newTodoInput.value !== ''){
                    const newTodo = new NewTodo(newTodoInput.value)
                    newTodo.render()  
                }
                const itemsLeftQty = document.querySelector('.items-left')
                itemsLeftQty.innerHTML = `${this.howManyItemsLeft()} items left`
            }            
        })
    }

    checkCompleted(){   
        newTodosList.addEventListener('click', (e) => {
            if(e.target.classList.contains('check-box')){
                e.target.classList.toggle('checked')
                e.target.nextElementSibling.classList.toggle('clicked')
            }   
            const itemsLeftQty = document.querySelector('.items-left')
            itemsLeftQty.innerHTML = `${this.howManyItemsLeft()} items left`
        })
        
    }

    howManyItemsLeft(){
        const activeTodos = this.showStatusActive()
        const itemsLeft = this.items.concat(activeTodos)
        this.itemsLeftQty = itemsLeft.length

        return  this.itemsLeftQty
    }

    clearStatus() {
        const todos = document.querySelectorAll('#new-todos-list .check-box')
        todos.forEach(t => {
            t.parentElement.style.display = 'flex'
        })
    }

    showStatusComplete(){
        const todos = document.querySelectorAll('#new-todos-list .check-box')
        const todosArr = Array.from(todos)
        const activeTodos = todosArr.filter(t => !t.classList.contains('checked'))
        const completeTodos = todosArr.filter(x => !activeTodos.includes(x))

        return completeTodos
    }

    showStatusActive(){
        const todos = document.querySelectorAll('#new-todos-list .check-box')
        const todosArr = Array.from(todos)
        const activeTodos = todosArr.filter(t => !t.classList.contains('checked'))

        return activeTodos
    }

    showLastRow(){
        const content = document.querySelector('.content')
        const lastRowElement = document.createElement('div')
        lastRowElement.className = 'todo last-row'
        lastRowElement.innerHTML = `
                <button class="items-left"> 0 items left</button>
                 <div class="status mobile">
                    <button class="all">All</button>
                    <button class="active">Active</button>
                    <button class="completed">Completed</button>
                 </div>
                 <button class="clr-completed">Clear Completed</button>
                 `
        content.append(lastRowElement)
    }

    showAll(){
        const all = document.querySelector('.all')
        all.addEventListener('click', () => {
            this.clearStatus()
        })
    }

    showActive(){
        const active = document.querySelector('.active')
        active.addEventListener('click', () => {
            this.clearStatus()    
            const completeTodos = this.showStatusComplete()
            completeTodos.forEach(t => t.parentElement.style.display = 'none')
        })
    }

    showCompleted(){
        const completed = document.querySelector('.completed')
        completed.addEventListener('click', () => {
            this.clearStatus()       
            const activeTodos = this.showStatusActive()
            activeTodos.forEach(t => t.parentElement.style.display = 'none')
        })
    }

    clearCompleted(){
        const clearBtn = document.querySelector('.clr-completed')
        clearBtn.addEventListener('click', () => {
            const completeTodos = this.showStatusComplete()
            
            completeTodos.forEach(t => {
                t.parentElement.remove()
            })
            this.clearStatus()
        })
    }

    delete(){
        newTodosList.addEventListener('click', (e) => {
            if(e.target.classList.contains('delete-btn')){
                e.target.parentElement.remove()
            }
        })
    }

    changeMode(){
        const modeBtn = document.querySelectorAll('.nav img')
        modeBtn.forEach(b => {
            b.addEventListener('click', () => {
                document.querySelector('body').classList.toggle('light-mode')
            })
        })
    }


}

class App{
    static init(){

        // Create new todo instances
        const todoAdded = new TodoAdded()

        // Add new todo to the list 
        todoAdded.createTodo()

        // Delete todo from the list 
        todoAdded.delete()

        // Check completed todo
        todoAdded.checkCompleted()

        // Render last row
        todoAdded.showLastRow()

        //Filter by all/active/complete todos 
        todoAdded.showCompleted()
        todoAdded.showActive()
        todoAdded.showAll()

        // Clear all completed todos 
        todoAdded.clearCompleted()

        // Toggle light and dark modeconst 
        todoAdded.changeMode()
    }
}

// Render Application 
App.init()