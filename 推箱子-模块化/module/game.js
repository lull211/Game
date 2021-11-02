import showMap from "./util.js";
import { playerMove, isWin } from "./play.js";
showMap();
window.playerMove = playerMove;
window.isWin = isWin;
var over =false;
window.onkeydown=function (e) {
 if (over) {
   return;
 } 
 var result=false;
  if (e.key === "ArrowUp") {
   result = playerMove("up");
 } else if (e.key === "ArrowLeft") {
   result = playerMove("left");
 } else if (e.key === "ArrowRight") {
   result = playerMove("right");
 } else if (e.key === "ArrowDown") {
   result = playerMove("down");
 }
 if (result) {
  showMap();
  if (isWin()) {
   over =true;
   showMap();
   setTimeout(() => {
     alert("win!!");
   }, 0);
  }
 }
}