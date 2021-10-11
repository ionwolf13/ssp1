const form = document.querySelector('#sgn-form')
const username = document.querySelector('.sgn-up-inpt')
const button = document.querySelector('.bttn')

console.log(form.bttn, "HERE")

window.addEventListener('DOMContentLoaded', () => {
    form.bttn.addEventListener('click', () => {
        console.log('CLICKED')
        localStorage.setItem('lgd', true)
        localStorage.setItem('currentUser', form.username.value)
    })
})
