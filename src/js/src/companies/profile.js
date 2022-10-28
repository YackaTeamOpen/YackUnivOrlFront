$(document).ready(function () {
  requestHome(
    function (data) {
      startRender(data, false);
    },
    "companies",
    null
  );
  document.querySelector("#save").addEventListener(
    "click",
    () => {
      saveProfile(false);
    }
  );
});


