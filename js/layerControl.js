class LayerControl {
    constructor() {
        this.createButton = document.createElement('button');
        this.createButton.style.width = '15px';
        this.createButton.style.height = '15px';
        this.createButton.style.padding = '15px';
        this.createButton.className = 'layer';
        this.createButton.style.backgroundImage = 'url(images/add.png)';
        this.createButton.style.backgroundSize = '20px 20px';
        this.createButton.style.backgroundRepeat = 'no-repeat';
        this.createButton.style.backgroundPosition = 'center';
        this.createButton.style.float = 'left';
        this.createButton.style.borderRadius = '15px';
        upperRight.appendChild(this.createButton);

        this.deleteButton = document.createElement('button');
        this.deleteButton.style.width = '15px';
        this.deleteButton.style.height = '15px';
        this.deleteButton.style.padding = '15px';
        this.deleteButton.className = 'layer';
        this.deleteButton.style.backgroundImage = 'url(images/delete.png)';
        this.deleteButton.style.backgroundSize = '20px 20px';
        this.deleteButton.style.backgroundRepeat = 'no-repeat';
        this.deleteButton.style.backgroundPosition = 'center';
        this.deleteButton.style.float = 'left';
        this.deleteButton.style.borderRadius = '15px';
        upperRight.appendChild(this.deleteButton);

        this.mergeButton = document.createElement('button');
        this.mergeButton.style.width = '15px';
        this.mergeButton.style.height = '15px';
        this.mergeButton.style.padding = '15px';
        this.mergeButton.className = 'layer';
        this.mergeButton.style.backgroundImage = 'url(images/merge.png)';
        this.mergeButton.style.backgroundSize = '20px 20px';
        this.mergeButton.style.backgroundRepeat = 'no-repeat';
        this.mergeButton.style.backgroundPosition = 'center';
        this.mergeButton.style.float = 'left';
        this.mergeButton.style.borderRadius = '15px';
        upperRight.appendChild(this.mergeButton);

        this.duplicateButton = document.createElement('button');
        this.duplicateButton.style.width = '15px';
        this.duplicateButton.style.height = '15px';
        this.duplicateButton.style.padding = '15px';
        this.duplicateButton.className = 'layer';
        this.duplicateButton.style.backgroundImage = 'url(images/duplicate.png)';
        this.duplicateButton.style.backgroundSize = '20px 20px';
        this.duplicateButton.style.backgroundRepeat = 'no-repeat';
        this.duplicateButton.style.backgroundPosition = 'center';
        this.duplicateButton.style.float = 'left';
        this.duplicateButton.style.borderRadius = '15px';
        upperRight.appendChild(this.duplicateButton);

        this.moveUp = document.createElement('button');
        this.moveUp.style.width = '15px';
        this.moveUp.style.height = '15px';
        this.moveUp.style.padding = '15px';
        this.moveUp.className = 'layer';
        this.moveUp.style.backgroundImage = 'url(images/up.png)';
        this.moveUp.style.backgroundSize = '20px 20px';
        this.moveUp.style.backgroundRepeat = 'no-repeat';
        this.moveUp.style.backgroundPosition = 'center';
        this.moveUp.style.float = 'left';
        this.moveUp.style.borderRadius = '15px';
        upperRight.appendChild(this.moveUp);

        this.moveDown = document.createElement('button');
        this.moveDown.style.width = '15px';
        this.moveDown.style.height = '15px';
        this.moveDown.style.padding = '15px';
        this.moveDown.className = 'layer';
        this.moveDown.style.backgroundImage = 'url(images/down.png)';
        this.moveDown.style.backgroundSize = '20px 20px';
        this.moveDown.style.backgroundRepeat = 'no-repeat';
        this.moveDown.style.backgroundPosition = 'center';
        this.moveDown.style.float = 'left';
        this.moveDown.style.borderRadius = '15px';
        upperRight.appendChild(this.moveDown);
    }
}