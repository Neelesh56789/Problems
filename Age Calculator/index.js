const button = document.getElementById("btn");
const birthday = document.getElementById("birthday");

const result = document.getElementById("result");
button.addEventListener("click", ageCalculation);
function ageCalculation() {
  const birth = birthday.value;
  if (birth === "") {
    alert("Please enter your birthdate");
  } 
  else {
    const age = getTheAge(birth);
    result.innerText = `You are ${age} ${age > 1 ? "years" : "year"} old`;
  }
}

function getTheAge(birth) {
  const year = getYear(birth);
//   const month = getMonth(birth);
//   const day = getDate(birth);
//   const dateArray=  [year, month, day];
  return year;

}

function getYear(birth)
{
    const currentDate = new Date();
  const birthdayDate = new Date(birth);
  let year = currentDate.getFullYear() - birthdayDate.getFullYear();
  let month = currentDate.getMonth() - birthdayDate.getMonth();

  if (
    month < 0 ||
    (month === 0 && currentDate.getDate() < birthdayDate.getDate())
  ) {
    year--;
  }
  console.log(year);
  return year;
}
