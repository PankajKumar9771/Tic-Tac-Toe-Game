console.log("hello");
let timeoutId;
let audioTurn = new Audio("ting.mp3");
let music = new Audio("music.mp3");
let gameOver = new Audio("gameover.mp3");
let turn = "x";
let isgameover = false;

// function for change the turn

const changeTurn = () => {
  return turn === "x" ? "o" : "x";
};

// function for check the win
const checkWin = () => {
  let boxtext = document.querySelectorAll("span");
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    // music.play();

    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw ,${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "20vw";
      document.querySelector("h5").innerText =
        boxtext[e[0]].innerText + "  is  win";
      document.querySelector("img").style.width = "160px";
      isgameover = true;
      music.pause();
      gameOver.play();

      //for auto reset
      timeoutId = setTimeout(() => {
        let boxes = document.querySelectorAll("span");
        for (box of boxes) {
          box.innerText = "";
        }
        turn = "x";

        isgameover = false;
        document.querySelector("h5").innerText = "Turn Of " + turn;
        document.querySelector("img").style.width = "0px";
        document.querySelector(".line").style.width = "0vw";
      }, 4000);
    }
  });
};

// game logiv
let boxes = document.querySelectorAll(".box");
for (element of boxes) {
  let boxtext = element.querySelector("span");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      music.play();
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      // if (isgameover == false)
      if (!isgameover)
        document.querySelector("h5").innerText = "Turn Of " + turn;
    }
  });
}

let btn = document.querySelector("button");
btn.addEventListener("click", function reset() {
  clearTimeout(timeoutId);
  let boxes = document.querySelectorAll("span");
  for (box of boxes) {
    box.innerText = "";
  }
  turn = "x";

  isgameover = false;
  document.querySelector("h5").innerText = "Turn Of " + turn;
  document.querySelector("img").style.width = "0px";
  document.querySelector(".line").style.width = "0vw";
});
