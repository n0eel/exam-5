let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")
let elStudentssList = document.querySelector(".students-tbody")
let elAdminsName = document.querySelector(".admins-name")
let elAdminAvatar = document.querySelector(".admins-avatar")
let elAdminImg = document.querySelector(".admin-img")
let elSelect = document.querySelector(".sort-select")
let elSearchInput = document.querySelector(".search-input")

let registeredUser = JSON.parse(localStorage.getItem("registeredUser")) || []
let students = JSON.parse(localStorage.getItem("students")) || []
let selectedStudent = JSON.parse(localStorage.getItem("selectedStudent")) || []


elAdminsName.textContent = `
    ${registeredUser.newUsername}
`


elAdminAvatar.addEventListener("change", function(e) {
    elAdminImg.src = URL.createObjectURL(e.target.files[0])
    elAdminImg.classList.add("rounded-[50%]")
})
    

function handleAddStudentButton() {
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = `
        <form class="add-student-form text-white" autocomplete="off">
          <h1 class="text-[25px] text-center mb-[10px] font-bold">Edit User Details</h1>
          <label class="block mb-[10px]">
            <input class="choose-avatar-input hidden" type="file">
            <img class="profile-img cursor-pointer mx-auto" src="./images/profile.svg" alt="" width="128" height="128">
          </label>
          <div class="flex justify-between">
              <div class="w-[49%] space-y-[15px]">
                <h2 class="text-[18px] font-medium text-white">Name</h2>
                <input class="outline-none w-[200px] px-[10px] py-[10px] text-black" type="text" placeholder="Enter username" name="username">
                <h2 class="text-[18px] font-medium text-white">Phone</h2>
                <input class="outline-none w-[200px] px-[10px] py-[10px] text-black" type="text" placeholder="Enter phone" name="phone">
                <h3 class="text-[18px] font-medium text-white">Date admittion</h3>
                <input class="outline-none w-[200px] px-[10px] py-[10px] text-black" type="date" name="date">
              </div>
              <div class="w-[49%] space-y-[15px]">
                <h2 class="text-[18px] font-medium text-white">Email</h2>
                <input class="outline-none w-[200px] px-[10px] py-[10px] text-black" type="email" placeholder="Enter new email" name="email">
                <h2 class="text-[18px] font-medium text-white">Enroil number</h2>
                <input class="outline-none w-[200px] px-[10px] py-[10px] text-black mb-[15px]" type="text" placeholder="Enter enroil number" name="enroilnumber">
                <div class="flex gap-[10px] pt-[49px] justify-end pr-[17px]"> 
                  <button class="bg-white rounded-[4px] text-[#ffbb24] text-[15px] font-semibold px-[15px] py-[8px]">Cancel</button>
                  <button class="add-student-btn bg-white rounded-[4px] text-[#ffbb24] text-[15px] font-semibold px-[15px] py-[8px]">Add</button>
                </div>
              </div>
          </div>
        </form>
    `

    let elAddStudentFrom = document.querySelector(".add-student-form")
    let elChooseAvatarInput = document.querySelector(".choose-avatar-input")
    let elProfileImg = document.querySelector(".profile-img")

    elChooseAvatarInput.addEventListener("change", function(e) {
        elProfileImg.src = URL.createObjectURL(e.target.files[0])
    })



    elAddStudentFrom.addEventListener("submit", function(e) {
        e.preventDefault()

        const data = {
            id: students.length ? students[students.length - 1].id +1 : 1,
            imgUrl: elProfileImg.src,
            name: e.target.username.value,
            phone: e.target.phone.value,
            date: e.target.date.value,
            email: e.target.email.value,
            enroilnumber: e.target.enroilnumber.value
        }

        let elAddStudentBtn = document.querySelector(".add-student-btn")

        elAddStudentBtn.innerHTML = `
            <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="" width="40">
        `

        setTimeout(() => {
            e.target.lastElementChild.innerHTML = "Add"
            students.push(data)
            elModalWrapper.classList.add("scale-0")
            
            
            renderStudents(students)
    
            localStorage.setItem("students", JSON.stringify(students))
        },1000)
    })
}

elModalWrapper.addEventListener("click", (e) => {
    if (e.target.id == "wrapper") {
        elModalWrapper.classList.add("scale-0")
        setTimeout(() => {
            elModalInner.className = "modal-inner w-[500px] h-[550px] bg-[#ffbb24]  absolute top-0 bottom-0 right-0 left-0  m-auto rounded-[20px] px-[30px] py-[30px]"
        },500)
    }
})



