var divElement = document.querySelector('#app .list');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');
var buttonDeleteAllElement = document.querySelector('#app .divDeleteAll .Delete-all');


var i = 0;

var collors = [
    "#BA0064",
    "#CF1178",
    "#E4288E",
    "#F64BA8",
    "#F58BC5",
    "#FFB7DE"
]

var todos = JSON.parse(localStorage.getItem('list_todos')) || '';

rendertodos();

function rendertodos(){
    divElement.innerHTML = '';
    for(todo of todos)
    {


            if (todo != '')
            {
                var todoElement = document.createElement('div');
                var divDeleteButton = document.createElement('div');
                var divText = document.createElement('div');
                var todoText = document.createTextNode(todo); 
                var buttonDeleteElement = document.createElement('button');
                var buttonDeleteText = document.createTextNode("Delete");
                divDeleteButton.setAttribute('class', 'divButtonDelete');
                divText.setAttribute('class', 'divText');
                todoElement.setAttribute('class', 'listElements');
                buttonDeleteElement.setAttribute('class','buttonDelete');

                if(i === 6)
                {
                    i = 0;
                    collors.reverse();
                }

                divText.style.backgroundColor = collors[i];
                divText.style.boxShadow = "-2px 2px 20px black";

                i = i+1;

                var pos = todos.indexOf(todo);

                buttonDeleteElement.setAttribute('onclick' , 'deleteTodo(' + pos + ')'); 
                
                buttonDeleteElement.appendChild(buttonDeleteText);
                divDeleteButton.appendChild(buttonDeleteElement);
                divText.appendChild(todoText);
                todoElement.appendChild(divDeleteButton);
                todoElement.appendChild(divText);
                divElement.appendChild(todoElement);

            }
    }

    i = 0;

    
    if(collors[0] === "#FFB7DE")
    {   
        collors.reverse(); 
    }
}

function addTodos(){
    var todo = inputElement.value;
    todos.push(todo);
    inputElement.value = ''; 
    rendertodos(); 
    saveOnLocalStorage();
}

function deleteTodo(pos){
    todos.splice(pos, 1); 
    rendertodos(); 
    saveOnLocalStorage(); 
}

function saveOnLocalStorage()
{
    localStorage.setItem('list_todos', JSON.stringify(todos));
}

function deleteAll(){
    var op = confirm("\nNote that it will clear your entire list !\n\n Wish to proceed ?");
    if(op === true)
    {
        todos = [];
        rendertodos();
        saveOnLocalStorage();
    }
}
function enterKey(){
    if(event.keyCode == 13)
    {
        addTodos();
    }
}

buttonElement.onclick = addTodos; 
buttonDeleteAllElement.onclick = deleteAll;
document.onkeydown = enterKey;

