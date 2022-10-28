function keypressToSubscribe(event) {
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == "13") {
    $("#subscribe-btn").click();
  }
}

function signup(email, cgu, pass, community_code, returnUrl) {
  sendPostRequestToAPI(
    "/user/create",
    {
      type: 2,
      password: pass.getHash("HEX"),
      email: email,
      cgu: cgu,
      community_code: community_code,
      return_url: returnUrl
    },
    function (response) {
      if (response.status == 201) {
        toastr.success(
          "Inscription réussie ! Consultez votre messagerie pour valider votre courriel." +
          "<br />Veuillez vérifier au besoin votre anti-spam, ou nous contacter en cas de problème.",
          "Bravo !",
          {timeOut: 3000}
        );
        $("#password-subscribe").val("");
        document.querySelector("#subscribe-btn").style.display = "none";
        document.removeEventListener("keypress", keypressToSubscribe);
        document.querySelector("#already-an-account-btn").style.display =
          "none";
        setTimeout(function () {
          window.location.href = "login.html";
        }, 3000);
      } else if (response.status == 409) {
        toastr.error(
          "L'adresse mail saisie existe déjà. Veuillez vous connecter.",
          "Oups !"
        );
        $("#password-subscribe").val("");
      } else {
        toastr.error("Une erreur est survenue.", "Oups !");
        $("#password-subscribe").val("");
      }
      $("#subscribe-btn").find("span").remove();
      $("#subscribe-btn").attr("disabled", false);
    }
  );
}

$(document).ready(function () {
  const emailElem = document.querySelector("#email-subscribe");
  const passwordElem = document.querySelector("#password-subscribe");
  const commCodeElem = document.querySelector("#community-code");
  const commEnableElem = document.querySelector("#community-enable");
  const commInputElem = document.querySelector("#community-input");
  const cguElem = document.querySelector("#cgu");
  emailElem.value = "";
  passwordElem.value = "";
  commEnableElem.checked = false;
  commCodeElem.value = "";
  cguElem.checked = false;
  commEnableElem.addEventListener('click',() => {
    if (!commEnableElem.checked) {
      commCodeElem.value = "";
    };
    $("#community-input").slideToggle();
  });

  $("#subscribe-btn").click(function () {
    const regEmail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const pwdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");

    $("#subscribe-error").html("");
    $("#subscribe-error").css("display", "none");

    const email = emailElem.value.trim();
    const password_subscribe = passwordElem.value.trim();
    const cgu = cguElem.checked;
    const community_code = commCodeElem.value.trim();

    if (email == "") {
      toastr.error("Indiquez votre courriel.", "Oups !");
    } else if (!regEmail.test(email)) {
      toastr.error("Email invalide", "Oups !");
    } else if (password_subscribe == "") {
      toastr.error("Indiquez votre mot de passe.", "Oups !");
    } else if (!pwdRegex.test(password_subscribe)) {
      toastr.error("Le mot de passe est trop simple", "Oups !");
      $("#password-subscribe").val("");
    } else if (!cgu) {
      toastr.error(
        "Veuillez accepter les conditions générales d'utilisation.",
        "Oups !"
      );
    } else {
      $("#subscribe-btn").append(
        '<span class="ml-1 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
      );
      $("#subscribe-btn").attr("disabled", true);
      var pass = new jsSHA("SHA-256", "TEXT", { numRounds: 1 });
      pass.update(password_subscribe);
      let searchParams = new URLSearchParams(window.location.search);
      let returnUrl = "";
      if (searchParams.has('returnUrl')) {
        let urlReturnStrStart = window.location.search.indexOf('returnUrl');
        returnUrl = window.location.search.substring(urlReturnStrStart);
      }
      if (community_code == "") {
        signup(email, cgu, pass, community_code, returnUrl);
      } else {
        checkCommunityCode(
          community_code,
          email,
          // Success
          function () {
            signup(email, cgu, pass, community_code, returnUrl);
          },

          // Failed
          function () {
            $("#subscribe-btn").find("span").remove();
            $("#subscribe-btn").attr("disabled", false);
          }
        );
      }
    }
  });

  document.addEventListener("keypress", keypressToSubscribe);
  document.getElementById("email-subscribe").focus();

  $("#already-an-account-btn").click(function () {
    window.location.href = "login.html";
  });
});
