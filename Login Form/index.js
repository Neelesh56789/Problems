// Wait for the DOM to load
// document.addEventListener("DOMContentLoaded", function() {
//     // Get form elements
//     const form = document.querySelector("form");
//     const nameInput = document.getElementById("name");
//     const emailInput = document.getElementById("email");
//     const passwordInput = document.getElementById("pass");
  
//     // Handle form submission
//     form.addEventListener("submit", function(event) {
//       event.preventDefault(); // Prevent form submission
  
//       // Get the entered values
//       const nameValue = nameInput.value.trim();
//       const emailValue = emailInput.value.trim();
//       const passwordValue = passwordInput.value.trim();
  
//       // Perform form validation
//       if (nameValue === "") {
//         alert("Please enter your name.");
//         nameInput.focus();
//         return;
//       }
  
//       if (emailValue === "") {
//         alert("Please enter your email.");
//         emailInput.focus();
//         return;
//       }
  
//       if (passwordValue === "") {
//         alert("Please enter your password.");
//         passwordInput.focus();
//         return;
//       }
  
//       // Form is valid, perform further actions (e.g., submit to server)
//       alert("Form submitted successfully!");
//       // You can uncomment the line below to submit the form to the server
//       // form.submit();
//     });
  
//     // Handle cancel button click
//     const cancelButton = document.querySelector(".cancelbtn");
//     cancelButton.addEventListener("click", function() {
//       // Reset form fields
//       nameInput.value = "";
//       emailInput.value = "";
//       passwordInput.value = "";
//     });
//   });

const input = [];
  
const button_id = document.getElementById('form');
button_id.addEventListener("submit", (e)=>{
    //console.log("ABC");
    e.preventDefault();
    const input_name = document.getElementById('name').value;
    const input_email = document.getElementById('email').value;
    const input_pass = document.getElementById('pass').value;
    const input_obj = {name : input_name, email : input_email, pass : input_pass};
    // input.push(input_obj);
    // name_verification();
    // email_verification();
    // pass_verification();

    if(!(name_verification() || email_verification() || pass_verification()))
    {
        alert("Fill the input fields correctly.");
    }
    else{
        input.push(input_obj);
    }
    
    console.log(input);

})

const clear = document.querySelector('.cancelbtn');
clear.addEventListener('click', ()=>{
    reset_with_clear();
})

const forget = document.querySelector('.psw');
forget.addEventListener('click', ()=>{
    reset_with_clear();
    setTimeout(()=>{
        alert("Verification Code has been sent to your mail");

    },10)
})

function name_verification(){
    const name = document.getElementById('name').value.trim();
    for(let i=0;i<name.length;i++)
    {
        if(!((name[i].charCodeAt()>=65 && name[i].charCodeAt()<=90) || (name[i].charCodeAt()>=97 && name[i].charCodeAt()<=122) || name[i] == " "))
        {
            return false;
        }
        
    }
    return true;
}
// function email_verification(){
//     const email = document.getElementById('email').value;
//     for(let i=0;i<email.length;i++)
//     {
//         if(!email[i]=='@')
//         {
//             const str = email.slice(i, email.lenght);
        
//         }
//     }
//     if(str == "codingninjas.com");
//     {
//         return true;
//     }
//     return false;
    
// }
function email_verification(){
    const email = document.getElementById('email').value.trim();
    // const email = "prayrit@cdingninjas.com";
    const regex = /@codingninjas.com/g;
    const found = email.match(regex);
    return found != null;

}

function pass_verification(){
    const pass = document.getElementById('pass').value.trim();
    const regex = /@/g;
    if(pass.length >= 8 || pass.match(regex))
    {
        return true;
    }
    return false;
}
// const nam = document.getElementById("name");
// nam.addEventListener('change',(e)=>{
//     // console.log(e.target);
//     console.log(document.getElementById("name").value.trim());
// })

function reset_with_clear()
{
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const pass = document.getElementById('pass');
    name.value = "";
    email.value = "";
    pass.value = "";
    
}

