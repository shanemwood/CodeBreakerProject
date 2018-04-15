let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let winMsg = "You Win! :)";
let loseMsg = "You Lose! :(";
let tryMsg = "Incorrect, try again.";

function guess() {
    let input = document.getElementById('user-guess');

    if ((answer.value == '') || (attempt.value == '')) {
        setHiddenFields();
    }

    if (!validateInput(input.value)){
        return false;
    }
    else if (validateInput(input.value)){
        attempt.value++;
    }
    
    if (getResults(input.value)) {
        setMessage(winMsg);
        showAnswer(true);
    }
    else if ((getResults(input.value) == false) && attempt.value >= 10) {
        setMessage(loseMsg);
        showAnswer(false);
        showReplay();
    }
    else {
        setMessage(tryMsg);
    }

}

function setHiddenFields() {
    var ans = Math.floor((Math.random() * 9999));
    ans = ans.toString();
    attempt.value = 0;
    while (ans.length < 4){
        ans = ("0" + ans)
    }
    
    answer.value = ans;
}

function setMessage(msg) {
    document.getElementById('message').innerHTML = msg;
}  

function validateInput(input) {
    let inputStr = input.toString();
    if (inputStr.length == 4){
        return true;
    }
    else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(guess) {
    let fullHtml = '<div class="row"><span class="col-md-6">' + guess + '</span><div class="col-md-6">';

    let answerStr = answer.value.toString();
    let guessStr = guess.toString();
    var numCorrect = 0;
    for (var i = 0; i<guessStr.length; i++){
        if (guessStr.charAt(i) == answerStr.charAt(i)){
            fullHtml += '<span class="glyphicon glyphicon-ok"></span>';
            numCorrect++;
        }
        else if (answerStr.includes(guessStr.charAt(i))) {
            fullHtml += '<span class="glyphicon glyphicon-transfer"></span>';
        }
        else{
            fullHtml+= '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    fullHtml += '</div></div>';
    document.getElementById("results").innerHTML = fullHtml;
    if (numCorrect == 4){
        showAnswer(true);
        return true;
    }
    else {
        showAnswer(false);
        return false;
    }
}
function showAnswer(winLose){
    document.getElementById("code").innerHTML = answer.value;
    if (!winLose) {
        document.getElementById("code").className += " failure";
    }
    else {
        document.getElementById("code").className += " success";
    }

}
function showReplay() {
    document.getElementById("guessing-div").style.display = "none";
    document.getElementById("replay-div").style.display = "block";
}
