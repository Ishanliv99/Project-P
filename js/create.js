let mainWrapper = document.getElementById('main-wrapper');

// let panelTop = document.createElement('div');
// panelTop.id = 'panel-top';
// mainWrapper.appendChild(panelTop);

// let topLeft = document.createElement('div');
// topLeft.id = 'top-left';
// panelTop.appendChild(topLeft);

// let topRight = document.createElement('div');
// topRight.id = 'top-right';
// panelTop.appendChild(topRight);

// let panelRight = document.createElement('div');
// panelRight.id = 'panel-right';
// mainWrapper.appendChild(panelRight);

// let canvasContainer = document.createElement('div');
// canvasContainer.id = 'canvas-container';
// mainWrapper.appendChild(canvasContainer);

// let panelLeft = document.createElement('div');
// panelLeft.id = 'panel-left';
// mainWrapper.appendChild(panelLeft);
// let upperRight = document.createElement('div');
// let lowerRight = document.createElement('div');

let panelTop = document.getElementById('panel-top');
let panelLeft = document.getElementById('panel-left');
let panelRight = document.getElementById('panel-right');
let canvasContainer = document.getElementById('canvas-container');
let topLeft = document.getElementById('top-left');
let topRight = document.getElementById('top-right');
let upperRight = document.getElementById('upper-right');
let lowerRight = document.getElementById('lower-right');
let panelBottom = document.getElementById('panel-bottom');
let bottomLeft = document.getElementById('bottom-left');
let bottomRight = document.getElementById('bottom-right');

let painter = new MainPainter();