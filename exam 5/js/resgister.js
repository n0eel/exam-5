let elRegisterForm = document.querySelector(".register-wrapper")
let elRegisterButton = document.querySelector(".register-button")

elRegisterForm.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
        newUsername: e.target.newusername.value,
        newPassword: e.target.newpassword.value
    }

    elRegisterButton.innerHTML = `
    <img class="mx-auto" src="./images/loading.png" alt="" width="40">
    `

    elRegisterButton.classList.add("p-[5px]") 


    localStorage.setItem("registeredUser", JSON.stringify(data))
    setTimeout(() => location.pathname = "./login.html", 1000)
})