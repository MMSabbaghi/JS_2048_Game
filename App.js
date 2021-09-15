function fillEmptyElements(arr) {
  for (let i = 3; i > 0; i--) {
    // چک کردن کل درایه ها برای خالی بودن
    if (arr[i] === 0) {
      // روی خانه های کناری حرکت می کنیم
      for (let j = i - 1; j >= 0; j--) {
        // تا زمانی که یک حانه پر پیدا کنیم ادامه می دهیم
        if (arr[j] !== 0) {
          arr[i] = arr[j];
          arr[j] = 0;
          break;
        }
      }
    }
  }
}

function moveRow(arr) {
  // پر کردن خانه های که ابتدا صفر هستند
  fillEmptyElements(arr);
  // تا زمانی که دو خانه کنار هم برابر و مخالف صفر باشند ادامه می دهد
  let i = 3;
  while (i > 0) {
    // اگر یک خانه با خانه کناری برابر باشد آن را با خانه کناری جمع می کند و حانه کناری را صفر می کند
    if (arr[i] === arr[i - 1] && arr[i] !== 0) {
      arr[i] += arr[i - 1];
      arr[i - 1] = 0;
      fillEmptyElements(arr);
      if (i < 3) i++;
    } else {
      i--;
    }
  }
}

//move to right for one row
function moveRowToRight(row) {
  let arr = [...row];
  moveRow(arr);
  return arr;
}

//move to left for one row
function moveRowToLeft(row) {
  let arr = [...row].reverse();
  moveRow(arr);
  return arr.reverse();
}

//move to bottom for one column
function moveRowToBottom(column) {
  let arr = [...column];
  moveRow(arr);
  return arr;
}

//move to bottom for one column
function moveRowToTop(column) {
  let arr = [...column].reverse();
  moveRow(arr);
  return arr.reverse();
}

function moveArrayToRight(array) {
  return array.map((row) => moveRowToRight(row));
}

function moveArrayToLeft(array) {
  return array.map((row) => moveRowToLeft(row));
}

function moveArrayToBottom(array) {
  let arr = [...array];
  for (let i = 0; i < 4; i++) {
    // ستون آی شامل خانه آی از هر یک از آرایه هاست
    let column = arr.map((row) => row[i]);
    column = moveRowToBottom(column);
    for (let j = 0; j < 4; j++) {
      arr[j][i] = column[j];
    }
  }
  return arr;
}

function moveArrayToTop(array) {
  let arr = [...array];
  for (let i = 0; i < 4; i++) {
    // ستون آی شامل خانه آی از هر یک از آرایه هاست
    let column = arr.map((row) => row[i]);
    column = moveRowToTop(column);
    for (let j = 0; j < 4; j++) {
      arr[j][i] = column[j];
    }
  }
  return arr;
}

//--------------------------------------------------

let initialNumbers = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function fillRandomElement(array) {
  let randomRow = Math.ceil(Math.random() * 3);
  let randomColumn = Math.ceil(Math.random() * 3);
  let randomElement = array[randomRow][randomColumn];
  if (randomElement === 0) {
    array[randomRow][randomColumn] = 2;
  }
}

function getBoxStyle(number) {
  const styles = {
    0: { bg_color: "#ccc8c1", color: "#776E65" },
    2: { bg_color: "#EEE6DB", color: "#776E65" },
    4: { bg_color: "#ECE0C8", color: "#776E65" },
    8: { bg_color: "#EFB27C", color: "#fff" },
    16: { bg_color: "#EF9867", color: "#fff" },
    32: { bg_color: "#F37E63", color: "#fff" },
    64: { bg_color: "#F26142", color: "#fff" },
    128: { bg_color: "#E9CF76", color: "#fff" },
    256: { bg_color: "#EECC67", color: "#fff" },
    528: { bg_color: "#EBC75B", color: "#fff" },
    1024: { bg_color: "#E7C258", color: "#fff" },
    2048: { bg_color: "#E7BD4D", color: "#fff" },
  };

  return styles[number];
}

function fillBoxes(initialNumbers) {
  const allNums = initialNumbers.flat();
  for (let i = 1; i <= 16; i++) {
    const box = document.getElementById("box" + i);
    box.innerText = allNums[i - 1] || "";

    //  تغییر استابل در صورت تغییر عدد خانه
    const boxStyle = getBoxStyle(allNums[i - 1]);
    box.style.backgroundColor = boxStyle.bg_color;
    box.style.color = boxStyle.color;
  }
}

function newGame() {
  initialNumbers = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  fillRandomElement(initialNumbers);
  fillRandomElement(initialNumbers);
  fillBoxes(initialNumbers);
}

function moveHandler(moveMethod) {
  initialNumbers = moveMethod(initialNumbers);
  fillRandomElement(initialNumbers);
  fillBoxes(initialNumbers);
}

document.onkeydown = (e) => {
  switch (e.key) {
    case "ArrowLeft": {
      moveHandler(moveArrayToLeft);
      break;
    }
    case "ArrowRight": {
      moveHandler(moveArrayToRight);
      break;
    }
    case "ArrowUp": {
      moveHandler(moveArrayToTop);
      break;
    }
    case "ArrowDown": {
      moveHandler(moveArrayToBottom);
      break;
    }
    default:
      break;
  }
};

//-----------------------------------------
// on game load
newGame();
