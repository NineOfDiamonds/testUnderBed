const globalStateList = {
	OPENING: 'OPENING',
	IN_PROGRESS: 'IN_PROGRESS',
	RESULT: 'RESULT'
}

let globalState = globalStateList.OPENING;

let testScore = 0;
let currentQuestion = 0;

function initQuestions() {
	document.getElementById('js-opening').classList.add('-hide');
	document.getElementById('js-question').classList.remove('-hide');
	document.getElementById('js-totalQuestionCount').innerText = questions.length;
	setNextQuestionData();
};

function setNextQuestionData() {
	document.getElementById('js-questionText').innerText = questions[currentQuestion].questionText;
	document.getElementById('js-questionNumber').innerText = currentQuestion + 1;
	document.getElementById('js-questionAnswers').innerHTML = prepareAnswersMarkdown(questions[currentQuestion].answers);
};

function prepareAnswersMarkdown(answers) {
	let result = '';

	answers.forEach(answer => {
		result += '<li><button class="question__answer" onclick=" onAnswerChoose(' + answer.value + ')">' + answer.answerText + '</button></li>';
	})
	

	return result;
};

function onAnswerChoose(chosenValue) {
	testScore += chosenValue;
	currentQuestion++;

	if (currentQuestion < questions.length) {
		setNextQuestionData();
	} else {
		showTestResult();
	};
};

function showTestResult() {
	document.getElementById('js-question').classList.add('-hide');
	document.getElementById('js-result').classList.remove('-hide');

	// понять результат
	let resultKey = getResultNameByScore();

	
	//заменить объекты
	document.getElementById('js-resultTitle').innerText = resultData[resultKey].title;
	document.getElementById('js-resultDesc').innerText = resultData[resultKey].desc;
	document.getElementById('js-resultImage').src = resultData[resultKey].image;

	document.getElementById('js-result-share').innerHTML = VK.Share.button(
			{
				url: 'https://solvery.io/',
				title: 'Офигеть!!! Да у меня под кроватью' + resultData[resultKey].title + '! Пройди тест тоже и узнай, кто таится под кроватью у тебя.',
				image: resultData[resultKey].image,
				noparse: true,
			},
			{
				type:'round_nocount',
				text: 'Поделиться результатом)',
			}
		)
};

function getResultNameByScore() {
	let resultKey = ''
	if (testScore < 6 && testScore > -1) {
		resultKey = 'noMonster';
	} else if (testScore < 11 && testScore > 5) {
		resultKey = 'monsterEnergy';
	} else if (testScore < 15 && testScore > 10) {
		resultKey = 'monsterAlien'
	} else if (testScore = 15) {
		resultKey = 'youAreMonster'
	};
	return resultKey;
};

function restartTest() {
	document.getElementById('js-question').classList.remove('-hide');
	document.getElementById('js-result').classList.add('-hide');
	currentQuestion = 0;
	testScore = 0;
	initQuestions();
};