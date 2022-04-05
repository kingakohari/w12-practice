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
    <div>
        <input type="text" class="firstName" name="firstName" placeholder="First name">
        <input type="text" class="lastName" name="lastName" placeholder="Last name">
        <button class="addNew">Send</button>
    </div>
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

    const button = document.querySelector(".addNew")
    const firstName = document.querySelector(".firstName")
    const lastName = document.querySelector(".lastName")

    button.addEventListener("click", event => {
        const userData = {
            firstName: firstName.value,
            lastName: lastName.value
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