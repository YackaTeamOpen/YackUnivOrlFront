
$(document).ready(function () {
  sendRequestToAPI('GET', '/users/menu', null, function(response) {
    if (response.status == 200){
    } else if (response.status == 401){
      logout(environment.web_manager_url + "/login.html");
    } else if (response.status == 403) {
      window.location.href = environment.web_manager_url + "/users/onboard2.html";
    }
  });
});
