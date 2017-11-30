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
    this.currentTool.element.style.backgroundColor = '#06A0D8';

    panelLeft.appendChild(this.pencil.element);
    panelLeft.appendChild(this.eraser.element);
    panelLeft.appendChild(this.fillall.element);
    panelLeft.appendChild(this.spray.element);
    panelLeft.appendChild(this.text.element);
    panelLeft.appendChild(this.rect.element);
    // panelLeft.appendChild(this.pick.element);

    this.pencil.element.onclick = (event) => {
      this.resetToolBox();
      this.currentTool = this.pencil;
      this.currentTool.element.style.backgroundColor = '#06A0D8';
    }

    this.eraser.element.onclick = (event) => {
      this.resetToolBox();
      this.currentTool = this.eraser;
      this.currentTool.element.style.backgroundColor = '#06A0D8';
    }

    this.fillall.element.onclick = (event) => {
      this.resetToolBox();
      this.currentTool = this.fillall;
      this.currentTool.element.style.backgroundColor = '#06A0D8';
    }

    this.spray.element.onclick = (event) => {
      this.resetToolBox();
      this.currentTool = this.spray;
      this.currentTool.element.style.backgroundColor = '#06A0D8';
    }

    this.text.element.onclick = (event) => {
      this.resetToolBox();
      this.currentTool = this.text;
      this.currentTool.element.style.backgroundColor = '#06A0D8';
    }

    this.rect.element.onclick = (event) => {
      this.resetToolBox();
      this.currentTool = this.rect;
      this.currentTool.element.style.backgroundColor = '#06A0D8';
    }
  }

  resetToolBox(){
    this.pencil.element.style.backgroundColor = '#FFF';
    this.eraser.element.style.backgroundColor = '#FFF';
    this.fillall.element.style.backgroundColor = '#FFF';
    this.spray.element.style.backgroundColor = '#FFF';
    this.text.element.style.backgroundColor = '#FFF';
    this.rect.element.style.backgroundColor = '#FFF';
  }
}