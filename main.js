let toggleButton = toggleFunc();
function toggleFunc(){
  let menubar = document.getElementsByClassName('menubar')[0];
  /*let menuCase = menubar.getAttribute("display");*/
  /*let menuCase = menubar.style.display;*/
  let menuCase = document.querySelector(".menubar");
  if (getComputedStyle(menuCase).display === "none") {
  menuCase.style.display = "block";
} else if (getComputedStyle(menuCase).display === "block") {

  menuCase.style.display = "none";
}
}