function renderStudents(arr) {
    elStudentssList.innerHTML = null
    arr.forEach(item => {
        let elStudentRow = document.createElement("tr")
        elStudentRow.innerHTML = `
                <td class="px-[15px] py-[15px] rounded-tl-[8px] rounded-bl-[8px] w-[100px]">
                    <img src="${item.imgUrl}" class="rounded-[50%]" alt="" width="65" height="55">
                  </td>
                  <td class="text-start">
                    <p class="text-[14px] text-black text-start">${item.name}</p>
                  </td>
                  <td class="text-start pl-[120px]">
                    <p>${item.email}</p>
                  </td>
                  <td>
                    <p>${item.phone}</p>
                  </td>
                  <td>
                    <p>${item.enroilnumber}</p>
                  </td>
                  <td>
                    <p>${item.date}</p>
                  </td>
                  <td class="items-center rounded-tr-[8px] rounded-br-[8px] space-x-[10px]">
                    <button onclick="handleMoreStudentBtn(${item.id})"><img src="./images/more.svg" alt=""></button>
                    <button onclick="handleEdtiStudentBtn(${item.id})"><img src="./images/edit.svg" alt=""></button>
                    <button onclick="handleDeleteStudentBtn(${item.id})"><img src="./images/delete.svg" alt=""></button>
                </td>
        `

        elStudentssList.appendChild(elStudentRow)
    });
}
renderStudents(students)


function handleDeleteStudentBtn(id) {
    elModalWrapper.classList.remove("scale-0")
    elModalInner.classList.remove("w-[500px]")
    elModalInner.classList.remove("h-[550px]")
    elModalInner.classList.add("w-[500px]")
    elModalInner.classList.add("h-[200px]")

    elModalInner.innerHTML = `
        <div class="p-5">
            <h2 class="text-center text-[25px] text-white">Are you sure to delete?</h2>
            <div class="flex justify-between gap-[25px]">
                <button onclick="handleCancelBtn()" class="w-[49%] bg-[#009398] text-[20px] leading-[] text-white rounded-[25px] w-[237px] py-[bg-slate-200] font-bold py-[6px] block mx-auto mt-[32px]">Cancel</button>
                <button onclick="handleDeleteItem(${id})" class="delete-btn w-[49%] bg-red-500 text-[20px] leading-[] text-white rounded-[25px] w-[237px] py-[bg-slate-200] font-bold py-[6px] block mx-auto mt-[32px]">Yes</button>
            </div>    
        </div>
    `
}

function handleCancelBtn() {
    elModalWrapper.classList.add("scale-0")
    setTimeout(() => {
        elModalInner.className = ("modal-inner w-[1000px] h-[680px] bg-blue-200  absolute top-0 bottom-0 right-0 left-0  m-auto rounded-[20px]")
    },500)
}


function handleDeleteItem (id) {
    let elDeleteBtn = document.querySelector(".delete-btn")
    const deleteIndex = students.findIndex(item => item.id == id)
    const findStudent = students.find(item => item.id == id)
    elDeleteBtn.innerHTML = `
        <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="" width="40">
    `
    setTimeout(() => {
        handleCancelBtn()
        students.splice(deleteIndex, 1)
        renderStudents(students, findStudent.categoryId)
        localStorage.setItem("students", JSON.stringify(students))
    }, 1000)
}


