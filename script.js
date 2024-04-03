let clickBox = document.createElement('div');
let currValue;
let gamestatus = false
let score = 0;
let time = 0;
let interval;
let uname = "Guest"
const select = ["Left Click", "Right Click"]

let playerData = localStorage.getItem('clickergame');
if (playerData) {
	playerData = JSON.parse(playerData);
} else {
	playerData = {};
}

function createClickBox() {
	// Select a random value from the select array
	let randomSelect = select[Math.floor(Math.random() * select.length)];
	clickBox.innerHTML = randomSelect;
	clickBox.classList.add('click-box')
	currValue = randomSelect;
	clickBox.style.position = 'fixed';
	clickBox.style.top = Math.floor(Math.random() * (90-20) + 20) + '%';
	clickBox.style.left = Math.floor(Math.random() * 90) + '%';
	document.body.appendChild(clickBox);
}

function destroyClickBox() {
	clickBox.remove();
}

function mainLoop() {
	createClickBox();
	let scoreContainers = document.querySelectorAll('.score')
	scoreContainers.forEach((item) => {
		item.innerHTML = score
	})
	clickBox.addEventListener('click', () => {
		if (currValue === "Left Click") {
			destroyClickBox();
			score += 1;
			startGame()
		} else {
		}
	})
	clickBox.addEventListener('contextmenu', (e) => {
		e.preventDefault();
		if (currValue === "Right Click") {
			destroyClickBox();
			score += 1;
			startGame()
		} else {
		}
	})
}

function gameCheck() {
	if (time <= 0) {
		stopGame();
		destroyClickBox()
		clearInterval(interval);
		time = 0;
		document.getElementById('time').innerHTML = time;
		document.getElementById('start_btn').style.display = 'flex';
	}
}

function startGame() {
	if (!gamestatus) {
		return;
	}
	mainLoop()
}

function stopGame() {
	playerData[uname] = score;
	localStorage.setItem('clickergame', JSON.stringify(playerData));
	clearInterval(interval);
	gamestatus = false;
	score = 0;
	document.getElementById('game_end').style.display = 'flex';
}

function start() {
	document.getElementById('start_btn').style.display = 'none';
	gamestatus = true;
	startGame();
	time = 10
	interval = setInterval(() => {
		document.getElementById('time').innerHTML = time;
		time -= 1;
		gameCheck();
	}, 1000)
}

function changeName() {
	document.getElementById('prompt').style.display = 'flex';
	document.getElementById('uname').focus()
}

document.getElementById('prompt').addEventListener('submit', (e) => {
	e.preventDefault();
	uname = document.getElementById('uname').value;
	document.getElementById('player').innerHTML = uname;
	e.target.style.display = 'none'
})
