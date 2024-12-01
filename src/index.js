import './normalizer.css'
import './styles.css'

const form = document.querySelector('form')
const inputs = document.querySelectorAll('input')
const select = document.querySelector('select')

const expresiones = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  zip: /^\d{6}$/,
  password: /^.{4,16}$/
}
const checkLabel = {
  email: false,
  country: false,
  zip: false,
  password: false
}

function formValidate (e) {
  if (e.target.name === 'email') {
    validateLabel(expresiones.email, e.target, 'email')
  } else if (e.target.name === 'zip') {
    validateLabel(expresiones.zip, e.target, 'zip')
  } else if (e.target.name === 'password') {
    validateLabel(expresiones.password, e.target, 'password')
    validatePassword()
  } else if (e.target.name === 'confirm-password') {
    validatePassword()
  }
}

select.addEventListener('change', (e) => {
  if (e.target.value !== '') {
    checkLabel.country = true
  }
})

function validateLabel (expression, target, label) {
  if (expression.test(target.value)) {
    const message = document.querySelector(`.${label}-message`)
    message.textContent = `${label} valido`
    message.classList.remove('message-invalid')
    message.classList.add('message-valid')
    checkLabel[label] = true
  } else {
    const message = document.querySelector(`.${label}-message`)
    message.textContent = `${label} no valido`
    message.classList.remove('message-valid')
    message.classList.add('message-invalid')
  }
}

function validatePassword () {
  const password1 = document.querySelector('#password')
  const password2 = document.querySelector('#confirm-password')

  if (password1.value === password2.value && expresiones.password.test(password2.value)) {
    const message = document.querySelector('.password-confirm-message')
    message.textContent = 'Contraseña valida'
    message.classList.remove('message-invalid')
    message.classList.add('message-valid')
    checkLabel.password = true
  } else {
    const message = document.querySelector('.password-confirm-message')
    message.textContent = 'Contraseña invalida'
    message.classList.remove('message-valid')
    message.classList.add('message-invalid')
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', formValidate)
  input.addEventListener('blur', formValidate)
})

select.addEventListener('change', (e) => {

})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (checkLabel.email && checkLabel.country && checkLabel.zip && checkLabel.password) {
    form.reset()
    const message = document.querySelector('.submit-message')
    message.textContent = 'Formulario valido'
    message.classList.remove('message-invalid')
    message.classList.add('message-valid')
    document.querySelectorAll('.erase').forEach((span) => {
      span.style.display = 'none'
    })
  } else {
    const message = document.querySelector('.submit-message')
    message.textContent = 'Por favor rellene bien el formulario'
    message.classList.remove('message-valid')
    message.classList.add('message-invalid')
  }
})
