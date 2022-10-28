$(document).ready(function () {
	let searchParams = new URLSearchParams(window.location.search);
	if (searchParams.has('email') && searchParams.has('check')){
		$("#email").val(searchParams.get('email'));
    let check = searchParams.get('check');
		sendPostRequestToAPI(
      '/checkpass',
      {
        "email": searchParams.get('email'),
        "check": check,
        "initial": "reset"
      },
      function(response){
        if (response.status == 200) {
          startRender(response, check);
			  } else {
				  window.location.href = environment.web_manager_url + "/index.html?state=unauthorized";
		    }
		  }
    );
	} else {
    window.location.href = environment.web_manager_url + "/index.html?state=unauthorized";
	}
});

$(document).keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		$("#save-btn").click();
	}
});

function startRender(response, check){
	$("#save-btn").click(function () {
		let searchParams = new URLSearchParams(window.location.search);
		var usernameURL = searchParams.get('email');
		var username = $("#email").val();
		var password = $("#password").val();
		var passwordbis = $("#password-bis").val();

		if (username == "" || password == "" || passwordbis == "") {
			toastr.error("Oups", "Veuillez remplir tous les champs.");
		}else if(username != usernameURL){
			toastr.error("Oups", "Le nom d'utilisateur est incorrect !");
		}else if ($("#password").val().length < 8 || $("#password").val().length > 20){
			$("#pass-message").css("color", "red");
			$("#pass-message").css("font-weight", "bold");
		}else if(password != passwordbis){
			toastr.error("Oups", "Les mots de passes entrés ne correspondent pas.");
		}else {
			var pass = new jsSHA("SHA-256", "TEXT", {numRounds: 1});
			pass.update(password)


			sendPostRequestToAPI('/signup',{"email":username, "check": check, "password":pass.getHash("HEX")},function(response){
				if (response.status == 200){
					window.location.href = environment.web_manager_url + "/login.html";
				}else{
					toastr.error("Oups", "Une erreur est survenue, veuillez réessayer ultérieurement.");
				}
			});
		}
	});
}
