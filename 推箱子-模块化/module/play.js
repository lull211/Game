//玩家移动的模块
import * as map from "./map.js";

export function playerMove(direction) {
  //得到玩家位置
  let playerPoint = getPlayerPoint();
  console.log(playerPoint);
  //得到下一个移动的位置
  let nextPoint = getNextPoint(playerPoint.row, playerPoint.col, direction);
  console.log(nextPoint);
  if (nextPoint.value === map.WALL) {
    return false;
  }
  if (nextPoint.value === map.SPACE) {
    exchange(playerPoint, nextPoint);
    console.log(playerPoint);
    return true;
  } else if (nextPoint.value === map.BOX) {
    let nextNextPoint = getNextPoint(nextPoint.row, nextPoint.col, direction);
    if (nextNextPoint.value === map.SPACE) {
      exchange(nextPoint, nextNextPoint);
      exchange(playerPoint, nextPoint);
      return true;
    } else {
      return false;
    }
  }
}

/**
 * 移动
 */
function exchange(point1, point2) {
  var temp = map.content[point1.row][point1.col];
  map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
  map.content[point2.row][point2.col] = temp;
  console.log("exchange");
}
/**
 *
 * 根据地图内容，判断是否游戏胜利
 */
export function isWin() {
  for (const item of map.correct) {
    if (map.content[item.row][item.col] !== map.BOX) {
      return false;
    }  
  }
  return true;
}
/**
 *
 * @returns 获取玩家位置
 */
function getPlayerPoint() {
  for (let row = 0; row < map.rowNumber; row++) {
    for (let col = 0; col < map.colNumber; col++) {
      if (map.content[row][col] === map.PLAYER) {
        return {
          row,
          col,
        };
      }
    }
  }
  throw new Error("出错啦！地图上居然没有玩家！");
}

//获取要移动的下一个位置信息
function getNextPoint(row, col, direction) {
  if (direction === "left") {
    return {
      row,
      col: col - 1,
      value: map.content[row][col - 1],
    };
  } else if (direction === "right") {
    return {
      row,
      col: col + 1,
      value: map.content[row][col + 1],
    };
  } else if (direction === "up") {
    return {
      row: row - 1,
      col,
      value: map.content[row - 1][col],
    };
  } else {
    return {
      row: row + 1,
      col,
      value: map.content[row + 1][col],
    };
  }
}
