
$(document).ready(function () {

	/* ------------- start render process (with api) ------------- */

	sendGetRequestToAPI('/message/conv/list', function(response){
		if (response.status == 200) {
			startRender(response.responseJSON);
		}else if (response.status == 401){
			logout(environment.web_manager_url + "/login.html");
    } else if (response.status == 403) {
      window.location.href = environment.web_manager_url + "/users/onboard2.html";
    };
  });
});

function startRender(data){
	if(data.conversations.length > 0){
		data.conversations.forEach((conversation, i) => {
			let card = createYackaConvCard(conversation);
			$("#container").append(card);
		});
	}else{
		let card = createEmptyYackaConvCard();
		$("#container").append(card);
	}
	
}

function createYackaConvCard(last_message) {

	var current_user, other_user;
	if (last_message.current_user_id == last_message.user1){
		other_user = last_message.user2db;
		current_user = last_message.user1db;
	}else{
		other_user = last_message.user1db;
		current_user = last_message.user2db;
	}
	var send_date = new Date(Date.parse(last_message.send_date));

  var html = "";
  html = html + "<div class='yackaday-card card shadow-sm'>";


  html = html + "	<div class='card-body'>";
  html = html + "		<a href='messages.html?uid=" + other_user.id + "' class='no-text-decoration'>";
  html = html + "			<div class='row'>";
  html = html + "				<div class='col avatar-sidebar'>";

  if (other_user.photo) {
    html = html + "					<img src='" + other_user.photo + "' class='avatar-pic rounded-circle'/>";
  } else {
    html = html + "					<img src='../img/avatars/default2.png' class='avatar-pic rounded-circle'/>";
  }

  html = html + "				</div>";
  html = html + "				<div class='col pt-1 pl-0'>";
  html = html + "					<div class='row'>";
  html = html + "						<div class='col-12'>";
  html = html + "							<p style='margin-bottom: 0.3rem'>";
	if(other_user.id == "1"){
		html = html + "								<img class='approved-badge' src='../img/icons/approved.svg'/>";
	}
	html = html + " 						<b>" + other_user.surname.capitalize() + "</b></p>";
  html = html + "						</div>";
  html = html + "					</div>";
  html = html + "					<div class='row'>";
  html = html + "						<div class='col-12'>";
	//mets en gras quand les messages ne sont pas lus (quand l'utilisateur courant est l'émetteur, alors le message est lu)
	if(last_message.read_date == null && last_message.current_user_id != last_message.user1){
		html = html + "							<b><p class='yacka-dark-text mb-0'><span class='yacka-green-text'>"+send_date.format_date_short()+" "+send_date.format_hours()+" : </span>"+last_message.message+"</p></b>";
	}else{
		html = html + "							<p class='yacka-dark-grey-text italic mb-0'><span class='yacka-green-text'>"+send_date.format_date_short()+" "+send_date.format_hours()+" : </span>"+last_message.message+"</p>";
	}

  html = html + "						</div>";
  html = html + "					</div>";
  html = html + "				</div>"; //comme c'est un trajet proposé, alors le badge est forcément réservé
  html = html + "			</div>";
  html = html + "</div>"; //end yackard content

  html = html + "		</a>"; //end yackard header

  html = html + "	</div>";
  html = html + "</div>";
  return html;
}

function createEmptyYackaConvCard() {

  var html = "";
  html = html + "<div class='yackaday-card card shadow-sm'>";
  html = html + "	<div class='card-body'>";
  html = html + "			<div class='row'>";
  html = html + "				<div class='col pt-1 pl-0'>";
  html = html + "					<p style='margin-bottom: 0.3rem; text-align: center;'>Aucune conversation pour le moment.</p>";
  html = html + "				</div>";
  html = html + "			</div>";
  html = html + "		</div>"; //end yackard content
  html = html + "	</div>";
  html = html + "</div>";
  return html;
}
