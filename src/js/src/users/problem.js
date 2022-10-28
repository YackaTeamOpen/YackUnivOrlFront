
$(document).ready(function () {
	startRender();
});

function startRender(){


	$("#valid").on("click", function(){
		var comment = $("#comment").val();
		if(comment.trim() != ""){
			sendComment(comment);
		}else{
			toastr.error("Votre commentaire est vide !");
		}
	});

}


function sendComment(comment){
	sendPostRequestToAPI('/users/problem', {"comment": comment}, function(response) {
		var resp = response.responseJSON;
		if (response.status == 200) {
			toastr.success('Succès', 'Votre message a bien été envoyé ! Merci !');
      setTimeout(() => {
        window.location.href = "menu.html";
      }, 2000);
    } else if (response.status == 401) {
      logout(environment.web_manager_url + "/login.html");
    } else if (response.status == 403) {
      window.location.href = "onboard2.html";
		} else {
			toastr.error('Erreur inconnue', "Impossible d'envoyer votre message. Veuillez contacter yacka par email au plus vite : contact@yacka.fr");
      window.location.href = environment.web_manager_url + "/500.html";
		}
	});
}
