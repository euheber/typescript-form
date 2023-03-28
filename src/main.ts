import isEmail from "validator/lib/isEmail"

const SHOW_ERROR_MESSAGES = "show-error-message"

const form = document.querySelector(".form") as HTMLFormElement
const username = document.querySelector(".username") as HTMLInputElement
const email = document.querySelector(".email") as HTMLInputElement
const password = document.querySelector(".password") as HTMLInputElement
const password2 = document.querySelector(".password2") as HTMLInputElement

form.addEventListener("submit", function (e) {
  e.preventDefault()
  hideErrorMessages(this)
  checkEmptyFields(username, password, email, password2)
  checkEmail(email)
  checkPassword(password, password2)
})

const hideErrorMessages = (form: HTMLFormElement): void => {
  const allErrorMessages = form.querySelectorAll("." + SHOW_ERROR_MESSAGES)
  allErrorMessages.forEach((error) => {
    error.classList.remove(SHOW_ERROR_MESSAGES)
  })
}

const checkEmail = (input: HTMLInputElement): void => {
  if (!isEmail(input.value)) showErrorMessage(input, "Email inválido")
}

const checkPassword = (
  password: HTMLInputElement,
  password2: HTMLInputElement
): void => {
  if (password.value != password2.value)
    showErrorMessage(password2, "Senha não é idêntica")
}

const checkEmptyFields = (...inputs: HTMLInputElement[]): void => {
  inputs.forEach((field) => {
    if (!field.value) showErrorMessage(field, "Campo vazio")
  })
}

const showErrorMessage = (input: HTMLInputElement, msg: string): void => {
  const formFields = input.parentElement as HTMLDivElement
  const errorMessage = formFields.querySelector(
    ".error-message"
  ) as HTMLSpanElement

  errorMessage.innerText = msg
  formFields.classList.add(SHOW_ERROR_MESSAGES)
}
