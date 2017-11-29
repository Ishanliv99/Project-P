class ToolBox {
  constructor() {
    this.pencil = new Pencil();
    this.eraser = new Eraser();
    this.fillall = new FillAll();
    this.spray = new Spray();
    this.text = new Text();
    this.rect = new Rectangle();
    // this.pick = new Pick();

    this.currentTool = this.pencil;

    panelLeft.appendChild(this.pencil.element);
    panelLeft.appendChild(this.eraser.element);
    panelLeft.appendChild(this.fillall.element);
    panelLeft.appendChild(this.spray.element);
    panelLeft.appendChild(this.text.element);
    panelLeft.appendChild(this.rect.element);
    // panelLeft.appendChild(this.pick.element);

    this.pencil.element.onclick = (event) => {
      this.currentTool = this.pencil;
    }

    this.eraser.element.onclick = (event) => {
      this.currentTool = this.eraser;
    }

    this.fillall.element.onclick = (event) => {
      this.currentTool = this.fillall;
    }

    this.spray.element.onclick = (event) => {
      this.currentTool = this.spray;
    }

    this.text.element.onclick = (event) => {
      this.currentTool = this.text;
    }

    this.rect.element.onclick = (event) => {
      this.currentTool = this.rect;
    }
  }
}