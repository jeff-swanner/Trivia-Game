$(document).ready(function() {
    var game = {
        q1: {
            question: "Great White Sharks live and hunt on the coast of every continent in the world the except which continent?",
            answers: {
                a1: "Africa",
                a2: "Europe",
                a3: "Antartica",
                a4: "Australia",
            } ,
            correctAnswer: "a3",
            image: "assets/images/q1.gif",
            timeOut: 8,
            fact: "Despite being on the coast of nearly every continent, there are only an average of 6 fatalities caused by sharks per year."
        } , 
        q2: {
            question: "How many teeth does the average great white shark go through in its lifetime?",
            answers: {
                a1: "500",
                a2: "10,000",
                a3: "30,000",
                a4: "50,000",
            } ,
            correctAnswer: "a3",
            image: "assets/images/q2.gif",
            timeOut: 8,
            fact: "Sharks average out to 15 rows of teeth in each jaw. Although most have 5 and then there is the bull shark that has 50 rows of teeth."
        } ,
        q3: {
            question: "Which of the below sharks do not need salt water to survive?",
            answers: {
                a1: "Bull Shark",
                a2: "Tiger Shark",
                a3: "Shortfin Mako Shark",
                a4: "Whale Shark",
            } ,
            correctAnswer: "a1",
            image: "assets/images/q3.gif",
            timeOut: 4.4,
            fact: "Both the bull shark and the river shark can survive in freshwater."
        } ,
        q4: {
            question: "Which shark species is the fastest?",
            answers: {
                a1: "Great White Shark",
                a2: "Shortfin Mako Shark",
                a3: "Hammerhead Shark",
                a4: "Nurse Shark",
            } ,
            correctAnswer: "a2",
            image: "assets/images/q4.gif",
            timeOut: 8,
            fact: "Shortfin Mako Sharks can swim more than 50 miles per hour."
        } ,
        q5: {
            question: "Other than sight, smell, taste, touch and hearing, what can sharks also sense?",
            answers: {
                a1: "Ultraviolet Light Vision",
                a2: "Echolocation",
                a3: "Human Thoughts",
                a4: "Electroreception",
            } ,
            correctAnswer: "a4",
            image: "assets/images/q5.gif",
            timeOut: 6,
            fact: "Sharks can use electroreception to navigate and hunt prey even in low visibility waters."
        } ,
        q6: {
            question: "What is the oldest shark fossil to be found?",
            answers: {
                a1: "10,000 years old",
                a2: "400,000 years old",
                a3: "20 million years old",
                a4: "400 million years old",
            } ,
            correctAnswer: "a4",
            image: "assets/images/q6.gif",
            timeOut: 8,
            fact: "A 409 million year old shark fossil was found in the Restigouche River basin."
        } ,
        q7: {
            question: "Which species of shark is the biggest?",
            answers: {
                a1: "Basking Shark",
                a2: "Whale Shark",
                a3: "Great White Shark",
                a4: "Tiger Shark",
            } ,
            correctAnswer: "a2",
            image: "assets/images/q7.gif",
            timeOut: 8,
            fact: "Whale sharks can weigh over 30 tons and can grow to be over 50 feet long."
        } ,
        q8: {
            question: "How many fins do most sharks have?",
            answers: {
                a1: "8",
                a2: "4",
                a3: "6",
                a4: "3",
            } ,
            correctAnswer: "a1",
            image: "assets/images/q8.gif",
            timeOut: 5,
            fact: "Most sharks have eight fins: a pair of pectoral fins, a pair of pelvic fins, two dorsal fins, an anal fin, and a caudal fin."
        }
    };

    var promenadeMusic = new Audio('assets/sounds/Promenade.mp3');
    var jawsMusic = new Audio('assets/sounds/Jaws-theme-song.mp3');
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;
    var questions = [game.q1,game.q2,game.q3,game.q4,game.q5,game.q6,game.q7,game.q8];
    var questionNumber = 1;
    var currentQuestion;
    var counter;
    var time;
    var selectedAnswer;
    function startButton() {
        var newButton = $("<button>")
        newButton.text("Start");
        $(newButton).attr("id","startButton");
        $("#game").append(newButton);
    }
    startButton();
    function timeCount() {
        time = 30;
        $("#timeDiv").html("<p>Time Remaining: "+time+" seconds</p>");
        counter = setInterval(count, 1000);
        function count() {
            time--
            $("#timeDiv").html("<p>Time Remaining: "+time+" seconds</p>");
            if (time === 0) {
                clearInterval(counter);
                questionResponse();
            };
        };
    };
    function questionResponse() {
        questionNumber++;
        $("#questionDiv").remove();
        $("#answerDiv").remove();
        clearInterval(counter);
        var newDiv = $("<div>");
        if ($(selectedAnswer).attr("id")===currentQuestion.correctAnswer) {
            newDiv.html("<p>Correct!</p>");
            correctAnswers++;
            selectedAnswer="";
        } else if (time === 0) {
            newDiv.html("<p>Times Up!</p>");
            newDiv.append("<p>The correct answer was: "+currentQuestion.answers[currentQuestion.correctAnswer]+"</p>");
            unanswered++;
        } else {
            newDiv.html("<p>Nope!</p>");
            newDiv.append("<p>The correct answer was: "+currentQuestion.answers[currentQuestion.correctAnswer]+"</p>");
            incorrectAnswers++;
        };
        newDiv.append("<img src='"+currentQuestion.image+"'>");
        newDiv.append("<p>"+currentQuestion.fact+"</p>");
        $("#game").append(newDiv);
        setTimeout(nextQuestion, 1000 * currentQuestion.timeOut);
    };

    function nextQuestion() {
        $("#game").empty();
        if ((questionNumber-1)<questions.length) {
            currentQuestion = questions[questionNumber-1];
            var timeDiv = $("<div>")
            $(timeDiv).attr("id","timeDiv");
            var questionDiv = $("<div>");
            questionDiv.text(currentQuestion.question);
            $(questionDiv).attr("id","questionDiv");
            var answerDiv = $("<div>")
            $(answerDiv).attr("id","answerDiv");
            for (var key in currentQuestion.answers) {
                var newP = $("<p>");
                newP.attr("class","answer");
                newP.attr("id",key);
                newP.text(currentQuestion.answers[key]);
                answerDiv.append(newP);
            };
            $("#game").append(timeDiv,questionDiv,answerDiv);
            timeCount();
        } else {
            var newDiv = $("<div>");
            newDiv.html("<h2>All done, here's how you did!");
            newDiv.append("<p>Correct Answers: "+correctAnswers+"</p>");
            newDiv.append("<p>Incorrect Answers: "+incorrectAnswers+"</p>");
            newDiv.append("<p>Unanswered: "+unanswered+"</p>");
            newDiv.append("<button id='startButton'>Start Over?")
            $("#game").append(newDiv);
            promenadeMusic.pause();
            jawsMusic.currentTime = 0;
            jawsMusic.play();
        };
    };

    $(document).on('click', '#startButton', function () {
        questionNumber = 1;
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        nextQuestion();
        promenadeMusic.currentTime = 0;
        promenadeMusic.play();
        jawsMusic.pause();
    });
    $(document).on('click', '.answer', function () {
        selectedAnswer = this;
        questionResponse();
    });
});