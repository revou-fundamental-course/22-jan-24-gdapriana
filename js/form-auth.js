const form = document.getElementById('contact-form');
const name = document.querySelector('#contact-form label input#name');
const email = document.querySelector('#contact-form label input#email');
const toast = document.querySelector('.toaster')

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSucces(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
  const small = formControl.querySelector('small');
  small.innerText = "";
}

//check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value.trim())) {
    showSucces(input)
    return true
  }else {
    showError(input,'Email is invalid');
    return false
  }
}


//checkRequired fields
function checkRequired(inputArr) {
  let result = false
  inputArr.forEach(function(input){
    if(input.value.trim() === ''){
      showError(input,`${getFieldName(input)} is required`)
      result = false
    }else {
      showSucces(input);
      result = true
    }
  });
  return result
}

//check input Length
function checkLength(input, min ,max) {
  if(input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    return false
  }else if(input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    return false
  }else {
    showSucces(input);
    return true
  }
}

//get FieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


form.addEventListener('submit',function(e) {
  e.preventDefault();
  const isCheckRequired = checkRequired([name, email]);
  const isCheckLength = checkLength(name,3,15);
  const isCheckEmail = checkEmail(email);

  if (isCheckRequired && isCheckLength && isCheckEmail) {
    toast.classList.remove('hide')
    setTimeout(() => {
      toast.classList.add('hide')
    }, 3000)
  }
});