const inventoryDisplay = document.querySelector("#inventoryDisplay");
const classificationList = document.querySelector("#classificationList");

function renderMessage(message) {
  if (!inventoryDisplay) return;

  inventoryDisplay.innerHTML =
    '<caption class="visually-hidden">Inventory items</caption>' +
    '<tbody><tr><td class="empty">' +
    message +
    "</td></tr></tbody>";
}

if (inventoryDisplay) {
  renderMessage("Select a classification to begin.");
}

if (classificationList) {
  classificationList.addEventListener("change", (event) => {
    const classificationId = event.target.value;

    if (!classificationId) {
      renderMessage("Select a classification to begin.");
      return;
    }

    renderMessage(
      "Inventory table loading is not configured yet. Choose a classification view for now."
    );
  });
}
