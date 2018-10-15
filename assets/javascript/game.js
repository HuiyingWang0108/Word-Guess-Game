//VARIABLES
var words = ["jaychou", "heart", "letitgo", "amazon"]

//Empty variables to store values later
var cpuWord = "";
var accoutLetters = 0;
var blanksAndCorrect = [];
var wrongGuess = [];
var cpuWordArray = [];

//Counter Variables
var wins = 0;
var losses = 0;
var guessesRemaining = 9;

//variables for audio function
var jaychou= document.getElementById("jaychou");
var heart = document.getElementById("heart");
var letitgo = document.getElementById("letitgo");
var amazon = document.getElementById("amazon");

//computer generates random word from words array
cpuWord = words[Math.floor(Math.random() * words.length)];
cpuWordArray = cpuWord.split("");
accoutLetters = cpuWordArray.length;

function dashWordFun() {

    //creating a loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < accoutLetters; i++) {
        blanksAndCorrect.push("_");
    }

    //showing the "_" within HTML
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join("  ");
}
dashWordFun();//blanks for the random letters
 function audioFun() {
    // Audio & Image
    if (cpuWord === words[0]) {
        jaychou.play();
        heart.pause();
        heart.style.display="none";
        letitgo.pause();
        letitgo.style.display="none";
        amazon.pause();
        amazon.style.display="none";
        document.getElementById("image").src = "assets/images/jaychou.jpg";
    }
    // Audio & Image
    if (cpuWord === words[1]) {
        jaychou.pause();
        jaychou.style.display="none";
        heart.play();
        letitgo.pause();
        letitgo.style.display="none";
        amazon.pause();
        amazon.style.display="none";
        document.getElementById("image").src = "assets/images/heart.jpg";
    }
    // Audio & Image
    if (cpuWord === words[2]) {
        jaychou.pause();
        jaychou.style.display="none";
        heart.pause();
        heart.style.display="none";
        letitgo.play();
        amazon.pause();
        amazon.style.display="none";
        document.getElementById("image").src = "assets/images/letitgo.jpg";
    }
    // Audio & Image
    if (cpuWord === words[3]) {
        jaychou.pause();
        jaychou.style.display="none";
        heart.pause();
        heart.style.display="none";
        letitgo.pause();
        letitgo.style.display="none";
        amazon.play();
        document.getElementById("image").src = "assets/images/amazon.jpg";
    }
   
};
audioFun();

//to see if letter selected matches random word
function checkLettersFun(letter) {
    var isInWord=false;
    for (var i = 0; i < accoutLetters; i++) {
        if (cpuWord[i] == letter) {
            isInWord=true;
        }
    }
    if(isInWord){
        for (var i = 0; i < accoutLetters; i++){
            if(cpuWord[i]==letter){
                blanksAndCorrect[i] = letter;
            }
        }
    }else{
        wrongGuess.push(letter);
        guessesRemaining--;
    }
}
function reset() {
    guessesRemaining = 9;
    wrongGuess = [];
    blanksAndCorrect = [];
    dashWordFun();
}
function complete() {
    //if WON...then alert, play audio, display image and reset new round
    if (cpuWordArray.toString()== blanksAndCorrect.toString()) {//
        wins++;
        audioFun();
        reset();
        //display wins on screen
        document.getElementById("winsTimes").innerHTML = " " + wins;

        //if LOST...then alert and reset new round
    } else if (guessesRemaining === 0) {
        losses++;
        reset();
        document.getElementById("image").src = "assets/images/amazon.jpg"//
        document.getElementById("lossTimes").innerHTML = " " + losses;
    }
    //display losses on screen && guesses remaining countdown
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesRemaining").innerHTML = " " + guessesRemaining;
}
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    //check to see if guess entered matches value of random word
    checkLettersFun(guesses);
    //process wins/loss 
    complete();
    //display/store incorrect letters on screen
    document.getElementById("guessesletter").innerHTML = "  " + wrongGuess.join(" ");
}
