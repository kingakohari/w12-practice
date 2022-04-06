const parseJSON = async (url) => {
    const response = await fetch (url)
    return response.json()
}

const userComponent = ({firstName, lastName}) => {
    return `
    <div>
        <h1>${firstName}</h1>
        <h2>${lastName}</h2>
    </div>
    `
}

const addUserComponent = () => {
    return`
    <form id="form">

        <input type="file" class="picture" name="picture"><br>

        <label for="fname">First name</label><br>
        <input type="text" class="fname" name="fname"><br>

        <label for="lname">Last name</label><br>
        <input type="text" class="lname" name="lname"><br>

        <label for="street">Street</label><br>
        <input type="text" class="street" name="street"><br>

        <label for="hnumber">House number</label><br>
        <input type="text" class="hnumber" name="hnumber"><br>

        <label for="city">City</label><br>
        <input type="text" class="city" name="city"><br>

        <label for="zip">Zip code</label><br>
        <input type="number" class="zip" name="zip" min="1000" max="99999"><br>

        <label for="country">Country</label><br>
        <input type="text" class="country" name="country"><br>

        <label for="intro">Introduction</label><br>
        <textarea name="textarea" class="intro" name="intro" placeholder = "About me"></textarea><br>

        <button class="button">Save</button>
        <input type = "reset" value = "Reset">
</form>
    `
}



const loadEvent = async () => {

    if (window.location.pathname === "/admin/order-view/") {
        console.log("Mi most az admin felületen vagyunk")
    } else {
        console.log("Mi most a vásárlói felületen vagyunk")
    }

    const result = await parseJSON("/api/v1/users")
    const  rootElement = document.getElementById("root")
    rootElement.insertAdjacentHTML(
        "beforeend", 
        result.map(user => userComponent(user)).join("")
    )

    rootElement.insertAdjacentHTML("afterend", addUserComponent())
    
    const button = e.target.querySelector(".button")
    const picture = e.target.querySelector(".picture")
    const firstName = e.target.querySelector(".fname")
    const lastName = e.target.querySelector(".lname")
    const street = e.target.querySelector(".street")
    const houseNumber = e.target.querySelector(".hnumber")
    const city = e.target.querySelector(".city")
    const zip = e.target.querySelector(".zip")
    const country = e.target.querySelector(".country")
    const intro = e.target.querySelector(".intro")

    button.addEventListener("click", event => {
        const userData = {
            first_name: firstName.value,
            last_name: lastName.value,
            street: street.value,
            house_number: houseNumber.value,
            city: city.value,
            zip: zip.value,
            country: country.value,
            intro: intro.value,
            image_name: picture.files[0]
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

                rootElement.insertAdjacentHTML("beforeend", userComponent(user))
            })        
    })
}

window.addEventListener("load", loadEvent)