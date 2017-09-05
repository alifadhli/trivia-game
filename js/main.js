$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	clickSound.play();
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000); 
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000); 
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Homer Simpson's favorite food is?",
					 "The Bahamas is one of the most popular destinations for U.S. residents to visit in the Caribbean. On average, how cold does it get in the Bahamas?",
					 "Champagne is less than 100 miles away from Paris. How many bottles of Champagne are shipped around the country from there each year?", 
					 "Which major Canadian city has not hosted the Olympics?", 
					 " How many Smithsonian museums and galleries are in Washington, D.C.?", 
					 "Finish this phrase with a well-known Italian city: “All roads lead to _____" ,
					 " In the movie “National Lampoon’s Vacation,” where is the Griswold family traveling?", 
					 "What is the capital of India?"
];
var answerArray = [["Doughnuts", "Fresh salad", "Bread and water",  "Apples"],
				   [" 40 degrees","70 degrees","60 degrees","50 degrees "], 
				   ["1.5 million bottles", "200 million bottles", " 322 million Bottles ", " 1 billion bottles"], 
				   ["Montreal","Calgary","Toronto","Vancouver"], 
				   ["9", "17", "22", "19"],
				   ["Rome","Venice","Naples","Verona"], 
				   ["Sea World", "Walley World", "Disney World", "Busch Gardens"], 
				   ["Mumbai","Hyderabad","Bangalore","New Delhi"
]];
var imageArray = ["<img class='center-block img-right' src='img/doughnuts.jpg'>", 
				  "<img class='center-block img-right' src='img/bahama.jpg'>", 
				  "<img class='center-block img-right' src='img/ta.png'>", 
				  "", 
				  "<img class='center-block img-right' src='img/dc.jpg'>", 
				  "<img class='center-block img-right' src='img/rome.jpg'>", 
				  "", 
				  "<img class='center-block img-right' src='img/india.png'>"];

var correctAnswers = ["A. Doughnuts", "B. 70 degrees", "C. 322 million Bottles", "C. Toronto", "D. 17", "A. Rome", "B. Walley World", "D. New Delhi"];

var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;file:
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");
