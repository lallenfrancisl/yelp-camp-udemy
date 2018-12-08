let todoList = [];
let newTodo = $('#new-todo');
let newTodoValue = newTodo.val();
let deleteBtn = $('.delete-button');
let todoListDisplay = $('#todo-list-display ul');

// updates the array and webpage
function updateTodoList(newValue) {
    // reads the text in the add todo input
    newValue = newTodo.val();
    if (newValue != '') {
        // add the text to the todo list array
        todoList.push(newValue.trim());
        console.log(todoList);
        newTodo.val('');
        newValue = '';
        // update the list on the webpage
        let appendString = '<li>' + '<span class="delete-button"><i class="fas fa-trash-alt"></i></span>' + '<span class="todo-text">' + todoList[todoList.length - 1] + '</span>' + '<span class="dbl-ticks"><i class="fas fa-check-double"></i></span>' + '</li>' ;
        $(appendString).appendTo("#todo-list-display ul");
    }
}

// read the text in the input when add button('+' in webpage) is pressed
$('#add-new-todo').on('click', function () {
    // add the input to the todo list only if the input field is not empty
    updateTodoList();
});

// adds support for submitting on pressing enter key
newTodo.on('keypress', function (event) {
    if (event.which === 13) {
        updateTodoList();
    }
});

// strike out todo on click
todoListDisplay.on('click', 'li', function() {
    $(this).toggleClass('completed');
    $(this).children('.dbl-ticks').toggleClass('completedTicks');
});

// remove todo from list on clicking delete button
todoListDisplay.on('click', '.delete-button', function (event) {
    $(this).parent().fadeOut(500, function () {
        $(this).remove();
    });
    event.stopPropagation();
});

// hover effect for list
$('li').hover(function () {
    deleteBtn.css('width', '3vw');
    console.log('success');
});