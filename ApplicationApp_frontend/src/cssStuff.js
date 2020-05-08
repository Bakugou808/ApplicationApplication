
const coll = document.getElementsByClassName("posCollapsibleView");
coll[0].addEventListener("click", ()=> collapsePositionMenu())

function collapsePositionMenu(){
        coll[0].classList.toggle("active");
        const content = coll[0].nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
}


// for notes bar
// const row = document.getElementsByClassName("notesCollapsibleView");
// row[0].addEventListener("click", ()=> collapseNotes())

// function collapseNotes(){
//         row[0].classList.toggle("active");
//         const container = row[0].nextElementSibling;
//         for (noteEle in container.children){
//             debugger
//             if (noteEle.style.maxHeight){
//                 noteEle.style.maxHeight = null;
//               } else {
//                 noteEle.style.maxHeight = content.scrollHeight + "px";
//               }
//         }
        
        
// }
// for sidebar

function openPosNav() {
    let sidepanel = document.getElementById("myPosSidepanel")
    if (sidepanel.style.width === "250px"){
        closePosNav()
    } else {
        sidepanel.style.width = "250px";
    }
}
      
/* Set the width of the sidebar to 0 (hide it) */
function closePosNav() {
    document.getElementById("myPosSidepanel").style.width = "0";
}


openPosNav()
closePosNav()