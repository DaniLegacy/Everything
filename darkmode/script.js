const toggleBtn = document.getElementById("toggleBtn");
const bodyElement = document.body;
const statusText = document.getElementById("status");

toggleBtn.addEventListener("click", function () {
  bodyElement.classList.toggle("dark-mode");

  if (bodyElement.classList.contains("dark-mode")) {
    statusText.textContent = "Current mode: Dark";
  } else {
    statusText.textContent = "Current mode: Light";
  }
});