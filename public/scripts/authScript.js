const addProfile = () => {
    const xhr = new XMLHttpRequest();
    console.log(localStorage)
    xhr.onload = function() {
        const users = JSON.parse(xhr.response);
        const header = document.getElementById('profile-hdr')
        const profileInfo = document.getElementById('profile-info')
        const currentCompaniesCont = document.getElementById('current-companies')
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
    if(compArray.length !== 0){
        for(comp of compArray){
            const div = document.createElement('div')
            div.innerHTML = `
            <p>
                Name: ${comp.name} <br></br>
                State: ${comp.state}<br></br>
            </p>
            <div>
                <button id='bttn-createComp'> Update </button>
                <div id='update-contForm'>

                </div>
                <button id='bttn-dltComp'> Delete </button>
                <div id='dlt-contForm'>

                </div>
            </div>
            <div class='smallCompsCont'>
                <div id='smallCompsContHeader' >
                    <h2>
                        Small Companoes
                    </h2>
                    <div>
                        <button id='bttn-createSmallComp'>Add Small Company</button>
                        <div id='create-smallContForm' >
                        </div>
                    </div>
                </div>
                
            </div>
            `
            container.appendChild(div)
            const smallsCont = document.getElementsByClassName('smallCompsCont')
            getSmallCompanies(comp.smallComp, smallsCont[0]);
            addSmallCompanyButton(comp.name, localStorage.currentUser);
            handleUpdateButton();
            handleDeleteButton();
        }
    }
}

const getSmallCompanies = (smallsArray, smallsContainer) => {
    if(smallsArray.length !== 0){
        for(comp of smallsArray){
            console.log(comp)
            const div = document.createElement('div');
            div.innerHTML = `
                    <h3>
                        ${comp.name}
                    </h3>
                    <p>
                        location: ${comp.state}
                    </p>
                    <div>
                        <button onclick='smallHandleUpdateButton()' id='bttn-updateSmallComp'> Update </button>
                        <div id='update-smallContForm'>

                        </div>
                        <button onclick='smallHandleDeleteButton()' id='bttn-dltSmallComp'> Delete </button>
                        <div id='dlt-smallContForm'>

                        </div>
                    </div>
                    <div id='warehousesCont'>
                        <h2>
                            WareHouses
                        </h2>
                        <div>
                            <button id='bttn-createWarehouse'>Add Warehouse</button>
                            <div id='create-wareHouseForm' >
                            </div>
                        </div>
                    </div>
            `
            smallsContainer.appendChild(div)
        }
    }    
}

/************************************************
 * 
 * * Functions
 * 
 ************************************************/




const addWarehouseButton = (bigCompany, smallCompany, currentUser) => {
    const bttnCreateWarehouse = document.getElementById('bttn-createWarehouse')
    const container = document.getElementById('create-smallContForm')
    let show = false;
    bttnCreateCompany.addEventListener('click', () => {
        show = !show
        console.log(show, 'THIS THE SHOW')
        if(show === false){
            container.innerHTML = ""  
        }
        else{
            container.innerHTML = `
               WAREHOUSE FORM
            `
        }
    })
}


const addSmallCompanyButton = (bigCompany, currentUser) => {
    const bttnCreateCompany = document.getElementById('bttn-createSmallComp')
    const container = document.getElementById('create-smallContForm')
    let show = false;
    bttnCreateCompany.addEventListener('click', () => {
        show = !show
        console.log(show, 'THIS THE SHOW')
        if(show === false){
            container.innerHTML = ""  
        }
        else{
            container.innerHTML = `
                <form method='POST', action='/profile'>
                    <div>
                        <label for='smallCompany'> Company: </label>
                        <input type='text' name='smallCompany'></input>
                    </div>
                    <div>
                        <label for='state'>State: </label>
                        <input type='text' name='state'></input>
                    </div>
                    <div>
                        <input type='hidden' name="postId" value="002"></input>
                        <input id='bigCompany'  type='hidden' name='bigCompany'  value="${bigCompany}">
                        <input class='currentUser' type='hidden' name='currentUser' value="${currentUser}">
                        <input type='submit' value='submit'></input>
                    </div>
                </form>
            `
        }
    })
}

const handleUpdateButton = () => {
    const bttnCreateCompany = document.getElementById('bttn-createComp')
    const container = document.getElementById('update-contForm')
    const p = document.createElement('p')
    p.innerHTML = 'UPDATE ME'
    let show = false;
    bttnCreateCompany.addEventListener('click', () => {
        show = !show
        console.log(show, 'THIS THE SHOW')
        if(show === false){
            container.innerHTML = ""  
        }
        else{
            container.appendChild(p)
        }
    })
    
}

const handleDeleteButton = () => {
    const bttnDeleteCompany = document.getElementById('bttn-dltComp')
    const container = document.getElementById('dlt-contForm')
    const p = document.createElement('p')
    p.innerHTML = 'DELETE ME'
    let show = false;
    bttnDeleteCompany.addEventListener('click', () => {
        show = !show
        console.log(show, 'THIS THE SHOW')
        if(show === false){
            container.innerHTML = ""  
        }
        else{
            container.appendChild(p)
        }
    })
    
}





const smallHandleUpdateButton = () => {
    const bttnCreateCompany = document.getElementById('bttn-updateSmallComp')
    const container = document.getElementById('update-smallContForm')
    const p = document.createElement('p')
    p.innerHTML = 'UPDATE ME'
    let show = false;
    bttnCreateCompany.addEventListener('click', () => {
        show = !show
        console.log(show, 'THIS THE SHOW')
        if(show === false){
            container.innerHTML = ""  
        }
        else{
            container.appendChild(p)
        }
    })
    
}

const smallHandleDeleteButton = () => {
    const bttnDeleteCompany = document.getElementById('bttn-dltSmallComp')
    const container = document.getElementById('dlt-smallContForm')
    const p = document.createElement('p')
    p.innerHTML = 'DELETE ME'
    let show = false;
    bttnDeleteCompany.addEventListener('click', () => {
        show = !show
        console.log(show, 'THIS THE SHOW')
        if(show === false){
            container.innerHTML = ""  
        }
        else{
            container.appendChild(p)
        }
    })
    
}

window.addEventListener('DOMContentLoaded', () => {
    addProfile();
    const logout = document.getElementById('logout-link')
    const hidden = document.getElementsByClassName('currentUser')
    logout.addEventListener('click', () => {
        console.log('LOG ME OUT')
        localStorage.setItem('lgd', false)
        localStorage.setItem('currentUser', null)
    })
})



