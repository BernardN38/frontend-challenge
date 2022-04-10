const submitBtn = document.getElementById("submit");
const signupForm = document.getElementById("signup-form");

submitBtn.addEventListener("click", (event) => {
  //prevent page refresh
  event.preventDefault();
  // check tha form id valid
  // if (!signupForm.checkValidity()){
  //     return;
  // }

  // submit data to api end point
  const formData = new FormData(signupForm);
  const data = JSON.stringify(Object.fromEntries(formData));
 
  const response = fetch("/api/v1/users", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json", 
    },
  }).then(response => response.json()).then((response)=>{
      console.log(response);
  })

});



console.log('hello')