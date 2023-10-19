const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissor = document.getElementById('scissors');
const user = document.getElementById('user-score');
const computer = document.getElementById('computer-score');
window.userScore = 0;
window.computerScore = 0;
const buttons = document.querySelectorAll('button');
buttons.forEach(button =>{
    button.addEventListener('click', ()=>{
        const finalResult = Play(button.id, Computer());
        res.textContent = finalResult;
    })
})

function Play(userChoice, computerChoice)
{
    
    if(userChoice === computerChoice){
        return "The Game has beend tied"
    }
    else if((userChoice == 'rock' && computerChoice == 'scissor') || (userChoice == 'paper' && computerChoice == 'rock') || (userChoice == 'scissor' && computerChoice == 'paper')){
        window.userScore++;
        user.textContent = window.userScore;
        return "You have Won the game"
    }
    else{
        window.computerScore++;
        computer.textContent = window.computerScore;
        return "You have lost the game"
    }
}
function Computer(){
    const choice = ['rock', 'paper', 'scissor'];
    const randomSelection = Math.floor(Math.random()*choice.length);
    return choice[randomSelection];
}