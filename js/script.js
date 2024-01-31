// form-auth
const form = document.getElementById("contact-form");
const name = document.querySelector("#contact-form label input#name");
const email = document.querySelector("#contact-form label input#email");
const toast = document.querySelector(".toaster");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSucces(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  const small = formControl.querySelector("small");
  small.innerText = "";
}

//check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSucces(input);
    return true;
  } else {
    showError(input, "Email is invalid");
    return false;
  }
}

//checkRequired fields
function checkRequired(inputArr) {
  let result = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      result = false;
    } else {
      showSucces(input);
      result = true;
    }
  });
  return result;
}

//check input Length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
    return false;
  } else {
    showSucces(input);
    return true;
  }
}

//get FieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const isCheckRequired = checkRequired([name, email]);
  const isCheckLength = checkLength(name, 3, 15);
  const isCheckEmail = checkEmail(email);

  if (isCheckRequired && isCheckLength && isCheckEmail) {
    toast.classList.remove("hide");
    setTimeout(() => {
      toast.classList.add("hide");
    }, 3000);
  }
});

// Navbar
const hamburger = document.querySelector("#hamburger");
const floatNavCloseBtn = document.querySelector(".float-navbar .close-btn");
const floatNav = document.querySelector(".float-navbar");

hamburger.addEventListener("click", () => {
  floatNav.classList.toggle("hide");
});

floatNavCloseBtn.addEventListener("click", () => {
  floatNav.classList.toggle("hide");
});

// SLider
const delay = 3000; // in ms
const slides = document.querySelector(".slides");
const slidesCount = slides.childElementCount;
const maxLeft = (slidesCount - 1) * 100 * -1;
let current = 0;

function changeSlide(next = true) {
  if (next) {
    current += current > maxLeft ? -100 : current * -1;
  } else {
    current = current < 0 ? current + 100 : maxLeft;
  }
  slides.style.left = current + "%";
}

let autoChange = setInterval(changeSlide, delay);
const restart = function () {
  clearInterval(autoChange);
  autoChange = setInterval(changeSlide, delay);
};

document.querySelector(".next-slide").addEventListener("click", function () {
  changeSlide();
  restart();
});

document.querySelector(".prev-slide").addEventListener("click", function () {
  changeSlide(false);
  restart();
});
