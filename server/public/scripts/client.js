
$(document).ready(onReady)

function onReady() {
    console.log(('JQ'));
    $('#addButton').on('click', addDailyTask);
    getTask();
    $(document).on('click', '.deleteButton', removeTask)
}// end function inReady
  

function removeTask() {
    console.log('let remove task', removeTask);
    Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
		if (result.isConfirmed) {
			$.ajax({
				type: 'DELETE',
				url: `/todos/${$(this).parents('tr').data('id')}`
			}).then((res) => {
					console.log('DELETE:', res);
					getTask();
			}).catch((err) => {
					console.log('FAILED:', err);
				});
			Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
		}
	});
    
} // end function removeTask



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
