const button = document.getElementById('btn');
function findColor(){
    button.addEventListener('click', ()=>{
        const randomNumber = Math.floor(Math.random() * 16777215);
        //console.log(randomNumber);
        const randomColorCode = "#" + randomNumber.toString(16);
        document.body.style.backgroundColor = randomColorCode;
        //console.log(document.body.style.backgroundColor);
        const randomColor = document.getElementById("color")
        randomColor.innerText = randomColorCode;
        //console.log(randomColor.innerText);
        navigator.clipboard.writeText(randomColorCode)
    });
}
findColor();

