const parseJSON = async (url) => {
    const response = await fetch (url)
    return response.json()
}

const userComponent = ({first_name, last_name, street, house_number, city, zip, country, intro}) => {
    return `
    <div>
        <h1>${first_name} ${last_name}</h1>
        <p1>${street} ${house_number}</p1><br>
        <p1>${city}</p1><br>
        <p1>${zip}</p1><br>
        <p1>${country}</p1><br>
        <p>Introduction:<br>${intro}</p>
    </div>
    `
}


const addUserComponent = () => {
    return`
    <div>
        <label for="fname">First name</label><br>
        <input class="inputField" type="text" class="fname" name="fname"><br>

        <label for="lname">Last name</label><br>
        <input class="inputField" type="text" class="lname" name="lname"><br>

        <label for="street">Street</label><br>
        <input class="inputField" type="text" class="street" name="street"><br>

        <label for="hnumber">House number</label><br>
        <input class="inputField" type="text" class="hnumber" name="hnumber"><br>

        <label for="city">City</label><br>
        <input class="inputField" type="text" class="city" name="city"><br>

        <label for="zip">Zip code</label><br>
        <input class="inputField" type="number" class="zip" name="zip" min="1000" max="99999"><br>

        <label for="country">Country</label><br>
        <input class="inputField" type="text" class="country" name="country"><br>

        <label for="intro">Introduction</label><br>
        <textarea class="inputField" name="textarea" class="intro" name="intro" placeholder = "About me"></textarea><br>

        <button class="button">Save</button>
        <button class ="reset">Delete</button>
    </div>
    `
}



const loadEvent = async (e) => {


    const result = await parseJSON("/api/v1/users")
    const  rootElement = document.getElementById("root")


    rootElement.insertAdjacentHTML("afterend", addUserComponent())
    
    const button = e.target.querySelector(".button")
    const resetBtn = e.target.querySelector(".reset")
    
    const firstName = e.target.querySelector(".fname")
    const lastName = e.target.querySelector(".lname")
    const street = e.target.querySelector(".street")
    const houseNumber = e.target.querySelector(".hnumber")
    const city = e.target.querySelector(".city")
    const zip = e.target.querySelector(".zip")
    const country = e.target.querySelector(".country")
    const intro = e.target.querySelector(".intro")

    const inputFields = document.getElementsByTagName("input")

    resetBtn.addEventListener("click", e => {
        inputFields.value = ""

     })
        

    button.addEventListener("click", e => {

        e.preventDefault()

        const userData = {
            first_name: firstName.value,
            last_name: lastName.value,
            street: street.value,
            house_number: houseNumber.value,
            city: city.value,
            zip: zip.value,
            country: country.value,
            intro: intro.value,
        }
    
        fetch("/users/new", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(userData)
            })
            .then(async data => {
                const user = await data.json()

                rootElement.outerHTML = userComponent(user)
            })        
    })
}

window.addEventListener("load", loadEvent)