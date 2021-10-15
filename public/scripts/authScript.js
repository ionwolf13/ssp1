const addProfile = () => {
    const xhr = new XMLHttpRequest();
    console.log(localStorage)
    
    xhr.onload = function() {
        const users = JSON.parse(xhr.response);
        const header = document.getElementById('profile-hdr')
        const profileInfo = document.getElementById('profile-info')
        const currentCompaniesCont = document.getElementById('current-companies')
        const createCompany = document.getElementById('create-compForm')
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
                createCompany.innerHTML = `
                            <p>Add Company</p>
                            <form method='POST', action='/profile'>
                                <div>
                                    <label for='companyName'> Company: </label>
                                    <input type='text' name='companyName'></input>
                                </div>
                                <div>
                                    <label for='state'>State: </label>
                                    <input type='text' name='state'></input>
                                </div>
                                <div>
                                    <input type='hidden' name="postId" value="001"></input>
                                    <input class='currentUser' type='hidden' name='currentUser' value="${currentUser.username}">
                                    <input type='submit' value='submit'></input>
                                </div>
                            </form>
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
            getSmallCompanies(comp.name, comp.smallComp, smallsCont[0]);
            addSmallCompanyButton(comp.name, localStorage.currentUser);
        }    
            
            handleUpdateButton();
            handleDeleteButton();
    }else{
        

    }
            
}

const getSmallCompanies = (bigCompany, smallsArray, smallsContainer) => {
    if(smallsArray.length !== 0){
        for(comp of smallsArray){
            console.log(comp)
            const div = document.createElement('div');
            div.innerHTML = `
                    <h3>
                        Name: ${comp.name}
                    </h3>
                    <p>
                        Location: ${comp.state}<br></br>
                        Total Warehouses: ${comp.warehouse.length}
                    </p>
                    <div>
                        <button id='bttn-updateSmallComp'> Update </button>
                        <div id='update-smallContForm'>

                        </div>
                        <button id='bttn-dltSmallComp'> Delete </button>
                        <div id='dlt-smallContForm'>

                        </div>
                    </div>
                    <div id='warehousesCont'>
                        <h2>
                            WareHouses
                        </h2>
                        <div id=''>
                            <button id='bttn-createWarehouse'>Add Warehouse</button>
                            <div id='create-wareHouseForm' >
                            </div>
                        </div>
                    </div>
            `
            
            smallsContainer.appendChild(div)
            const wareHouseCont = document.getElementById('warehousesCont')
            getWarehouses(bigCompany, comp.name, comp.warehouse, wareHouseCont)
            addWarehouseButton( bigCompany, comp.name, localStorage.currentUser )
        }

            
            smallHandleUpdateButton()
            smallHandleDeleteButton()
    }else{

    }
}

const getWarehouses = (bigCompany, smallCompany, warehouseArray, warehouseContainer) => {
    console.log( "************",bigCompany, smallCompany, warehouseArray, warehouseContainer, "************")
    if(warehouseArray.length !== 0){
        for(warehouse of warehouseArray){
            console.log(warehouse, 'THIS BE THE WARE HOUSE')
            
                const div = document.createElement('div')
                div.innerHTML = `
                    <h3>
                        Name: ${warehouse.name}
                    </h3>
                    <p>
                        Location: ${warehouse.city}, ${warehouse.state}<br></br>
                        Current Storage: ${warehouse.quantity}<br></br>
                        Capacity: ${warehouse.capacity}<br></br>
                    </p>
                    <div id='inventoryContainer'>
                        <h2>
                            Inventory
                        </h2>
                        <div id=''>
                            <button id='bttn-createInventory'>Add to Inventory </button>
                            <div id='create-inventoryForm' >
                            </div>
                        </div>
                    </div>
                `

                warehouseContainer.appendChild(div)
                const inventoryContainer = document.getElementById('inventoryContainer')
                addInventoryButton(bigCompany, smallCompany, warehouse.name, localStorage.currentUser);
                getInventory(bigCompany, smallCompany, warehouse, inventoryContainer);
            }
            
    }else{

    }

}


const getInventory = (bigCompany, smallCompany, warehouse, inventoryContainer) => {
    if(warehouse.inventory.length !== 0){
        let count = 0;
        for(item of warehouse.inventory){
                const div = document.createElement('div')
                div.innerHTML = `
                    <h3> Item: ${item.item} </h3>
                    <p> 
                        Description: ${item.description}
                    </p>
                    <div>
                        <button id='bttn-updateItemComp-${count}'> Update </button>
                        <div id='update-ItemForm-${count}'>

                        </div>
                        <button id='bttn-dltItemComp-${count}'> Remove </button>
                        <div id='delete-ItemForm-${count}'>

                        </div>
                    </div>
                `
            inventoryContainer.appendChild(div)
            handleUpdateItemButton(count, bigCompany, smallCompany, warehouse, item._id)
            handleDeleteItemButton(count, bigCompany, smallCompany, warehouse, item._id)
            count++
        }
        
    }
}

/************************************************************************************************
 * 
 * * Create Functions
 * 
 ************************************************************************************************/

const addInventoryButton = (bigCompany, smallCompany, warehouse, currentUser) => {
    const bttnCreateWarehouse = document.getElementById('bttn-createInventory')
    const container = document.getElementById('create-inventoryForm')
    let show = false;
    bttnCreateWarehouse.addEventListener('click', () => {
        show = !show
        if(show === false){
            container.innerHTML = ""  
        }
        else{
            container.innerHTML = `
            <form method='POST', action='/profile'>
                <div>
                    <label for='itemName'> Item: </label>
                    <input type='text' name='itemName'></input>
                </div>
                
                <div>
                    <label for='itemDescription''> Description: </label>
                    <input type='text' name='itemDescription''></input>
                </div>
                
                <div>
                    <input id='BigCompany' type='hidden' name='bigCompany' value='${bigCompany}'></input>
                    <input id='SmallComp'type='hidden' name='smallCompany' value='${smallCompany}'></input>
                    <input id='warehouse'type='hidden' name='warehouse' value='${warehouse}'></input>
                    <input class='currentUser' type='hidden' name='currentUser' value='${currentUser}''>
                    <input type='hidden' name="postId" value="004"></input>
                    <input type='submit' value='submit'></input>
                </div>
            </form>
            `
        }
    })
}


const addWarehouseButton = (bigCompany, smallCompany, currentUser) => {
    const bttnCreateWarehouse = document.getElementById('bttn-createWarehouse')
    const container = document.getElementById('create-wareHouseForm')
    let show = false;
    bttnCreateWarehouse.addEventListener('click', () => {
        show = !show
        if(show === false){
            container.innerHTML = ""  
        }
        else{
            container.innerHTML = `
            <form method='POST', action='/profile'>
                <div>
                    <label for='warehouseName'> Warehouse: </label>
                    <input type='text' name='warehouseName'></input>
                </div>
                
                <div>
                    <label for='state'>State: </label>
                    <input type='text' name='state'></input>
                </div>
                
                <div>
                    <label for='city'> City: </label>
                    <input type='text' name='city'></input>
                </div>
                
                <div>
                    <label for='wareCapacity'>Capacity: </label>
                    <input type='text' name='wareCapacity'></input>
                </div>
                
                <div>
                    <input type='hidden' name='wareQuantity' value='0'></input>
                    <input type='hidden' name='wareLimit' value='false'></input>
                    <input type='hidden' name="postId" value="003"></input>
                    <input id='wareBigCompany' type='hidden' name='bigCompany' value='${bigCompany}'></input>
                    <input id='wareSmallComp'type='hidden' name='smallCompany' value='${smallCompany}'></input>
                    <input class='currentUser' type='hidden' name='currentUser' value='${currentUser}'></input>
                    <input type='submit' value='submit'></input>
                </div>
            </form>
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


/************************************************************************************************
 * 
 * * Handle Button Inventory Functions
 * 
 ************************************************************************************************/

 const handleUpdateItemButton = (count, bigCompany, smallCompany, warehouse, item) => {
    const button = document.getElementById(`bttn-updateItemComp-${count}`)
    const container = document.getElementById(`update-ItemForm-${count}`)
    const div = document.createElement('div')
    
    div.innerHTML = `
    <form id='update-Item-${count}' method='PUT', action='/profile'>
        <div>
            <label for='itemName'> Item: </label>
            <input type='text' name='itemName'></input>
        </div>
        <div>
            <label for='itemDescription'>Description: </label>
            <input type='text' name='itemDescription'></input>
        </div>
        <div>
            <input type='hidden' name="postId" value="004"></input>
            <input id='bigCompany'  type='hidden' name='bigCompany'  value="${bigCompany}">
            <input id='bigCompany'  type='hidden' name='smallCompany'  value="${smallCompany}">
            <input id='bigCompany'  type='hidden' name='warehouse'  value="${warehouse.name}">
            <input id='bigCompany'  type='hidden' name='item'  value="${item}">
            <input class='currentUser' type='hidden' name='currentUser' value="${localStorage.currentUser}">
            <input type='submit' value='submit'></input>
        </div>
    </form>
    `
    let show = false;
    button.addEventListener('click', () => {
        show = !show
        if(show === false){
            container.innerHTML = ""  
        }
        else{
            container.appendChild(div)
            let form = document.getElementById(`update-Item-${count}`)
            
            form.addEventListener('submit', (e) => {
                yeNo(e, "update")
            }) 
                
        }
    })
}


const yeNo = (e, method) => {
    if(method === 'update'){
        updateHTTPItem(e.target)
    }
    else{
        deleteHTTPItem(e.target)
    }
    
}


const updateHTTPItem = (e) => {
    let data = new FormData(e)
    const dataArr = []
    for (var value of data.values()) {
        dataArr.push(value)
     }
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const users = JSON.parse(xhr.response);
    }
    xhr.open('PUT', `/`)
     
     xhr.open('PUT', `http://localhost:8085/profile/${dataArr[0]}/${dataArr[1]}/${dataArr[2]}/${dataArr[3]}/${dataArr[4]}/${dataArr[5]}/${dataArr[6]}/${dataArr[7]}`)
     
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(JSON.stringify({test: dataArr[0]}))
}

const handleDeleteItemButton = (count) => {
    const button = document.getElementById(`bttn-dltItemComp-${count}`)
    const container = document.getElementById(`delete-ItemForm-${count}`)
    const p = document.createElement('p')
    p.innerHTML = 'DELETE ME'
    let show = false;
    button.addEventListener('click', () => {
        show = !show
        if(show === false){
            container.innerHTML = ""  
        }
        else{
            container.appendChild(div)
            let form = document.getElementById(`update-Item-${count}`)
            
            form.addEventListener('submit', (e) => {
                yeNo(e, "delete")
            }) 
                
        }
    })
    
}

const deleteHTTPItem = () => {
    const xhr = XMLHttpRequest();
    xhr.open('DELETE', '/profile');
    xhr.onload();
    xhr.send();
}



/************************************************************************************************
 * 
 * * Handle Button Small Company Functions
 * 
 ************************************************************************************************/


const handleUpdateButton = () => {
    const bttnCreateCompany = document.getElementById('bttn-createComp')
    const container = document.getElementById('update-contForm')
    const p = document.createElement('p')
    p.innerHTML = 'UPDATE ME'
    let show = false;
    bttnCreateCompany.addEventListener('click', () => {
        show = !show
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
        if(show === false){
            container.innerHTML = ""  
        }
        else{
            container.appendChild(p)
        }
    })
    
}





const smallHandleUpdateButton = () => {
    console.log("NUMBERS LETS SEE HOW MANY TIMES")
    const bttnCreateCompany = document.getElementById('bttn-updateSmallComp')
    const container = document.getElementById('update-smallContForm')
    const p = document.createElement('p')
    p.innerHTML = 'UPDATE ME'
    let show = false;
    bttnCreateCompany.addEventListener('click', () => {
        show = !show
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
    // console.log(window.location.assign('http://localhost:8085/profile'))
    const logout = document.getElementById('logout-link')
    const hidden = document.getElementsByClassName('currentUser')
    logout.addEventListener('click', () => {
        localStorage.setItem('lgd', false)
        localStorage.setItem('currentUser', null)
    })
})



