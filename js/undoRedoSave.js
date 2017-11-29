class Undo {
  constructor() {
    this.element = document.createElement('button');
    this.element.id = 'undo';
    this.element.style.width = '20px';
    this.element.style.height = '20px';
    this.element.style.padding = '20px';
    this.element.style.margin = '10px';
    this.element.style.backgroundImage = 'url(images/undo.png)';
    this.element.style.backgroundSize = '20px 20px';
    this.element.style.backgroundRepeat = 'no-repeat';
    this.element.style.backgroundPosition = 'center';
    this.element.style.borderRadius = '20px';
  }
}

class Redo {
  constructor() {
    this.element = document.createElement('button');
    this.element.id = 'redo';
    this.element.style.width = '20px';
    this.element.style.height = '20px';
    this.element.style.padding = '20px';
    this.element.style.margin = '10px'
    this.element.style.backgroundImage = 'url(images/redo.png)';
    this.element.style.backgroundSize = '20px 20px';
    this.element.style.backgroundRepeat = 'no-repeat';
    this.element.style.backgroundPosition = 'center';
    this.element.style.borderRadius = '20px';
  }
}

class Save {
  constructor() {
    this.element = document.createElement('a');
    this.button = document.createElement('button');
    this.button.id = 'download';
    this.button.style.width = '20px';
    this.button.style.height = '20px';
    this.button.style.padding = '20px';
    this.element.style.margin = '10px';
    this.button.style.backgroundImage = 'url(images/download.png)';
    this.button.style.backgroundSize = '20px 20px';
    this.button.style.backgroundRepeat = 'no-repeat';
    this.button.style.backgroundPosition = 'center';
    this.button.style.borderRadius = '20px';
    this.element.href = '#';
    this.element.download = 'canvas.png';
    this.element.appendChild(this.button);
  }
}