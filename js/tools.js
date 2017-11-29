    let relativePos = (event, element) => {
      let rect = element.getBoundingClientRect();
      return {
        x: Math.floor(event.clientX - rect.left),
        y: Math.floor(event.clientY - rect.top)
      };
    }

    let trackDrag = (onMove, onEnd) => {
      let end = (event) => {
        removeEventListener('mousemove', onMove);
        removeEventListener('mouseup', end);
        if (onEnd)
          onEnd(event);
      }
      addEventListener('mousemove', onMove);
      addEventListener('mouseup', end);
    }

    let colorAt = (cx, x, y) => {
      this.pixel = cx.getImageData(x, y, 1, 1).data;
      return 'rgb(' + this.pixel[0] + ', ' + this.pixel[1] + ', ' + this.pixel[2] + ')';
    }

    // Call a given function for all horizontal and vertical neighbors
    // of the given point.
    let forAllNeighbors = (point, fn) => {
      fn({
        x: point.x,
        y: point.y + 1
      });
      fn({
        x: point.x,
        y: point.y - 1
      });
      fn({
        x: point.x + 1,
        y: point.y
      });
      fn({
        x: point.x - 1,
        y: point.y
      });
    }

    // Given two positions, returns true when they hold the same color.
    let isSameColor = (data, pos1, pos2) => {
      this.offset1 = (pos1.x + pos1.y * data.width) * 4;
      this.offset2 = (pos2.x + pos2.y * data.width) * 4;
      for (let i = 0; i < 4; i++) {
        if (data.data[this.offset1 + i] != data.data[this.offset2 + i])
          return false;
      }
      return true;
    }


    let randomPointInRadius = (radius) => {
      for (;;) {
        this.x = Math.random() * 2 - 1;
        this.y = Math.random() * 2 - 1;
        if (this.x * this.x + this.y * this.y <= 1)
          return {
            x: this.x * radius,
            y: this.y * radius
          };
      }
    }

    let rectangleFrom = (a, b) => {
      return {
        left: Math.min(a.x, b.x),
        top: Math.min(a.y, b.y),
        width: Math.abs(a.x - b.x),
        height: Math.abs(a.y - b.y)
      };
    }

    class Pencil {
      constructor() {
        this.element = document.createElement('button');
        this.element.id = 'pencil';
        this.element.style.width = '20px';
        this.element.style.height = '20px';
        this.element.style.padding = '20px';
        this.element.style.backgroundImage = 'url(images/pencil.png)';
        this.element.style.backgroundSize = '20px 20px';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.backgroundPosition = 'center';
        this.element.style.borderRadius = '20px';
      }

      pencilFunction(event, canvas) {
        let cx = canvas.getContext('2d');

        cx.lineCap = 'round';
        this.pos = relativePos(event, canvas);
        cx.fillStyle = this.color;
        cx.beginPath();
        cx.arc(this.pos.x - (this.lineWidth) / 4, this.pos.y - (this.lineWidth) / 4, this.lineWidth / 2, 0, 2 * Math.PI);
        cx.fill();
        cx.closePath();
        trackDrag((event) => {
          cx.strokeStyle = this.color;
          cx.lineWidth = this.lineWidth;
          cx.beginPath();
          cx.moveTo(this.pos.x, this.pos.y);
          this.pos = relativePos(event, canvas);
          cx.lineTo(this.pos.x, this.pos.y);
          cx.stroke();
          cx.closePath();
        });
      }
    }

    class Eraser {
      constructor() {
        this.element = document.createElement('button');
        this.element.id = 'eraser';
        this.element.style.width = '20px';
        this.element.style.height = '20px';
        this.element.style.padding = '20px';
        this.element.style.backgroundImage = 'url(images/eraser.png)';
        this.element.style.backgroundSize = '20px 20px';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.backgroundPosition = 'center';
        this.element.style.borderRadius = '20px';
      }

      eraseFunction(event, canvas) {
        let cx = canvas.getContext('2d');

        this.pos = relativePos(event, canvas);
        cx.clearRect(this.pos.x - (this.lineWidth / 2), this.pos.y - (this.lineWidth / 2), this.lineWidth, this.lineWidth);

        trackDrag((event) => {
          cx.moveTo(this.pos.x, this.pos.y);
          this.pos = relativePos(event,
            canvas);
          cx.clearRect(this.pos.x - (this.lineWidth / 2), this.pos.y - (this.lineWidth / 2), this.lineWidth, this.lineWidth);
        });
      }
    }

    class FillAll {
      constructor() {
        this.element = document.createElement('button');
        this.element.id = 'fillall';
        this.element.style.width = '20px';
        this.element.style.height = '20px';
        this.element.style.padding = '20px';
        this.element.style.backgroundImage = 'url(images/bucket.png)';
        this.element.style.backgroundSize = '20px 20px';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.backgroundPosition = 'center';
        this.element.style.borderRadius = '20px';
      }

      fillAllFunction(event, canvas) {
        let cx = canvas.getContext('2d');

        cx.fillStyle = this.color;
        let startPos = relativePos(event, canvas);

        let data = cx.getImageData(0, 0, canvas.width,
          canvas.height);
        // An array with one place for each pixel in the image.
        let alreadyFilled = new Array(data.width * data.height);

        // This is a list of same-colored pixel coordinates that we have
        // not handled yet.
        let workList = [startPos];
        while (workList.length) {
          let pos = workList.pop();
          let offset = pos.x + data.width * pos.y;
          if (alreadyFilled[offset]) continue;

          cx.fillRect(pos.x, pos.y, 1, 1);
          alreadyFilled[offset] = true;

          forAllNeighbors(pos, (neighbor) => {
            if (neighbor.x >= 0 && neighbor.x < data.width &&
              neighbor.y >= 0 && neighbor.y < data.height &&
              isSameColor(data, startPos, neighbor))
              workList.push(neighbor);
          });
        }
      }

    }

    class Spray {
      constructor() {
        this.element = document.createElement('button');
        this.element.id = 'spray';
        this.element.style.width = '20px';
        this.element.style.height = '20px';
        this.element.style.padding = '20px';
        this.element.style.backgroundImage = 'url(images/spray.png)';
        this.element.style.backgroundSize = '20px 20px';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.backgroundPosition = 'center';
        this.element.style.borderRadius = '20px';
      }

      sprayFunction(event, canvas) {
        let cx = canvas.getContext('2d');

        let radius = this.lineWidth / 2;
        let area = radius * radius * Math.PI;
        let dotsPerTick = Math.ceil(area / 30);

        let currentPos = relativePos(event, canvas);
        cx.fillStyle = this.color;

        let spray = setInterval(() => {
          for (let i = 0; i < dotsPerTick; i++) {
            let offset = randomPointInRadius(radius);
            cx.fillRect(currentPos.x + offset.x,
              currentPos.y + offset.y, 1, 1);
          }
        }, 25);
        trackDrag((event) => {
          currentPos = relativePos(event, canvas);
        }, () => {
          clearInterval(spray);
        });
      }
    }


    class Text {
      constructor() {
        this.element = document.createElement('button');
        this.element.id = 'text';
        this.element.style.width = '20px';
        this.element.style.height = '20px';
        this.element.style.padding = '20px';
        this.element.style.backgroundImage = 'url(images/text.png)';
        this.element.style.backgroundSize = '20px 20px';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.backgroundPosition = 'center';
        this.element.style.borderRadius = '20px';
      }

      textFunction(event, canvas) {
        let cx = canvas.getContext('2d');

        let text = prompt('Text:', '');
        cx.fillStyle = this.color;

        if (text) {
          let pos = relativePos(event, canvas);
          cx.font = this.lineWidth + 'px sans-serif';
          cx.fillText(text, pos.x, pos.y);
        }
      }
    }

    class Rectangle {
      constructor() {
        this.element = document.createElement('button');
        this.element.id = 'rectangle';
        this.element.style.width = '20px';
        this.element.style.height = '20px';
        this.element.style.padding = '20px';
        this.element.style.backgroundImage = 'url(images/rectangle.png)';
        this.element.style.backgroundSize = '20px 20px';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.backgroundPosition = 'center';
        this.element.style.borderRadius = '20px';
      }

      rectFunction(event, canvas) {
        let cx = canvas.getContext('2d');

        let relativeStart = relativePos(event, canvas);
        let pageStart = {
          x: event.pageX,
          y: event.pageY
        };

        let trackingNode = document.createElement('div');
        trackingNode.style.position = 'absolute';
        trackingNode.style.borderStyle = 'dashed';
        trackingNode.style.borderColor = this.color;
        document.body.appendChild(trackingNode);

        trackDrag((event) => {
          let rect = rectangleFrom(pageStart, {
            x: event.pageX,
            y: event.pageY
          });
          trackingNode.style.left = rect.left + 'px';
          trackingNode.style.top = rect.top + 'px';
          trackingNode.style.width = rect.width + 'px';
          trackingNode.style.height = rect.height + 'px';
        }, (event) => {
          let rect = rectangleFrom(relativeStart,
            relativePos(event, canvas));
          cx.strokeStyle = this.color;
          cx.strokeRect(rect.left, rect.top, rect.width, rect.height);
          document.body.removeChild(trackingNode);
        });
      };
    }

    class Pick {
      constructor() {
        this.element = document.createElement('button');
        this.element.id = 'drop';
        this.element.style.width = '20px';
        this.element.style.height = '20px';
        this.element.style.padding = '20px';
        this.element.style.backgroundImage = 'url(images/drop.png)';
        this.element.style.backgroundSize = '20px 20px';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.backgroundPosition = 'center';
        this.element.style.borderRadius = '20px';
      }

      pickColor(event, canvas) {
        let cx = canvas.getContext('2d');
        let pos = relativePos(event, canvas);
        let color = colorAt(cx, pos.x, pos.y);
        console.log(color);
      };
    }