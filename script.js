const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".inpux-box");

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes()

function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML); //lưu dưới tên notes và update trong browser
}   

createBtn.addEventListener("click", ()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable","true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
});

notesContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === "P"){ //Kiểm tra local storage có chứa gì, khi reload trang sẽ tự update và thể hiện nội dung dưới dạng note
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => { //notes riêng biệt, không giới hạn
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown", event =>{ //nó sẽ hoạt động như chức năng Enter trên keyboard
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak"); //Thêm 1 line break trong p
        event.preventDefault(); //Hạn chế default hiện lên
    }
})

// Mở rộng //

let toastBox = document.getElementById('toastBox');
let successMsg = '<i class="fa-solid fa-heart"></i> Successfully completed! Good job Dawg! Please delete notes if necessary!'

function showToast(msg){
    let toast = document.createElement('div'); //Create HTML element with div type//
    toast.classList.add('toast'); //add 1 class name 'toast'//
    toast.innerHTML = msg; //add some content//
    toastBox.appendChild(toast); //display the new div inside this box//

    setTimeout(()=>{ //remove the toast notification after millionseconds
        toast.remove();
    },3000)
}