function handleEdtiStudentBtn(id) {
    const findStudent = students.find(item => item.id == id)
    console.log(findStudent);
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = `
        <form class="edit-student-form text-white" autocomplete="off">
          <h1 class="text-[25px] text-center mb-[10px] font-bold">Edit User Details</h1>
          <label class="block mb-[10px]">
            <input class="edit-avatar-input hidden" type="file">
            <img class="edit-profile-img cursor-pointer mx-auto" src="${findStudent.imgUrl}" alt="" width="128" height="128">
          </label>
          <div class="flex justify-between">
              <div class="w-[49%] space-y-[15px]">
                <h2 class="text-[18px] font-medium text-white">Name</h2>
                <input value="${findStudent.name}" class="outline-none w-[200px] px-[10px] py-[10px] text-black" type="text" placeholder="Enter username" name="username">
                <h2 class="text-[18px] font-medium text-white">Phone</h2>
                <input value="${findStudent.phone}" class="outline-none w-[200px] px-[10px] py-[10px] text-black" type="text" placeholder="Enter phone" name="phone">
                <h3 class="text-[18px] font-medium text-white">Date admittion</h3>
                <input value="${findStudent.date}" class="outline-none w-[200px] px-[10px] py-[10px] text-black" type="date" name="date">
              </div>
              <div class="w-[49%] space-y-[15px]">
                <h2 class="text-[18px] font-medium text-white">Email</h2>
                <input value="${findStudent.email}" class="outline-none w-[200px] px-[10px] py-[10px] text-black" type="email" placeholder="Enter new email" name="email">
                <h2 class="text-[18px] font-medium text-white">Enroil number</h2>
                <input value="${findStudent.enroilnumber}" class="outline-none w-[200px] px-[10px] py-[10px] text-black mb-[15px]" type="text" placeholder="Enter enroil number" name="enroilnumber">
                <div class="flex gap-[10px] pt-[49px] justify-end pr-[17px]"> 
                  <button class="bg-white rounded-[4px] text-[#ffbb24] text-[15px] font-semibold px-[15px] py-[8px]">Cancel</button>
                  <button class="edit-student-btn bg-white rounded-[4px] text-[#ffbb24] text-[15px] font-semibold px-[15px] py-[8px]">Edit</button>
                </div>
              </div>
          </div>
        </form>
    `

    let elEditForm = document.querySelector(".edit-student-form")
    let elEditInput = document.querySelector(".edit-avatar-input")
    let elEditImg = document.querySelector(".edit-profile-img")
    let elEditBtn = document.querySelector(".edit-student-btn")

    elEditInput.addEventListener("change", function(e) {
        elEditImg.src = URL.createObjectURL(e.target.files[0])
    })


    elEditForm.addEventListener("sumbit", function(e) {
        e.preventDefault()
        findStudent.imgUrl = elEditImg.src
        findStudent.name = e.target.name.value
        findStudent.email = e.target.email.value
        findStudent.phone = e.target.phone.value
        findStudent.date = e.target.date.value
        findStudent.enroilnumber = e.target.enroilnumber.value

        elModalWrapper.classList.add("scale-0")
        localStorage.setItem("students", JSON.stringify(students))
        console.log(students);
    })
}



function handleMoreStudentBtn(id) {
    const findStudent = students.find(item => item.id == id)
    localStorage.setItem("selectedStudent", JSON.stringify(findStudent))
    location.pathname = "./singlePage.html"
}


    function handleLogoutBtn() {
    let elLogoutBtn = document.querySelector(".logout-btn")
    elLogoutBtn.addEventListener("click", () => {
        elModalWrapper.classList.remove("scale-0")
        elModalInner.classList.remove("w-[500px]")
        elModalInner.classList.remove("h-[550px]")
        elModalInner.classList.add("w-[500px]")
        elModalInner.classList.add("h-[200px]")
        
        elModalInner.innerHTML = `
                <div class="p-5">
                    <h2 class="text-center text-[25px] text-white">Are you sure to leave?</h2>
                    <div class="flex justify-between gap-[25px]">
                        <button onclick="hancleCancelLogoutBtn()" class="w-[49%] bg-[#009398] text-[20px] leading-[] text-white rounded-[25px] w-[237px] py-[bg-slate-200] font-bold py-[6px] block mx-auto mt-[32px]">Cancel</button>
                        <button onclick="handleLeavePage()" class="leave-btn w-[49%] bg-red-500 text-[20px] leading-[] text-white rounded-[25px] w-[237px] py-[bg-slate-200] font-bold py-[6px] block mx-auto mt-[32px]">Yes</button>
                    </div>    
                </div>
            `
        })
}
function handleLeavePage() {
    let elLeaveBtn = document.querySelector(".leave-btn")
    elLeaveBtn.innerHTML = `
        <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="" width="40">
    `

    setTimeout(() => {
        location.pathname = "./login.html"
    },1000)
}

function hancleCancelLogoutBtn() {
    elModalWrapper.classList.add("scale-0")
    setTimeout(() => {
        elModalInner.className = ("modal-inner w-[1000px] h-[680px] bg-blue-200  absolute top-0 bottom-0 right-0 left-0  m-auto rounded-[20px]")
    },500)
}



elSelect.addEventListener("change", () => {
    if (elSelect.value == "name") {
        const selectionName = students.sort((a, b) => a.name < b.name ? -1 : 1)
        renderStudents(selectionName)
    }else if (elSelect.value == "age") {
        const selectionAge = students.sort((a, b) => a.date < b.date ? -1 : 1)
        renderStudents(selectionAge)
    }
})


elSearchInput.addEventListener("input", (e) => {
    const students = JSON.parse(localStorage.getItem("students"))
    const filteredStudents = students.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
    renderStudents(filteredStudents)
})