class ToolProperties {
  constructor() {
    this.colorInput = document.createElement('input');
    this.colorInput.type = 'color';
    this.colorInput.style.margin = '5px';

    this.colorInput.addEventListener('change', () => {
      this.color = this.colorInput.value;
    });

    this.sizeInput = document.createElement('input');
    this.sizeInput.style.margin = '5px';
    this.sizeInput.type = 'range';
    this.sizeInput.min = 1;
    this.sizeInput.max = 100;
    this.sizeInput.value = 1;
    this.sizeInput.step = 1;
    this.lineWidth = 1;

    this.sizeInput.addEventListener('change', () => {
      this.lineWidth = this.sizeInput.value;
    });
  }
}