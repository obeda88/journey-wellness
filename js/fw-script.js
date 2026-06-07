var graphicToShow;
var toggleButton = document.querySelector("input[name=toggleSwitch]");
var img = document.querySelector("#wheelGraphic");
var storedInput = localStorage.getItem('storedToggleValue'); 

toggleButton.addEventListener('change', function() {
    if (this.checked) {
        graphicToShow = 'feelings-wheel-new-2.webp';
    } else {
        graphicToShow = 'feelings-wheel.jpg';  
    }

    setGraphic();
    saveToLocal();
     
});

if (storedInput) {
    img.src = storedInput;

    if (storedInput == "feelings-wheel-new-2.webp" || storedInput == "https://feelingswheel.com/feelings-wheel-new-2.webp") {
      toggleButton.checked = true;
    } else {
      toggleButton.checked = false;
    }
} else {
    graphicToShow = "feelings-wheel-new-2.webp";
    localStorage.setItem('storedToggleValue', graphicToShow);    
    toggleButton.checked = true;
};
 

const saveToLocal = () => {
  localStorage.setItem('storedToggleValue', graphicToShow);
}



const setGraphic = () => {
  img.src = graphicToShow;
}

// --- Gesture state ---
let isPointerDown = false;     // one-finger rotation
let startAngle = 0;            // radians
let currentDegree = 0;         // degrees
let currentScale = 1;          // pinch zoom factor
const MIN_SCALE = 1;
const MAX_SCALE = 4;
const activePointers = new Map(); // pointerId -> {x,y}
let pinchStartDistance = 0;
let pinchStartScale = 1;


// stops allowing the wheel image to be draggable
img.ondragstart = function () {
    return false;
};

// Convert coordinates to angle about the image center
const getAngleFromEvent = (clientX, clientY, element) => {
  const rect = element.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = clientX - cx;
  const dy = clientY - cy;
  return Math.atan2(dy, dx); // radians
};

const distanceBetween = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);

const applyTransform = () => {
  img.style.transform = `rotateZ(${currentDegree}deg) scale(${currentScale})`;
};

// --- Pointer Events: rotation + pinch zoom ---
const onPointerDown = (e) => {
  img.setPointerCapture?.(e.pointerId);
  activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  if (activePointers.size === 1) {
    isPointerDown = true;
    startAngle = getAngleFromEvent(e.clientX, e.clientY, img);
  } else if (activePointers.size === 2) {
    isPointerDown = false; // switch to pinch
    const [p1, p2] = Array.from(activePointers.values());
    pinchStartDistance = distanceBetween(p1, p2);
    pinchStartScale = currentScale;
  }
  e.preventDefault();
};

const onPointerMove = (e) => {
  if (!activePointers.has(e.pointerId)) return;
  activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  if (activePointers.size === 1 && isPointerDown) {
    const { x, y } = activePointers.values().next().value;
    const now = getAngleFromEvent(x, y, img);
    const delta = now - startAngle;
    currentDegree += (delta * 180) / Math.PI;
    startAngle = now;
    applyTransform();
  } else if (activePointers.size === 2) {
    const [p1, p2] = Array.from(activePointers.values());
    const dist = distanceBetween(p1, p2);
    if (pinchStartDistance > 0) {
      let nextScale = pinchStartScale * (dist / pinchStartDistance);
      currentScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, nextScale));
      applyTransform();
    }
  }
  e.preventDefault();
};

const onPointerUpOrCancel = (e) => {
  activePointers.delete(e.pointerId);

  if (activePointers.size === 0) {
    isPointerDown = false;
  } else if (activePointers.size === 1) {
    const { x, y } = activePointers.values().next().value;
    startAngle = getAngleFromEvent(x, y, img);
    isPointerDown = true;
  }
};

img.addEventListener('pointerdown', onPointerDown, { passive: false });
img.addEventListener('pointermove', onPointerMove, { passive: false });
img.addEventListener('pointerup', onPointerUpOrCancel);
img.addEventListener('pointercancel', onPointerUpOrCancel);

// Optional: desktop/trackpad zoom
img.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  currentScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, currentScale + delta));
  applyTransform();
}, { passive: false });
