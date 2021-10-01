
let widthChanger;
var slider = document.getElementById("slid");

function toggleFunc(){
  let widthChanger = document.querySelector("div.layout");
  let menubar = document.getElementsByClassName('menubar')[0];
  let menuCase = document.querySelector(".menubar");
  if (getComputedStyle(menuCase).display === "none") {
    menuCase.style.display = "block";
    let widthChanger = document.querySelector("div.layout");
    let widthChanger2 = getComputedStyle(widthChanger);
    console.log(widthChanger.style.gridTemplateColumns);
    for (nth = 0; nth < 10; nth++) {
      doSetTimeout(nth*35, nth*30)
      //setTimeout(menubarNarrower, 1000, nth*25);
      //clearTimeout();
      //menubarNarrower(nth*25);
    }

  } else if (getComputedStyle(menuCase).display === "block") {

    let widthChanger = document.querySelector("div.layout");
    let widthChanger2 = getComputedStyle(widthChanger);
    console.log(widthChanger.style.gridTemplateColumns);
    for (nth2 = 0; nth2 < 10; nth2++) {
      doSetTimeout(nth2*35, 300-nth2*30)
      //setTimeout(menubarNarrower, 1000, 250-nth2*25);
      //menubarNarrower(250-nth2*25);
    }
    menuCase.style.display = "none";



    //menuCase.style.display = "none";
  }
}

function menubarNarrower(iterStep) {
  let widthChanger = document.querySelector("div.layout");
  widthChanger.style.gridTemplateColumns = iterStep + "px 200px",100;
  console.log(iterStep);
  console.log(25*iterStep);
}

function doSetTimeout(int1, int2) {
  setTimeout(menubarNarrower, int1, int2);
}

slider.oninput = function() {
  var getDiv = document.getElementsByClassName("flexDiv")[0];
  getDiv.style.width = this.value;
}
