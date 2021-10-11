const addProfile = () => {
    console.log('THIS COMING FROM THE AUTHSCRIPT')
    const xhr = new XMLHttpRequest();
    console.log(localStorage)
    xhr.onload = function() {
        const user = JSON.parse(xhr.response);
        console.log(user)
        const header = document.getElementById('profile-hdr')
        const companyCont = document.getElementById('company')
        const smllCompCont = document.getElementById('small-company')
        const warehouseCont = document.getElementById('warehouse')
        if(xhr.status < 400){
            let currentUser = {}
            for(obj of user){
                if(localStorage.currentUser === obj.username) currentUser = obj
            }
            {
                console.log('STATUS LESS THAN 400!!!!!')
                header.innerHTML = `Welcome ${obj.firstName[0].toUpperCase() + obj.firstName.slice(1,obj.firstName.length)} ${obj.lastName[0].toUpperCase() + obj.lastName.slice(1,obj.lastName.length)}`
                const div = document.createElement("div")
                div.innerHTML = `
                    <form>
                        <label for='companyName'> Company: </label>
                        <input type='text' name='companyName'></input>
                        <label for='state'>State: </label>
                        <input type='text' name='state'></input>
                        <input type='submit' value='submit'></input>
                    </form>
                    `
                companyCont.appendChild(div)
            }
        }
    }
    xhr.open('GET', '/profile');
    xhr.send();
}

window.addEventListener('DOMContentLoaded', () => {
    addProfile();
})