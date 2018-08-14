let lastZindex = 10;

// main object containing move info
let dragObject = {};

function onMouseDown(e) {
  // 1 is left mouse button code
  if (e.which !== 1) return;

  //element on which mouse btn is pressed
  let elem = e.target.closest('.draggable');
  if (!elem) return;

  dragObject.elem = elem;

  // maybe it is not the best solution, but i've performed a research,
  // and it's technically safe because in most browser max z-index is 2147483647 so it's, in fact, impossible to exceed the boundaries
  dragObject.elem.style.zIndex = ++lastZindex;

  // remembering coordinates where element pressed
  dragObject.downX = e.pageX;
  dragObject.downY = e.pageY;

  return false;
}

function onMouseMove(e) {
  if (!dragObject.elem) return; // element is not pressed

  if (!dragObject.dragStarted) { // if not started yet
    // Start dragging
    dragObject.dragStarted = true;

    let coords = getCoords(dragObject.elem);
    // cursor position in relation to element edge
    dragObject.shiftX = dragObject.downX - coords.left;
    dragObject.shiftY = dragObject.downY - coords.top;

    startDrag(e); // display changes
  }

  dragObject.elem.style.left = e.pageX - dragObject.shiftX + 'px';
  dragObject.elem.style.top = e.pageY - dragObject.shiftY + 'px';

  return false;
}


function setFramesPointerEvents(value) {
  let frames = document.querySelectorAll('.chat__iframe');
  frames.forEach(element => {
    element.style.pointerEvents = value;
  })
}

function onMouseUp(e) {
  setFramesPointerEvents('auto');
  dragObject = {};
}

function startDrag(e) {
  setFramesPointerEvents('none');
  dragObject.elem.style.position = 'absolute';
}

document.onmousemove = onMouseMove;
document.onmouseup = onMouseUp;
document.onmousedown = onMouseDown;

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    left: box.left + window.pageXOffset
  };

}

let prevElem;
setInterval(function(){
  let elem = document.activeElement;
  if(elem && elem.classList.contains('chat__iframe') && elem !== prevElem){
    elem.style.zIndex = ++lastZindex;
    prevElem = elem;
  }
}, 100);



