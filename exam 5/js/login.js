let elLoginForm = document.querySelector(".login-wrapper")
let elLoginButton = document.querySelector(".login-button")
let registeredUser = JSON.parse(localStorage.getItem("registeredUser"))

elLoginForm.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
        username: e.target.username.value,
        password: e.target.password.value
    }


    elLoginButton.innerHTML = `
    <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="" width="40">
    `

    elLoginButton.classList.add("p-[5px]") 

    if (registeredUser) {
        if (registeredUser.newUsername == data.username && registeredUser.newPassword == data.password) {
            localStorage.setItem("user", JSON.stringify(data))
            setTimeout(() => location.pathname = "./admin.html", 1000)
        }else {
            setTimeout(() => {
                elLoginButton.innerHTML = `
                <p>User is not found</p>
                `
                elLoginButton.classList.add("p-[13px]") 
                elLoginButton.classList.add("text-[14px]") 

            }, 800)
        }

    }
    
    else {
        if (data.username == "root" && data.password == "root") {
            localStorage.setItem("user", JSON.stringify(data))
            setTimeout(() => location.pathname = "./admin.html", 1000)
        }else {
            setTimeout(() => {
                elLoginButton.innerHTML = `
                <p>User is not Found</p>
                `
                elLoginButton.classList.add("p-[13px]") 
                elLoginButton.classList.add("text-[14px]") 
                elLoginButton.classList.add("p-[14px]") 

            }, 800)
        }
    }
})