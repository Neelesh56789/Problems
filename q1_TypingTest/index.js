const array = [
    "Boost your coding skills with Coding Ninja! Improve your typing speed and accuracy while mastering the art of programming.",
    
    "Ready to become a coding wizard? Practice your typing speed with Coding Ninja's interactive website and level up your coding game!",
    
    "Calling all aspiring developers! Enhance your coding prowess with Coding Ninja's typing speed website, designed to make you a coding pro.",
    
    "Want to impress employers with your coding skills? Train your fingers with Coding Ninja's typing speed website and stand out in the tech industry.",
    
    "Unlock the secrets of coding efficiency with Coding Ninja's typing speed platform. Type faster, code better, and conquer any programming challenge.",
    
    "Become a coding samurai! Join Coding Ninja's typing speed website and sharpen your coding skills to slice through any coding obstacle.",
    
    "Coding Ninja's typing speed platform: Where speed meets precision. Enhance your coding abilities and accomplish tasks in record time!",
    
    "Tired of bugs slowing you down? Practice coding with Coding Ninja's typing speed website and squash those errors with lightning-fast fingers!",
    
    "Embark on a journey to coding mastery with Coding Ninja's typing speed website. Type like a ninja and code like a pro!",
    
    "Level up your coding game with Coding Ninja's typing speed platform. Are you ready to type your way to coding success?"
    ];
    
    const msg = document.getElementById('msg');
    const area = document.getElementById('mywords');
    const button = document.getElementById('btn');
    
    let sTime, eTime;
    
    
    
    
    const play = ()=>{
        let randomWords = Math.floor(Math.random()*array.length);
        msg.innerText = array[randomWords];
        let date = new Date();
        sTime = date.getTime();
        btn.innerText = "Done";
    }
    
    button.addEventListener('click', function(){
        // e.preventDefault();
        if(this.innerText == 'Start')
        {
            area.disabled = false;
            play();
        }
        else if(this.innerText == "Done")
        {
            area.disabled = true;
            btn.innerText = "Start";
            end();
        }
    })