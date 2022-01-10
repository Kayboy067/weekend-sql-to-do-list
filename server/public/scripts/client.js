
$(document).ready(onReady)

function onReady() {
    console.log(('JQ'));
    $('#addButton').on('click', addDailyTask);
    getTask();
}// end function inReady





function addDailyTask(evt) {
    evt.preventDefault()
    let taskInput = {
        task: $('#dailyTask').val(),
        date: $('#dateIs').val(),
        importance: $('#importanceId').val()
    }
    console.log('here is taskInput', taskInput);

    // setup the endpoint (AJAX)

    $.ajax({
        type: 'POST',
        url: '/todos',
        data: taskInput
    }).then( function (response) {
        console.log(response);
        $('#dailyTask').val(''),
        $('#dateIs').val(''),
        $('#importanceId').val(''),
        getTask();
    })
    .catch(function(err) {
        console.log('error in POST', err)
    });
    
} // end function addDailyTask

function render(array) {
    $('#tableBody').empty();
    // loop through an array to append data to DOM
    for (let todo of array) {
    $('#tableBody').append(`
        <tr data-id="${todo.id}">
            <td>${todo.task}</td>
            <td>${todo.importance}</td>
            <td>${todo.date}</td>
            <td><button class="statusButton">Completed</button><td>
            <td><button class="deleteButton">Delete</button><td>
        </tr>
    `)
    }
} // end function renderTask

function getTask(){
    console.log('in getTask');
    //ajax GET call to server to get task
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then(function (response){
        console.log('response from server is', response);
        render(response)
    })
    .catch(function (error){
        console.log('error in GET', error)
    })
} // end function getTask
