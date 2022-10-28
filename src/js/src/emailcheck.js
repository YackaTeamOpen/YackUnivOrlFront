$("#connect-btn").click(function(){
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('returnUrl')) {
    let urlReturnStrStart = window.location.search.indexOf('returnUrl');
    window.location.href = "login.html?" + window.location.search.substring(urlReturnStrStart);
  } else {
    window.location.href = "login.html";
  };
});

$(document).ready(function () {
	let searchParams = new URLSearchParams(window.location.search);
	if (searchParams.has('email') && searchParams.has('check')){
		sendPostRequestToAPI(
      '/checkpass',
      {
        "email": searchParams.get('email'),
        "check": searchParams.get('check'),
        "initial": "initial"
      },
      function(response){
        if (response.status != 200) {
          toastr.error("L'identifiant n'a as pu être validé", "Oups !");
  				window.location.href = environment.web_manager_url + "/index.html?state=unauthorized";
		    } else {
          let searchParams = new URLSearchParams(window.location.search);
          if (searchParams.has('returnUrl')) {
            let urlReturnStrStart = window.location.search.indexOf('returnUrl');
            window.location.href = "login.html?" + window.location.search.substring(urlReturnStrStart);
          };
        }
		  }
    );
	} else {
    // window.location.href = environment.web_manager_url + "/index.html?state=unauthorized";
	}
});

$(document).keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		$("#connect-btn").click();
	}
});

