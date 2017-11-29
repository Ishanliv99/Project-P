/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_script_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_script_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__js_script_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_init_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_init_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__js_init_js__);



/***/ }),
/* 1 */
/***/ (function(module, exports) {

function elt (name, attributes){
  let node = document.createElement(name);
  if (attributes) {
    for (let attr in attributes){
      if (attributes.hasOwnProperty(attr))
        node.setAttribute(attr, attributes[attr]);
    }
  }
  // let arguments =[];
   for (let i = 2; i < arguments.length; i++) {
    let child = arguments[i];
    if (typeof child == "string")
      child = document.createTextNode(child);
    node.appendChild(child);//yes yes yes

  }
  return node;
}

let controls = Object.create(null);
let tools = Object.create(null);

createPaint = (parent) => {
  let canvas = elt('canvas', {width: 500, height: 300});
  let cx = canvas.getContext('2d');
  let toolbar = elt('div', {class: 'toolbar'});
  for (let name in controls)
    toolbar.appendChild(controls[name](cx));

  let panel = elt('div', {class: 'picturepanel'}, canvas);
  parent.appendChild(elt('div', null, panel, toolbar));
}

controls.tool = (cx) => {
  let select = elt('select');
  for (let name in tools)
    select.appendChild(elt('option', null, name));

  cx.canvas.addEventListener('mousedown', (event) => {
    if (event.which == 1) {
      tools[select.value](event, cx);
      event.preventDefault();
    }
  });

  return elt('span', null, 'Tool: ', select);
};

relativePos = (event, element) => {
  let rect = element.getBoundingClientRect();
  return {x: Math.floor(event.clientX - rect.left),
          y: Math.floor(event.clientY - rect.top)};
}

trackDrag = (onMove, onEnd) => {
  end = (event) => {
    removeEventListener('mousemove', onMove);
    removeEventListener('mouseup', end);
    if (onEnd)
      onEnd(event);
  }
  addEventListener('mousemove', onMove);
  addEventListener('mouseup', end);
}

tools.Line = (event, cx, onEnd) => {
  cx.lineCap = 'round';

  let pos = relativePos(event, cx.canvas);
  trackDrag((event) => {
    cx.beginPath();
    cx.moveTo(pos.x, pos.y);
    pos = relativePos(event, cx.canvas);
    cx.lineTo(pos.x, pos.y);
    cx.stroke();
  }, onEnd);
};

tools.Erase = (event, cx) => {
  cx.globalCompositeOperation = 'destination-out';
  tools.Line(event, cx, () => {
    cx.globalCompositeOperation = 'source-over';
  });
};

controls.color = (cx) => {
  let input = elt('input', {type: 'color'});
  input.addEventListener('change', () => {
    cx.fillStyle = input.value;
    cx.strokeStyle = input.value;
  });
  return elt('span', null, 'Color: ', input);
};

controls.brushSize = (cx) => {
  let select = elt('select');
  let sizes = [1, 2, 3, 5, 8, 12, 25, 35, 50, 75, 100];
  sizes.forEach((size) => {
    select.appendChild(elt('option', {value: size},
                           size + ' pixels'));
  });
  select.addEventListener('change', () => {
    cx.lineWidth = select.value;
  });
  return elt('span', null, 'Brush size: ', select);
};

controls.save = (cx) => {
  let link = elt('a', {href: '/'}, 'Save');
  update = () => {
    try {
      link.href = cx.canvas.toDataURL();
    } catch (e) {
      if (e instanceof SecurityError)
        link.href = 'javascript:alert(' +
          JSON.stringify('Cant save: ' + e.toString()) + ')';
      else
        throw e;
    }
  }
  link.addEventListener('mouseover', update);
  link.addEventListener('focus', update);
  return link;
};

loadImageURL = (cx, url) => {
  let image = document.createElement('img');
  image.addEventListener('load', () => {
    let color = cx.fillStyle, size = cx.lineWidth;
    cx.canvas.width = image.width;
    cx.canvas.height = image.height;
    cx.drawImage(image, 0, 0);
    cx.fillStyle = color;
    cx.strokeStyle = color;
    cx.lineWidth = size;
  });
  image.src = url;
}

controls.openFile = (cx) => {
  let input = elt('input', {type: 'file'});
  input.addEventListener('change', () => {
    if (input.files.length == 0) return;
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      loadImageURL(cx, reader.result);
    });
    reader.readAsDataURL(input.files[0]);
  });
  return elt('div', null, 'Open file: ', input);
};

