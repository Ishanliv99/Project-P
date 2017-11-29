let mainWrapper = document.getElementById('main-wrapper');

let panelTop = document.createElement('div');
panelTop.id = 'panel-top';
mainWrapper.appendChild(panelTop);

let panelRight = document.createElement('div');
panelRight.id = 'panel-right';
mainWrapper.appendChild(panelRight);

let canvasContainer = document.createElement('div');
canvasContainer.id = 'canvas-container';
mainWrapper.appendChild(canvasContainer);

let panelLeft = document.createElement('div');
panelLeft.id = 'panel-left';
mainWrapper.appendChild(panelLeft);

let upperRight = document.createElement('div');
upperRight.className = 'clrfix';
let lowerRight = document.createElement('div');

upperRight.id = 'upper-right';
lowerRight.id = 'lower-right';

panelRight.appendChild(upperRight);
panelRight.appendChild(lowerRight);

let painter = new MainPainter();