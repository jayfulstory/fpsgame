let randomPositionX = Math.floor(Math.random() * 91);
let randomPositionY = Math.floor(Math.random() * 81);
let target = document.getElementById('target');
let target1 = document.getElementById('target1');
let target2 = document.getElementById('target2');
let hitZone = document.getElementById('hitZone');
let score = document.getElementById('point');
let play = document.getElementById('play');
let tier = document.getElementById('tier');
let rank = document.getElementById('rank');
let count = 0;
let timer = document.getElementById('timer');
let milliseconds = 99;
let seconds = 20;
let interval;

function critical(event) {
  let x = event.offsetX;
  let y = event.offsetY;
  hitZone.style.left = x + 'px';
  hitZone.style.top = y + 'px';
  console.log(x, y);
  bonus = setTimeout('headShot()', 400);
}
function headShot() {
  hitZone.innerHTML = '';
}

// ///////////// START ////////////////
let flag = 0;
function start() {
  setTime = setTimeout('target3()', 50);
  if (flag == 0) {
    interval = setInterval(operateTimer, 10);
    seconds--;
    flag++;
  }
}

// ///////////// ボタンの切り替え　////////////////
let changeBtn = false;
play.addEventListener('click', function () {
  if (changeBtn == false) {
    changeBtn = true;
    play.innerHTML = 'リセット';
    start();
  } else {
    // ///////////// リセット ////////////////
    clearInterval(interval);
    tier.style.display = 'none';
    changeBtn = false;
    count = 0;
    flag = 0;
    milliseconds = 99;
    seconds = 20;
    target.style.display = 'none';
    score.innerHTML = count + '点';
    timer.innerHTML = '20:00秒';
    play.innerHTML = '開始';
  }
});
// /////////////////////////////////////

function target3() {
  target.style.display = 'block';
  let randomPositionX = Math.floor(Math.random() * 91);
  let randomPositionY = Math.floor(Math.random() * 81);
  target.style.left = randomPositionX + '%';
  target.style.top = randomPositionY + '%';
}

target2.addEventListener('click', function (event) {
  target.style.display = 'none';
  critical(event);
  hitZone.innerHTML = '+1';
  count++;
  score.innerHTML = count + '点';
  start();
});

target1.addEventListener('click', function (event) {
  target.style.display = 'none';
  critical(event);
  hitZone.innerHTML = 'CRITICAL! +2';
  count += 2;
  score.innerHTML = count + '点';
  start();
});

// ３０秒カウントダウン
function operateTimer() {
  timer.innerHTML = seconds + ':' + milliseconds + '秒';
  milliseconds--;
  if (milliseconds < 10) {
    milliseconds = '0' + milliseconds;
  }
  if (milliseconds == 0) {
    seconds--;
    milliseconds = 99;
  }
  // /////////////　ランク　&リセット ///////////////
  if (seconds == -1 && milliseconds == 99) {
    target.style.display = 'none';
    if (count <= 30) {
      rank.innerHTML = "'ブロンズ'";
    } else if (count > 30 && count <= 35) {
      rank.innerHTML = "'シルバー'";
    } else if (count > 35 && count <= 40) {
      rank.innerHTML = "'ゴルド'";
    } else if (count > 40 && count <= 45) {
      rank.innerHTML = "'プラチナ'";
    } else if (count > 45 && count <= 50) {
      rank.innerHTML = "'ダイヤモンド'";
    } else if (count > 50 && count <= 55) {
      rank.innerHTML = "'マスター'";
    } else if (count > 55) {
      rank.innerHTML = "'チャリンザー'";
    }
    clearInterval(interval);
    tier.style.display = 'block';
    count = 0;
    flag = 0;
    // milliseconds = 99;
    // seconds = 20;
  }
}
