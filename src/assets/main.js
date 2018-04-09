let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let winMsg = "You Win! :)";
let loseMsg = "You Lose! :(";
let tryMsg = "Incorrect, try again.";

function guess() {
    let input = document.getElementById('user-guess');
    let inputValid = validateInput(input.value)

    if ((answer.value == '') || (attempt.value == '')) {
        setHiddenFields();
    }

    if (inputValid){
        attempt.value += 1;
    }
    else if (inputValid == false){
        return false;
    }
    
    if (getResults(input.value)) {
        setMessage(winMsg);
        showAnswer(true);
    }
    if ((getResults(input.value) == false) && attempt >= 10) {
        setMessage(loseMsg);
        showAnswer(false);
        showReplay();
    }
    else {
        attempt ++;
        setMessage(tryMsg);
    }

}

function setHiddenFields() {
    var ans = Math.floor((Math.random() * 9999));
    ans = ans.toString();
    attempt = 0;
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
    var beginningHtml = '<div class="row"><span class="col-md-6">' + guess + '</span><div class="col-md-6">';
    document.getElementById("results").innerHTML = beginningHtml;
    let answerStr = answer.toString();
    var numCorrect = 0;
    for (var i = 0; i<guess.length; i++){
        if (guess[i] == answerStr[i]){
            document.getElementById("results").innerHTML += '<span class="glyphicon glyphicon-ok"></span>';
            numCorrect++;
        }
        else if (answerStr.includes(guess[i])) {
            document.getElementById("results").innerHTML += '<span class="glyphicon glyphicon-transfer"></span>';
        }
        else{
            document.getElementById("results").innerHTML += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    document.getElementById("results").innerHTML += '</div>';
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
