const form = document.querySelector('#sgn-form')
const username = document.querySelector('.sgn-up-inpt')
const button = document.querySelector('.bttn')

window.addEventListener('DOMContentLoaded', () => {
    form.bttn.addEventListener('click', () => {
        localStorage.setItem('lgd', true)
        localStorage.setItem('currentUser', form.username.value)
    })
})
