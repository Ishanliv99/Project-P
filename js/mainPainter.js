class MainPainter {
  constructor() {
    this.canvases = [];
    this.history = [];
    this.tracker = 0;

    this.toolBox = new ToolBox();

    this.toolProperties = new ToolProperties();
    bottomLeft.appendChild(this.toolProperties.colorInput);
    bottomRight.appendChild(this.toolProperties.sizeInput);

    this.undo = new Undo();
    this.redo = new Redo();
    this.save = new Save();
    topRight.appendChild(this.undo.element);
    topRight.appendChild(this.redo.element);
    topRight.appendChild(this.save.element);

    this.layerControl = new LayerControl();

    this.layerControl.createButton.addEventListener('click', this.createNew = (event) => {
      let layer = new LayerElement(this.canvases.length);
      lowerRight.appendChild(layer.element);
      canvasContainer.appendChild(layer.canvasLayer);

      this.canvases.push(layer);
      this.arrangeLayers();
      this.activeLayer = layer;
      this.history = [];

      for (let i = 0; i < this.canvases.length; i++) {
        this.canvases[i].element.style.backgroundColor = '#FFF';
      }

      this.activeLayer.element.style.backgroundColor = '#06A0D8';

      layer.element.innerHTML += ' Layer ' + this.tracker;
      layer.element.id = 'Layer' + this.tracker;
      layer.canvasLayer.id = 'Canvas' + this.tracker;
      layer.canvasLayer.style.zIndex = this.tracker;
      this.tracker++;

      layer.element.addEventListener('click', (event) => {
        this.history = [];
        this.activeLayer = layer;
        this.history.push(this.activeLayer.canvasLayer.toDataURL());

        for (let i = 0; i < this.canvases.length; i++) {
          this.canvases[i].element.style.backgroundColor = '#FFF';
        }
        this.activeLayer.element.style.backgroundColor = '#06A0D8';
      });

      this.history.push(this.activeLayer.canvasLayer.toDataURL());

      // console.log( this.toolBox.currentTool.color);

      this.activeLayer.canvasLayer.addEventListener('mousedown', (event) => {
        this.toolBox.currentTool.color = this.toolProperties.colorInput.value;
        this.toolBox.currentTool.lineWidth = this.toolProperties.sizeInput.value;
        if (this.toolBox.currentTool == this.toolBox.pencil)
          this.toolBox.pencil.pencilFunction(event, this.activeLayer.canvasLayer);
        else if (this.toolBox.currentTool == this.toolBox.eraser)
          this.toolBox.eraser.eraseFunction(event, this.activeLayer.canvasLayer);
        else if (this.toolBox.currentTool == this.toolBox.fillall)
          this.toolBox.fillall.fillAllFunction(event, this.activeLayer.canvasLayer);
        else if (this.toolBox.currentTool == this.toolBox.spray)
          this.toolBox.spray.sprayFunction(event, this.activeLayer.canvasLayer);
        else if (this.toolBox.currentTool == this.toolBox.text)
          this.toolBox.text.textFunction(event, this.activeLayer.canvasLayer);
        else if (this.toolBox.currentTool == this.toolBox.rect)
          this.toolBox.rect.rectFunction(event, this.activeLayer.canvasLayer);
        else if (this.toolBox.currentTool == this.toolBox.pick)
          this.toolBox.pick.pickColor(event, this.activeLayer.canvasLayer);
      });

      this.activeLayer.canvasLayer.addEventListener('mouseup', (event) => {
        this.history.push(this.activeLayer.canvasLayer.toDataURL());
        this.head = this.history.length - 1;
      })
    });

    this.layerControl.deleteButton.addEventListener ('click',(event) => {
      if (this.canvases.length > 0) {
        lowerRight.removeChild(this.activeLayer.element);
        canvasContainer.removeChild(this.activeLayer.canvasLayer);
        this.canvases.splice(this.canvases.indexOf(this.activeLayer), 1);
        if (this.canvases.length != 0) {
          this.activeLayer = this.canvases[this.canvases.length - 1];
          this.activeLayer.element.style.backgroundColor = '#06A0D8';
        }
        this.history = [];
        this.history.push(this.activeLayer.canvasLayer.toDataURL());
        this.arrangeLayers();
      }
    })

    this.layerControl.mergeButton.addEventListener ('click',(event) => {
      if (this.canvases.length > 1 && (this.canvases.length - 1) != this.canvases.indexOf(this.activeLayer)) {
        let selectedLayer = this.canvases[this.canvases.indexOf(this.activeLayer) + 1];
        let cx = this.activeLayer.canvasLayer.getContext('2d');
        cx.drawImage(selectedLayer.canvasLayer, 0, 0);
        lowerRight.removeChild(selectedLayer.element);
        canvasContainer.removeChild(selectedLayer.canvasLayer);
        this.canvases.splice(this.canvases.indexOf(selectedLayer), 1);
        this.history = [];
        this.history.push(this.activeLayer.canvasLayer.toDataURL());
        this.arrangeLayers();
      }
    })

    this.layerControl.duplicateButton.addEventListener ('click',(event) => {
      if (this.canvases.length > 0) {
        let lastLayer = this.activeLayer;
        this.createNew();
        // let duplicateLayer = new LayerElement()
        let cx = this.canvases[this.canvases.length - 1].canvasLayer.getContext('2d');
        cx.drawImage(lastLayer.canvasLayer, 0, 0);
        this.history = [];
        this.history.push(this.activeLayer.canvasLayer.toDataURL());
        this.arrangeLayers();
      }
    })

    this.layerControl.moveUp.addEventListener('click', (event) => {
      if (this.canvases.length > 1 && this.canvases.indexOf(this.activeLayer) != 0) {
        let pos = this.canvases.indexOf(this.activeLayer);
        let temp = this.canvases[pos];
        this.canvases[pos] = this.canvases[pos - 1];
        this.canvases[pos - 1] = temp;
        this.arrangeLayers();
      }
    });

    this.layerControl.moveDown.addEventListener('click', (event) => {
      if (this.canvases.length > 1 && this.canvases.indexOf(this.activeLayer) != (this.canvases.length - 1)) {
        let pos = this.canvases.indexOf(this.activeLayer);
        let temp = this.canvases[pos];
        this.canvases[pos] = this.canvases[pos + 1];
        this.canvases[pos + 1] = temp;
        this.arrangeLayers();
      }
    });

    this.undo.element.addEventListener('click', (event) => {
      if (this.head > 0 && this.canvases.length > 0) {
        let cx = this.activeLayer.canvasLayer.getContext('2d');
        this.head--;
        cx.clearRect(0, 0, 800, 400);
        let img = new Image();
        img.src = this.history[this.head];
        img.onload = () => {
          cx.drawImage(img, 0, 0);
        }
      }
    })

    this.redo.element.addEventListener('click', (event) => {
      if (this.head < this.history.length - 1 && this.canvases.length > 0) {
        let cx = this.activeLayer.canvasLayer.getContext('2d');
        this.head++;
        cx.clearRect(0, 0, 800, 400);
        let img = new Image();
        img.src = this.history[this.head];
        img.onload = () => {
          cx.drawImage(img, 0, 0);
        }
      }
    })

    this.save.element.addEventListener('click', (event) => {
      if (this.canvases.length > 0) {
        let dataURL = this.activeLayer.canvasLayer.toDataURL('image/png');
        this.save.element.href = dataURL;
      }
    })

    // this.open.element.addEventListener('click', (event) => {
    //   if (this.canvases.length > 0) {
    //     let cx = this.activeLayer.canvasLayer.getContext('2d');
    //     let img = new Image();
    //     // console.log(this.open.element.value);
    //     img.src = this.open.element.value;
    //     img.onload = () => {
    //       cx.drawImage(img, 0, 0);
    //     }
    //   }
    // })
  }

  arrangeLayers() {
    // console.log(this.canvases.length);
    this.canvases.forEach((layer) => {
      layer.element.style.top = this.canvases.indexOf(layer) * 52 + 50 + 'px';
      layer.canvasLayer.style.zIndex = this.canvases.indexOf(layer)
    })
  }
}