const addProfile = () => {
    const xhr = new XMLHttpRequest();
    console.log(localStorage)
    xhr.onload = function() {
        const users = JSON.parse(xhr.response);
        const header = document.getElementById('profile-hdr')
        const profileInfo = document.getElementById('profile-info')
        const currentCompaniesCont = document.getElementById('current-companies')
        const smllCompCont = document.getElementById('small-company')
        const warehouseCont = document.getElementById('warehouse')
        if(xhr.status < 400){
            let currentUser = null
            for(user of users){
                if(localStorage.currentUser == user.username) {
                    currentUser = user
                }
            }
            {
                console.log(currentUser, "THIS CURRENT USER IN STORAGE")
                header.innerHTML = `Welcome ${currentUser.firstName[0].toUpperCase() + currentUser.firstName.slice(1,currentUser.firstName.length)} ${currentUser.lastName[0].toUpperCase() + currentUser.lastName.slice(1,currentUser.lastName.length)}`
                profileInfo.innerHTML = `
                <strong> Profile Info: </strong><br></br>
                Username: ${currentUser.username}<br></br>
                Email: ${currentUser.email}<br></br>
                `
                getCompanies(currentUser.company, currentCompaniesCont)
            }
        }
    }
    xhr.open('GET', '/profile');
    xhr.send();
}

const getCompanies = (compArray, container) => {
    const bigCompany = document.getElementsByClassName('bigCompany')
    if(compArray.length !== 0){
        for(comp of compArray){
            bigCompany.value = comp.name
            const div = document.createElement('div')
            div.innerHTML = `
            <p>
                Name: ${comp.name} <br></br>
                State: ${comp.state}<br></br>
            </p>
            `
            container.appendChild(div)
        }
    }
}


window.addEventListener('DOMContentLoaded', () => {
    addProfile();
    const logout = document.getElementById('logout-link')
    const hidden = document.getElementsByClassName('currentUser')
    hidden[0].value = localStorage.currentUser
    hidden[1].value = localStorage.currentUser
    hidden[2].value = localStorage.currentUser
    logout.addEventListener('click', () => {
        console.log('LOG ME OUT')
        localStorage.setItem('lgd', false)
        localStorage.setItem('currentUser', null)
    })
})



