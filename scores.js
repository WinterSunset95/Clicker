let gameData = JSON.parse(localStorage.getItem('clickergame'));
if (gameData) {
	let array = [];
	for (let data in gameData) {
		let toPush = {
			name: data,
			score: gameData[data]
		}
		array.push(toPush);
	}
	array.sort((a, b) => b.score - a.score);
	let table = document.getElementById('scores');
	for (let i = 0; i < array.length; i++) {
		let row = table.insertRow(i);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2)
		cell1.innerHTML = i + 1;
		cell2.innerHTML = array[i].name;
		cell3.innerHTML = array[i].score;
	}
} else {
	document.getElementById('scores').innerHTML = `<tr><td colspan="3">No data found</td></tr>`;
}
