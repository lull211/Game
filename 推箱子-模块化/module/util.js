//这个模块用来显示地图

import * as map from "./map.js";

const divContainer = document.getElementById("game");
const pieceWidth = 45;
const pieceHeight = 45; //每一小块的宽高

/**
 * 设置div 的宽高
 */
function setDivcontainer() {
  divContainer.style.width = pieceWidth * map.colNumber + "px";
  divContainer.style.height = pieceWidth * map.rowNumber + "px";
}
/**
 *
 * 判断箱子的正确位置
 */
function isCorrect(row, col) {
  for (const item of map.correct) {
    return map.correct.find((item) => item.row === row && item.col === col) !== undefined;
  }
}

/**
 * 给容器添加方块
 * @param {*} row 取出地图中相应的位置，用于判断玩家，箱子，空格，墙壁的号码
 * @param {*} col
 */
function setOnePiece(row, col) {
  var value = map.content[row][col];
  var div = document.createElement("div");
  div.className = "item";

  // console.log("设置方块");

  //调整div的位置
  div.style.left = col * pieceWidth + "px";
  div.style.top = row * pieceHeight + "px";

  //当前位置是否对应地图位置
  var correct = isCorrect(row, col);
  if (value === map.PLAYER) {
    div.classList.add("player");
  } else if (value === map.WALL) {
    div.classList.add("wall");
  } else if (value === map.BOX) {
    if (correct) {
      div.classList.add("correct-box");
    } else {
      div.classList.add("box");
    }
  } else {
    //空白格仔：要放箱子的正确空白 和不放箱子的普通空白
    if (correct) {
      div.classList.add("correct"); //放箱子的空白
    } else {
      return; //普通空白
    }
  }

  divContainer.appendChild(div);
}

/**
 * 根据地图在页面上显示相应的元素
 */
function setContent() {
  //1.清理容器
  // console.log("显示地图内容");
  divContainer.innerHTML = "";
  //2.遍历地图，设置元素
  for (let row = 0; row < map.rowNumber; row++) {
    for (let col = 0; col < map.colNumber; col++) {
      setOnePiece(row, col);
    }
  }
}

//导出
export default function () {
  //1.设置游戏容器宽高
  setDivcontainer();
  //2.显示地图内容
  setContent();
}
