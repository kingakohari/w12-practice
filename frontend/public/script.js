const parseJSON = async (url) => {
    const response = await fetch (url)
    return response.json()
}

const userComponent = ({id, name, status}) => {
    return `
    <div>
        <h2>${id}</h2>
        <h1>${name}</h1>
        <h1>${status}</h1>
    </div>
    `
}

const addUserComponent = () => {
    return`
    <div>
        <input type="text" class="name" name="name" placeholder="Name">
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
    const name = document.querySelector(".name")

    button.addEventListener("click", event => {
        const userData = {
            name: name.value,
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