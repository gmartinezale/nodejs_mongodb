var userListData = [];

$(document).ready(function(){
	poblarTabla();
});

function poblarTabla(){
	var tableContent = '';

	$.getJSON('/users/userlist',function(data){
		userListData = data;
		$.each(data,function(){
			tableContent += '<tr>';
				tableContent += '<td> <a href="#" class="linkshowuser" rel="'+this.username+'">'+this.username+'</a></td>';
				tableContent += '<td>'+this.email+'</td>';
				tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
			tableContent += '</tr>';
		});

		$('#userList table tbody').html(tableContent);
		$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
		$('#btnAddUser').on('click',addUser);
		$('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
	});
}

function showUserInfo(event){
	event.preventDefault();

	var user = $(this).attr('rel');

	var arrayposition = userListData.map(function(arrayItem){return arrayItem.username;}).indexOf(user);

	var userObj = userListData[arrayposition];

	$('#userInfoName').text(userObj.fullname);
    $('#userInfoAge').text(userObj.age);
    $('#userInfoGender').text(userObj.gender);
    $('#userInfoLocation').text(userObj.location);
}

function addUser(event) {
    event.preventDefault();
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0) {
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }

        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            if (response.msg === '') {
                $('#addUser fieldset input').val('');
                poblarTabla();

            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        alert('LLene todos los campos');
        return false;
    }
};

function deleteUser(event){
	event.preventDefault();

	var confirmation = confirm('Estas seguro de eliminar?');
	if(confirmation === true){
		$.ajax({
			type:'DELETE',
			url: '/users/deleteuser/'+$(this).attr('rel')
		}).done(function(response){
			if(response.msg === ''){
				poblarTabla();
			}else{
				alert('Error: '+response.msg);
			}
		});
	}
	else{
		return false;
	}
}