// tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardbody = document.querySelectorAll(".card-body")[0];
const secondCardbody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // tüm event listenerlar
    form.addEventListener("submit",addTodo); // eklendi silindi gibi uyarı mesajlarını veriyor
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);//storage den verileri çekmemizi saglıyor sayfa yenilenince verler yerinde kalıyor
    document.addEventListener("click",deleteTodo);//silme butonunda basıtgımızda o todo yu silmek için.
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}
function clearAllTodos(){
    
    if (confirm("tümünü silmek istediginize emin misiniz ?")) {
        
        //arayüzden todolaro temizleme
        todoList.innerHTML = " "; // yavaş
      
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    
    
    }
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItem = document.querySelectorAll(".list-group-item");

    listItem.forEach(function(listItem){
      
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1){
            // Bulunamadı

            listItem.setAttribute("style","display : none !important");
        }
        else{

            listItem.setAttribute("style","display : block");

        }



    });

}


function deleteTodo(e){
    
    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();//2 parent ını alıp sildik
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent.trim());
        showAlert("success","todo başarıyla silindi..."); // alert fonsyonumuzu çagırdık uyarı yazdırdık.
    }
     
}
function deleteTodoFromStorage(deletetodo){//todoları silince aynı zamanda storage dan silme
    let todos = getTodosFromStorage();

     todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1); // arryden degeri silebiliriz.
        }

        
     });
     
     localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
        
    });

}
function addTodo(e){

    const newTodo = todoInput.value.trim();

    if (newTodo === ""){
 
        showAlert("warning","lütfen bi todo girin");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","todo başarıyla eklendi");
    }

    





 e.preventDefault();
}
function getTodosFromStorage(){ // storagedan todoları alma
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));

}
function showAlert(type,message){

 const alert = document.createElement("div");

 alert.className = `alert alert-${type}`;

 alert.textContent = message;


 firstCardbody.appendChild(alert);

// setTimeout

setTimeout(function(){
   alert.remove();
},1000);




}
function addTodoToUI(newTodo){// string degerini list item olarak UI'ya ekleyecek
    /*
    <!-- <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li> -->
    */
   // list item oluşturma
   const listItem = document.createElement("li");
   listItem.className = "list-group-item d-flex justify-content-between";
   //link oluşturma
   const link = document.createElement("a");
   link.href = "#";
   link.className = "delete-item";
   link.innerHTML = " <i class = 'fa fa-remove'></i>";

   //text node ekleme
   listItem.appendChild(document.createTextNode(newTodo));
   listItem.appendChild(link);
   //todo liste list item ekleme

   todoList.appendChild(listItem);
   todoInput.value ="";
}