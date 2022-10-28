// Génère le code html permettant d'afficher un modal
//

function getConfirmModalHtml(
  elementId = "confirm-modal",
  title = "Confirmation",
  subtitle = "",
  yesButtonText = "OK",
  noButtonText = "Annuler",
  message = "",
  enterInfoLabel = "",
  enterInfoType = "text",
  enterInfoPlaceholder = "") {
  let html = "  <div class='modal fade' id='" + elementId + "' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>";
  html += "    <div class='modal-dialog modal modal-dialog-centered' role='document'>";
  html += "      <div class='modal-content shadow-sm'>";
  html += "        <div class='modal-header'>";
  html += "          <h4 class='modal-title'>" + escapeHtml(title) + "</h4>";
  html += "        </div>";
  html += "        <div class='modal-body'>";
  html += "          <div id='add-error' class='alert alert-danger' style='display: none;'></div>";
  html += "          <div id='add-success' class='alert alert alert-success' style='display: none;'></div>";
  html += "          <form class='form-horizontal' action='' method='post' enctype='multipart/form-data'>";
  // html += "            <div class='form-group row'>";
  html += "            <div class='row'>";
  html += "              <p class='col-md-10'><strong>" + escapeHtml(subtitle) + "</strong></p>";
  html += "            </div>";
  if (message != "") {
    // si message n'est pas vide, on affiche un paragraphe complémentaire
    html += "            <div class='row'>";
    html += "              <p class='col-md-10'>" + escapeHtml(message) + "</p>";
    html += "            </div>";
  }
  if (enterInfoLabel != "") {
    // si enterInfoLabel n'est pas vide, on considère que le modal doit afficher une balise input
    html += "            <div class='form-group row'>";
    html += "              <label class='col-md-3 col-form-label' for='enter-info'>" + enterInfoLabel + "</label>";
    html += "              <div class='col-md-9'>";
    html += "                <input class='form-control' id='enter-info' type='" + enterInfoType + "' name='enter-info' placeholder='" + enterInfoPlaceholder + "'>";
    html += "              </div>";
    html += "            </div>";
  }
  html += "          </form>";
  html += "        </div>";
  html += "        <div class='modal-footer'>";
  html += "          <button id='modal-cancel-btn' class='btn btn-secondary shadow-sm' type='button' data-dismiss='modal'><b>" + noButtonText + "</b></button>";
  html += "          <button id='modal-valid-btn' class='btn btn-primary shadow-sm' type='button'><b>" + yesButtonText + "</b></button>";
  html += "        </div>";
  html += "      </div>";
  html += "      <!-- /.modal-content-->";
  html += "    </div>";
  html += "  </div>";
  html += "</div>";
  return html;
}

function getImageActionModalHtml(
  specificClass,
  title,
  yesButtonText = "OK",
  noButtonText = "Annuler",
  specificDivClass,
  validBtnClass
) {
  let html = "  <div class='" + specificClass + " modal fade' tabindex='-1' role='dialog'>";
  html += "    <div class='modal-dialog modal modal-dialog-centered' role='document'>";
  html += "      <div class='modal-content shadow-sm'>";
  html += "        <div class='modal-header'>";
  html += "          <p class='modal-title'>" + escapeHtml(title) + "</p>";
  html += "        </div>";
  html += "        <div class='modal-body'>";
  html += "          <form class='form-horizontal' action='' method='post' enctype='multipart/form-data'>";
  html += "            <div class='row'>";
  html += "              <div class='" + specificDivClass + " text-center mb-2' style='max-height: 230px;' alt='qrcode'/>";
  html += "            </div>";
  html += "          </form>";
  html += "        </div>";
  html += "        <div class='modal-footer'>";
  html += "          <button class='btn btn-secondary shadow-sm' type='button' data-dismiss='modal'><b>" + noButtonText + "</b></button>";
  html += "          <button class='" + validBtnClass + " btn btn-primary shadow-sm' type='button'><b>" + yesButtonText + "</b></button>";
  html += "          </div>";
  html += "        </div>";
  html += "      </div>";
  html += "    </div>";
  html += "  </div>";
  html += "</div>";
  return html;
}


