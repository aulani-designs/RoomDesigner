const furnitureItems =document.querySelectorAll(
    ".furniture-item"
) 
const room =document.getElementById("room")

furnitureItems.forEach(item =>{
    item.addEventListener("dragstart", dragStart);
})

function dragStart(e){
    console.log(e.target)
    e.dataTransfer.setData("text/plain", e.target.id);
}

room.addEventListener("drop", dropItem);
function dropItem(e){
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const furniture =document.getElementById(id).cloneNode(true);
    furniture.classList.add("furniture-placed");

const roomRect = room.getBoundingClientRect()
const x = e.clientX - roomRect.left - (furniture.offsetWidth / 2); 
const y = e.clientY - roomRect.top - (furniture.offsetHeight /2);
furniture.style.left = `${x}px`;
furniture.style.top =`${y}px`;
furniture.setAttribute('draggable','false');


addDragFunctionality(furniture);
room.appendChild(furniture)
}
   
room.addEventListener('dragover', dragOver);
function dragOver(e) {
    e.preventDefault();
}

function addDragFunctionality(element) {
let isDragging = false;
let offsetX, offsetY
element.addEventListener('mousedown',function(e) {
isDragging = true;
offsetX = e.clientX - element.getBoundingClientRect().left;
offsetY = e.clientY - element.getBoundingClientRect().top;

} )


document.addEventListener('mousemove', function(e){

    if(isDragging){       


const roomRect = room.getBoundingClientRect();
let x = e.clientX-roomRect.left-offsetX
let y = e.clientY-roomRect.top-offsetY
x = Math.max(0, Math.min (x,room.clientWidth - element.offsetWidth))
y = Math.max(0, Math.min(y,room.clientHeight - element.offsetHeight))
element.style.left = `${x}px`;
element.style.top =`${y}px`;

    }
});

document.addEventListener('mouseup', function(){
    if ( isDragging ){
        isDragging = false;
    }
})

}

