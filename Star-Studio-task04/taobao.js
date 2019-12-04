window.onresize = function () {
  let oContainer = document.getElementById("container");
  oContainer.style.width = oContainer.offsetWidth < 1100 ? "1100px" : "auto";
};