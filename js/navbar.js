const hamburger = document.querySelector("#hamburger")
const floatNavCloseBtn = document.querySelector(".float-navbar .close-btn")
const floatNav = document.querySelector(".float-navbar")

hamburger.addEventListener("click", () => {
  floatNav.classList.toggle("hide")
})

floatNavCloseBtn.addEventListener("click", () => {
  floatNav.classList.toggle("hide")
})
