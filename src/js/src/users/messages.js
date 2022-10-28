// import $ from 'jquery'

var uid = null;

$(document).ready(function () {
	var params = new URLSearchParams(window.location.search);

	/* ------------- verify input are valid ------------- */

	// tid is trip id in database
	if(params.has('uid')){
		uid = params.get('uid');
	}

	if(uid != null) {
	// 	valid_input = true;
	// }

	/* ------------- start render process (with api) ------------- */

	// if(valid_input){
		//send request to api using parameters in url
		getConversation();
  } else {
    window.location.href = environment.web_manager_url + "/404.html";
  }
});

function getConversation(){
	sendGetRequestToAPI('/message/conv/'+uid, function(response){
		if (response.status == 200){
			startRender(response.responseJSON);
		} else if (response.status == 401){
      logout(environment.web_manager_url + "/login.html");
    } else if (response.status == 403) {
      window.location.href = environment.web_manager_url + "/users/onboard2.html";
    }
	});
}

function startRender(res){

	var user = res.user;
	var other_user = res.other_user;
	var conversation = res.conversation;

	//nom de la personne
	$("#hello-world-msg").html("avec " + other_user.surname);

	$("#send-msg-btn").unbind().on("click", sendMessage);

	//clear messages
	$("#messages-holder").html("");
	$("#message-holder").prop("innerText", "");

	//render messages
	var html = "";

	conversation.forEach((message, i) => {
		if(message.user1 == user.id){
			html = html + prepareRightMessage(user, message);
		}else{
			html = html + prepareLeftMessage(other_user, message);
		}
	});

	//show messages
	$("#messages-holder").append(html);

	//scroll down to the last message
	var n = $("#messages-holder").height();
	$('html, body').animate({ scrollTop: n }, 0);

}

function prepareLeftMessage(user, message){
  // check if an alert level has to be set
  let bubbleColorClass = "";
  if (message.alert_level != null) {
    switch(message.alert_level) {
      case 0:
        bubbleColorClass = ' bubble-green';
        break;
      case 1:
        bubbleColorClass = ' bubble-yellow';
        break;
      case 2:
        bubbleColorClass = ' bubble-red';
        break;
    };
  }
  let clickableOptionClass = (user.id == 1 ? ' clickable' : '');
  let backHomeClickOption = (user.id == 1 ? ' onClick="backHome()"' : '');
  let userPicture = (user.photo == null ? '../img/avatars/default2.png' : user.photo);
	let html = "";
	html += '	<div class="row msg-row">';
	html += '   	<div class="avatar-sidebar">';
	html += '			<img src="' + userPicture + '" class="avatar-pic rounded-circle">';
	html += '		</div>';
	html += '		<div class="col pt-1">';
	html += '			<div class="row">';
	html += '				<div class="col-12">';
	html += '					<div style="white-space: pre-line" class="bubble-left shadow-sm' + clickableOptionClass + bubbleColorClass + '"';
  html +=             backHomeClickOption + '>';
	html +=  						escapeHtml(message.message);
	html += '						<p class="bubble-info">';
	html +=  							new Date(message.send_date).toLocaleDateString() + " " + new Date(message.send_date).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'});
	html += '						</p>';
	html += '					</div>';
	html += '				</div>';
	html += '			</div>';
	html += '		</div>';
	html += '	</div>';

	return html;
}

function prepareRightMessage(user, message){
  // check if an alert level has to be set
  let bubbleColorClass = "";
  if (message.alert_level != null) {
    switch(message.alert_level) {
      case 0:
        bubbleColorClass = ' bubble-green';
        break;
      case 1:
        bubbleColorClass = ' bubble-yellow';
        break;
      case 2:
        bubbleColorClass = ' bubble-red';
        break;
    };
  }
  let clickableOptionClass = (user.id == 1 ? ' clickable' : '');
  let backHomeClickOption = (user.id == 1 ? ' onClick="backHome()"' : '');
  let userPicture = (user.photo == null ? '../img/avatars/default2.png' : user.photo);

	let html = "";
	html += '	<div class="row msg-row">';
	html += '		<div class="col pt-1">';
	html += '			<div class="row">';
	html += '				<div class="col-12">';
  html += '         <div style="white-space: pre-line" class="bubble-right shadow-sm' + clickableOptionClass + bubbleColorClass + '"';
  html +=             backHomeClickOption + '>';
  html +=             escapeHtml(message.message);
	html += '						<p class="bubble-info">';
	html +=  							new Date(message.send_date).toLocaleDateString() + " " + new Date(message.send_date).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'});
	html += '						</p>';
	html += '					</div>';
	html += '				</div>';
	html += '			</div>';
	html += '		</div>';
	html += '   <div class="avatar-sidebar">';
	html += '			<img src="' + userPicture + '" class="avatar-pic rounded-circle">';
	html += '		</div>';
	html += '	</div>';

	return html;
}

function sendMessage(){
	var new_message = $("#message-holder").prop("innerText");

	var message_is_valid = validMessage(new_message);
	if(message_is_valid){
		var data = {"other_user_id":uid, "message":new_message};
		sendPostRequestToAPI('/message/create', data, function(resp){
			if(resp.status == 201){
				$("#message-holder").prop("innerText", "");
				getConversation();
			}else{
				toastr.info("Une erreur est survenue");
			}
		});
	}
}

function validMessage(new_message){
	//maybe you could add a validation here if you want
	if(new_message.trim() == ""){
		return false;
	}
	return true;
}

function backHome() {
  window.location.href = environment.web_manager_url + "/users/home.html";
}
