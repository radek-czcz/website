
let widthChanger;
var slider = document.getElementById("slid");

function toggleFunc(){
  let widthChanger = document.querySelector("div.layout");
  let widthChanger2 = getComputedStyle(widthChanger);
  let menubar = document.getElementsByClassName('menubar')[0];
  let menuCase = document.querySelector(".menubar");
  if (getComputedStyle(menuCase).display === "none") {
    menuCase.style.display = "block";
    console.log(widthChanger.style.gridTemplateColumns);
    for (nth = 0; nth < 10; nth++) {
      doSetTimeout(nth*35, nth*30)
    }

  } else if (getComputedStyle(menuCase).display === "block") {
      console.log(widthChanger.style.gridTemplateColumns);
      for (nth2 = 0; nth2 < 10; nth2++) {
        doSetTimeout(nth2*35, 300-nth2*30)
      }
      setTimeout(function(){
        menuCase.style.display = "none";
      }, 350)
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

function toggleFunc2(){
  let widthChanger = document.querySelector("div.layout");
  let widthChanger2 = getComputedStyle(widthChanger);
  let menubar = document.getElementsByClassName('menubar')[0];
  let menuCase = document.querySelector(".menubar");
  if (getComputedStyle(menuCase).display === "none") {
    menuCase.style.display = "block";
    console.log(widthChanger.style.gridTemplateColumns);
    doSetTimeout(5000, 20 );
    doSetTimeout(100, 500 );

  } else if (getComputedStyle(menuCase).display === "block") {
      console.log(widthChanger.style.gridTemplateColumns);
      doSetTimeout(5000, 20 );
      doSetTimeout(100, 500 );
      menuCase.style.display = "none";
  }
}
