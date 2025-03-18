document.querySelector(".trigno-dropdown").addEventListener("click", () => {
  document.getElementById("trigno-myDropdown").classList.toggle("show-trigno");
});
document.querySelector(".func-dropdown").addEventListener("click", () => {
  document.getElementById("func-myDropdown").classList.toggle("show-func");
});

window.onclick = function (event) {
  if (!event.target.closest(".trigno-dropbtn")) {
    if (
      document
        .getElementById("trigno-myDropdown")
        .classList.contains("show-trigno")
    ) {
      document
        .getElementById("trigno-myDropdown")
        .classList.remove("show-trigno");
    }
  }
  if (!event.target.closest(".func-dropbtn")) {
    if (
      document.getElementById("func-myDropdown").classList.contains("show-func")
    ) {
      document.getElementById("func-myDropdown").classList.remove("show-func");
    }
  }
};
