class LayerElement {
    constructor(index) {
        this.element = document.createElement('div');
        this.element.style.lineHeight = '30px';
        this.element.style.width = '150px';
        // this.element.draggable = 'true';
        this.element.style.textAlign = 'center';
        this.element.style.border = '#555555 1px solid';
        // this.element.style.display = 'inline';
        this.element.style.position = 'absolute';
        this.element.style.left = '0';
        this.element.style.top = index*52 + 45 +'px';
        this.element.style.padding = '10px 20px';
        this.element.style.cursor = 'pointer';

        this.canvasLayer = document.createElement('canvas');
        this.canvasLayer.className = 'canvasLayer';
        this.canvasLayer.style.position = 'absolute';
        this.canvasLayer.style.left = '0';
        this.canvasLayer.style.top = '0';
        this.canvasLayer.width = '800';
        this.canvasLayer.height = '400';
        // this.canvasLayer.style.backgroundColor = 'rgba(255,255,255,1)';

        this.objectTag = document.createElement('object');

        this.checkBox = document.createElement('input');
        this.checkBox.type = 'checkbox';
        this.checkBox.setAttribute('checked', 'true');
        this.checkBox.addEventListener('click',(event) =>{
            event.preventDefault();
            event.stopPropagation();
            return false;
        },{capture : false});
        this.objectTag.appendChild(this.checkBox);
        this.element.appendChild(this.checkBox);

        this.checkBox.addEventListener('change',(event) =>{
        console.log(1);
        // this.activeLayer.canvasLayer.style.display = 'none';
      })
    }
}