controls.openURL = (cx) => {
  let input = elt('input', {type: 'text'});
  let form = elt('form', null,
                 'Open URL: ', input,
                 elt('button', {type: 'submit'}, 'load'));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    loadImageURL(cx, input.value);
  });
  return form;
};

tools.Text = (event, cx) => {
  let text = prompt('Text:', '');
  if (text) {
    let pos = relativePos(event, cx.canvas);
    cx.font = Math.max(7, cx.lineWidth) + 'px sans-serif';
    cx.fillText(text, pos.x, pos.y);
  }
};

tools.Spray = (event, cx) => {
  let radius = cx.lineWidth / 2;
  let area = radius * radius * Math.PI;
  let dotsPerTick = Math.ceil(area / 30);

  let currentPos = relativePos(event, cx.canvas);
  let spray = setInterval( () => {
    for (let i = 0; i < dotsPerTick; i++) {
      let offset = randomPointInRadius(radius);
      cx.fillRect(currentPos.x + offset.x,
                  currentPos.y + offset.y, 1, 1);
    }
  }, 25);
  trackDrag( (event) => {
    currentPos = relativePos(event, cx.canvas);
  }, () => {
    clearInterval(spray);
  });
};

rectangleFrom = (a, b) => {
    return {left: Math.min(a.x, b.x),
            top: Math.min(a.y, b.y),
            width: Math.abs(a.x - b.x),
            height: Math.abs(a.y - b.y)};
  }

  tools.Rectangle = (event, cx) => {
    let relativeStart = relativePos(event, cx.canvas);
    let pageStart = {x: event.pageX, y: event.pageY};

    let trackingNode = document.createElement('div');
    trackingNode.style.position = 'absolute';
    trackingNode.style.background = cx.fillStyle;
    document.body.appendChild(trackingNode);

    trackDrag( (event) => {
      let rect = rectangleFrom(pageStart,
                               {x: event.pageX, y: event.pageY});
      trackingNode.style.left = rect.left + 'px';
      trackingNode.style.top = rect.top + 'px';
      trackingNode.style.width = rect.width + 'px';
      trackingNode.style.height = rect.height + 'px';
    }, (event) => {
      let rect = rectangleFrom(relativeStart,
                               relativePos(event, cx.canvas));
      cx.fillRect(rect.left, rect.top, rect.width, rect.height);
      document.body.removeChild(trackingNode);
    });
  };

  colorAt = (cx, x, y) => {
    let pixel = cx.getImageData(x, y, 1, 1).data;
    return 'rgb(' + pixel[0] + ', ' + pixel[1] + ', ' + pixel[2] + ')';
  }

  tools['Pick color'] = (event, cx) => {
    let pos = relativePos(event, cx.canvas);
    try {
      let color = colorAt(cx, pos.x, pos.y);
    } catch(e) {
      if (e instanceof SecurityError) {
        alert('Unable to access the pixel data of your picture');
        return;
      } else {
        throw e;
      }
    }
    cx.fillStyle = color;
    cx.strokeStyle = color;
  };

  // Call a given function for all horizontal and vertical neighbors
  // of the given point.
  forAllNeighbors = (point, fn) => {
    fn({x: point.x, y: point.y + 1});
    fn({x: point.x, y: point.y - 1});
    fn({x: point.x + 1, y: point.y});
    fn({x: point.x - 1, y: point.y});
  }

  // Given two positions, returns true when they hold the same color.
  isSameColor = (data, pos1, pos2) => {
    let offset1 = (pos1.x + pos1.y * data.width) * 4;
    let offset2 = (pos2.x + pos2.y * data.width) * 4;
    for (let i = 0; i < 4; i++) {
      if (data.data[offset1 + i] != data.data[offset2 + i])
        return false;
    }
    return true;
  }

  tools['Flood fill'] = (event, cx) => {
    let startPos = relativePos(event, cx.canvas);

    let data = cx.getImageData(0, 0, cx.canvas.width,
                               cx.canvas.height);
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
  };

randomPointInRadius = (radius) => {
  for (;;) {
    let x = Math.random() * 2 - 1;
    let y = Math.random() * 2 - 1;
    if (x * x + y * y <= 1)
      return {x: x * radius, y: y * radius};
  }
}

createPaint(document.body);

/***/ }),
/* 2 */
/***/ (function(module, exports) {



/***/ })
/******/ ]);