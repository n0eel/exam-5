let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")
let elStudentList = document.querySelector(".students-list")

let student = []

let selectedStudent = JSON.parse(localStorage.getItem("selectedStudent")) || []
student.push(selectedStudent)

function studentRender (arr) {
    elStudentList.innerHTML = null
    arr.forEach(item => {
        let elStudentRow = document.createElement("div")
        elStudentRow.className = "flex bg-white w-[592px] h-[391px] rounded-[8px] mt-[41px] p-[25px] ml-[30px] relative"
        elStudentRow.innerHTML = `
            <div class="mr-[50px]">
                    <img src="${item.imgURL}" alt="" width="209" height="216">
                </div>
                <div>
                    <p class="text-[12px] font-semibold text-[#ACACAC]">Name</p>
                    <p class="text-[16px] text-black mb-[15px]">${item.name}</p>
                    <p class="text-[12px] font-semibold text-[#ACACAC]">Email</p>
                    <p class="text-[16px] text-black mb-[15px]">${item.email}</p>
                    <p class="text-[12px] font-semibold text-[#ACACAC]">Phone</p>
                    <p class="text-[16px] text-black mb-[15px]">${item.phone}1</p>
                    <p class="text-[12px] font-semibold text-[#ACACAC]">Date Admissin</p>
                    <p class="text-[16px] text-black">${item.date}</p>
                </div>
                <div class="absolute top-[15px] right-[15px]">
                    <img src="./images/pencil.svg" alt="">
                </div>
        `
        elStudentList.appendChild(elStudentRow)
    });
}
studentRender(student)


function handleBackBtn() {
    let elBackBtn = document.querySelector(".back-img")

    elBackBtn.addEventListener("click", (e) => {
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
                    <button onclick="handleBackFunction()" class="back-to-students-btn w-[49%] bg-red-500 text-[20px] leading-[] text-white rounded-[25px] w-[237px] py-[bg-slate-200] font-bold py-[6px] block mx-auto mt-[32px]">Yes</button>
                </div>    
            </div>
        `

    })
}
function handleBackFunction() {
    let backBtn = document.querySelector(".back-to-students-btn")
    backBtn.innerHTML = `
        <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="" width="40">
    `

    setTimeout(() => {
        location.pathname = "./admin.html"
    },1000)
}

