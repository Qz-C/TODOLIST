//Reference to DOM elements which will be manipulate within the program
var divElement = document.querySelector('#app .list');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');


var todos = JSON.parse(localStorage.getItem('list_todos')) || '';

rendertodos();
/*
Fill up our array from local storage.
In case of the local storage be empty in order to avoid error we put a standard value on array ('')
Note that the list_todos on local storage was in JSON string format and we need converts it to array using the method parse
*/

//function to render the modification performed on DOM elements
function rendertodos(){
    divElement.innerHTML = ''; // Manipulate the text inside one especific element on HTML
    for(todo of todos)
    {
        if (todo != ' ')
        {
            var todoElement = document.createElement('div'); // Create the element li on HTML
            var todoText = document.createTextNode(todo); // Create a text node to attach on list element
            todoElement.setAttribute('class', 'listElements');
            
            var buttonDeleteElement = document.createElement('button');
            buttonDeleteElement.setAttribute('class','buttonDelete');
            var buttonDeleteText = document.createTextNode("Delete"); // Create a text node to attacth on link element
            
            var pos = todos.indexOf(todo); //Search the index inside the array by the text gaven.

            buttonDeleteElement.setAttribute('onclick' , 'deleteTodo(' + pos + ')'); 
            /*
                This part of code is very important !!!
                On this line we set the caller to function "deleteTodo" as an attribute of link element.
            
            */ 
            
            buttonDeleteElement.appendChild(buttonDeleteText); // attaching the Childs 
            todoElement.appendChild(todoText); 
            todoElement.appendChild(buttonDeleteElement);
            divElement.appendChild(todoElement);
        }
    }
}

function addTodos(){
    var todo = inputElement.value; // Get the value inserted on input box
    todos.push(todo + ' '); // Add the text on end of the array
    inputElement.value = ''; // Clear the input box
    rendertodos(); // Show the new element on screen
    saveOnLocalStorage(); // Saves each modification on todo_lists
}

function deleteTodo(pos){
    todos.splice(pos, 1); // Remove n elements (parameter 2), start on position (parameter 1)
    rendertodos(); // Show the new todo on screen 
    saveOnLocalStorage(); // Saves each modification on  todo_lists
}

buttonElement.onclick = addTodos; // Add the new element whem the button is clicked

function saveOnLocalStorage()
{
    localStorage.setItem('list_todos', JSON.stringify(todos));
    /*
        This function storages values on local storage with key::vale
        It only recognizes two strings as valid parameters, so we need to convert the array to a JSON string.


    */
}