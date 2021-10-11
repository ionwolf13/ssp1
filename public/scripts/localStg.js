const form = document.querySelector('#singin-form')
const username = document.querySelector('#inpt-user')
const pwd = document.querySelector('#inpt-pwd')
const button = document.querySelector('#inpt-bttn')


console.log(form, username, button, "HERE")


window.addEventListener('DOMContentLoaded', () => {
    button.addEventListener('click', () => {
        console.log('CLICKED')
        localStorage.setItem('lgd', true)
        localStorage.setItem('currentUser', username.value)
    })
})

