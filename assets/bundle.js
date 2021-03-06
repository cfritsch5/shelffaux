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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _book = __webpack_require__(1);

var _book2 = _interopRequireDefault(_book);

var _books2 = __webpack_require__(3);

var _books3 = _interopRequireDefault(_books2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function (event) {
  var shelf = document.getElementById('shelf');
  var books = addBooks();
  var targetBookDiv = null;
  var targetBookObject = null;

  function addBooks() {
    var _books = [];
    for (var i = 0; i < _books3.default.length; i++) {
      var book = null;
      book = new _book2.default(_books3.default[i], i);
      _books.push(book);
      shelf.appendChild(book.html);
      book.html.addEventListener('mousemove', onMove);
    }
    return _books;
  }

  function onMove(e) {
    targetBookDiv = e.currentTarget;
    targetBookObject = findBookObject(targetBookDiv.classList[1]);
    for (var i = 0; i < _books3.default.length; i++) {
      var direction = i <= targetBookObject.position ? -1 : 1;
      books[i].updateTransformation({ rY: 45 * direction });
    }
  }

  // function shelvebooks(){
  //   let pos = 0;
  //   for(let i = 0; i < books.length ; i++){
  //     books[i].i = i;
  //     books[i].x = pos;
  //     pos = pos + books[i].width + 2;
  //     console.log(books[i]);
  //     window[books[i].title] = books[i];
  //     window.books = books;
  //     shelf.appendChild(books[i].html);
  //     // click on particular book then mouseover to turn only that book
  //     books[i].html.addEventListener('click',toggleBrowse);
  //     // books[i].html.addEventListener('touchstart',toggleBrowse);
  //   }
  // }

  // function toggleBrowse(e){
  //   targetBookDiv = e.currentTarget;
  //   targetBookObject = findBookObject(targetBookDiv.classList[1]);
  //
  //   if(targetBookObject.clicked){
  //     shelf.removeEventListener('mousemove',browse);
  //     targetBookObject.clicked = false;
  //   } else {
  //     shelf.addEventListener('mousemove',browse);
  //     targetBookObject.clicked = true;
  //   }
  // }

  // function browse(_e){
  //   // let newAngle = _e.movementX/4 + targetBookObject.angle;
  //   let newAngle = Math.asin(_e.movementX/targetBookObject.depth)*(180/Math.PI) + targetBookObject.angle;
  //   if(newAngle > maxAngle){newAngle = maxAngle;}
  //   if(newAngle < -maxAngle){newAngle = -maxAngle;}
  //   targetBookObject.updateTransformation({rY:newAngle});
  //   pushBooks(targetBookObject, _e.movementX);
  // }

  function findBookObject(title) {
    for (var i = 0; i < books.length; i++) {
      if (books[i].title === title) {
        return books[i];
      }
    }
  }

  // function updateAngles(bookObj,movementX){
  //   let direction = movementX > 0 ? 'pos' : 'neg';
  //   // direction === 'pos' ? updateForwardAngels() : updateBackwardAngles();
  //   for (let i = bookObj.i; i<books.length ; i++) {
  //     // going forward
  //
  //     books[i].updateTransformation({rY:bookObj.angle});
  //     pushBooks(books[i], books[i+1]);
  //   }
  // }

  //   function pushBooks(bookObj, movementX){
  //     let book1 = bookObj;
  //     let book2 = null;
  //     let book1Points = getBookCoords(bookObj);
  //     let axies, gap = false;
  //     let book2Points = null;
  //     let deltaX = 0;
  //
  //     if(bookObj.angle > 0 && movementX > 0){
  //       for( let i = bookObj.i+1; i < books.length ; i++){
  //         book2 = books[i];
  //         book2Points = getBookCoords(book2);
  //         axies = [book1Points.p, book1Points.q, book2Points.p, book2Points.q];
  //         gap = minMaxOverlap(axies, book1Points, book2Points);
  //
  //         if(gap){
  //           console.log("!!!!!GAP between", book1.title, "and", book2.title);
  //           console.log((`\n ${i}`));
  //           break;
  //         } else {
  //           console.log("overlapping", book1.title, "and", book2.title);
  //           book2.angle = book1.angle;
  //           book2.updateTransformation({rY: book2.angle});
  //           if(book1.title === bookObj.title){
  //             deltaX = book1.transforms.tX;
  //           }
  //           deltaX = book2.width/(Math.cos(ToRad*(book2.angle)))-book2.width*Math.cos(ToRad*book2.angle) + deltaX + 2;
  //
  //           book2.updateTransformation({tX: deltaX});
  //           // console.log('book1Points',book1Points);
  //           // console.log('book2Points',book2Points);
  //
  //           // update book 2 transfornation based on
  //           // book2.angle = book1.angle;
  //
  //           }
  //           gap = false;
  //           book1 = book2;
  //           book1Points = book2Points;
  //         }
  //
  //     }
  //     if(bookObj.angle < 0 && movementX < 0){
  //       for( let i = bookObj.i-1; i >= 0 ; i--){
  //         console.log("try???");
  //         book2 = books[i];
  //         book2Points = getBookCoords(book2);
  //         axies = [book1Points.p, book1Points.q, book2Points.p, book2Points.q];
  //         gap = minMaxOverlap(axies, book1Points, book2Points);
  //
  //         if(gap){
  //           console.log("GAP between", book1.title, "and", book2.title);
  //           break;
  //         } else {
  //           console.log("overlapping", book1.title, "and", book2.title);
  //           book2.angle = book1.angle;
  //           book2.updateTransformation({rY: book2.angle});
  //           if(book1.title === bookObj.title){
  //             deltaX = book1.transforms.tX;
  //           }
  //           deltaX = book2.width/(Math.cos(ToRad*(book2.angle)))-book2.width*Math.cos(ToRad*book2.angle) + deltaX + 2;
  //
  //           book2.updateTransformation({tX: -deltaX});
  //           // console.log('book1Points',book1Points);
  //           // console.log('book2Points',book2Points);
  //
  //           // update book 2 transfornation based on
  //           // book2.angle = book1.angle;
  //
  //           }
  //           gap = false;
  //           book1 = book2;
  //           book1Points = book2Points;
  //       }
  //
  //   }
  // }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vector = __webpack_require__(2);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Book = function () {
  function Book(bookObj, position) {
    _classCallCheck(this, Book);

    this.book = bookObj;
    this.title = this.shortcode();
    this.position = position;
    // this.clicked = false;
    this.angle = 0;
    this.transforms = { rX: 0, rY: 0, rZ: 0, tX: 0, tY: 0, tZ: 0 };

    this.width = 40 * this.book.width;
    this.height = 40 * this.book.height;
    this.depth = 40 * this.book.depth;
    // this.diagonal = Math.sqrt(Math.pow(this.width,2)+Math.pow(this.depth,2));
    // this.phi=Math.asin(this.width/this.diagonal);//is in radians

    this.html = this.createHtmlObject();
  }

  // top view
  // 0,0 -----------> x
  //    |  A _____ B
  //    |   |     |  d
  //    |   |     |  e
  //    |   |width|  p
  //    |   |<--->|  t
  //    |   |     |  h
  //    y  C|_____|D

  _createClass(Book, [{
    key: 'shortcode',
    value: function shortcode() {
      // - todo later - make shortcode util that will ensure uniqeness
      // - or have a hardcoded unique ID
      var title = this.book.title;
      title = title.replace(/the|of|and|in|to|on|by/gi, '');
      title = title.match(/\b\w/gi).join("");
      return title;
    }
  }, {
    key: 'updateTransformation',
    value: function updateTransformation(transforms) {
      this.transforms = Object.assign({}, this.transforms, transforms);
      this.angle = this.transforms.rY;
      var side = this.angle < 0 ? 'left' : 'right';
      this.updateOrigin(side);

      this.html.style.transform = '\n    translateX(' + this.transforms.tX + 'px)\n    translateZ(' + this.transforms.tZ + ')\n    rotateY(' + this.transforms.rY + 'deg)\n    ';
    }
  }, {
    key: 'updateOrigin',
    value: function updateOrigin(side) {
      if (side === 'left' || side === 'right') {
        this.html.style['transform-origin'] = side;
      }
    }
  }, {
    key: 'createHtmlObject',
    value: function createHtmlObject() {
      var bookWrapper = this.createWrapper();
      // let container = this.createContainer(bookWrapper);
      var box = this.createBox(bookWrapper);

      return bookWrapper;
    }
  }, {
    key: 'createWrapper',
    value: function createWrapper() {
      var bookWrapper = document.createElement('div');
      bookWrapper.classList.add('book', this.title);
      bookWrapper.appendChild(this.genStyle());
      return bookWrapper;
    }
  }, {
    key: 'createBox',
    value: function createBox(bookWrapper) {
      var box = document.createElement('div');
      box = this.addSides(box);
      box.classList.add('box', this.title + '-box');
      bookWrapper.appendChild(box);
      return box;
    }
  }, {
    key: 'addSides',
    value: function addSides(box) {
      var sides = { 'right': null, 'left': null, 'front': null, 'back': null, 'top': null, 'bottom': null };
      for (var side in sides) {
        sides[side] = document.createElement('figure');
        sides[side].classList.add(this.title + '-side', side, 'side');
        box.appendChild(sides[side]);
      }
      return box;
    }
  }, {
    key: 'genStyle',
    value: function genStyle() {
      var depth = this.depth,
          width = this.width,
          height = this.height,
          title = this.title;

      var style = document.createElement('style');
      style.scoped = 'scoped';
      style.type = "text/css";
      style.innerHTML = '\n      .' + /*book*/title + ' {\n        width: ' + width + 'px;\n        height: ' + height + 'px;\n        transform-origin: center center ' + 0 + 'px;\n      }\n\n      .' + title + '-box .front {\n        width: ' + width + 'px;\n        height: ' + height + 'px;\n      }\n\n      .' + title + '-box .back {\n        width: ' + width + 'px;\n        height: ' + (height - 5) + 'px;\n      }\n\n      .' + title + '-box .front {\n        background-image: url(' + this.book.spine + ');\n        background-position: center;\n        background-repeat: no-repeat;\n        background-size: cover;\n      }\n\n      .' + title + '-box .right,\n      .' + title + '-box .left {\n        width: ' + depth + 'px;\n        height: ' + height + 'px;\n      }\n\n      .' + title + '-box .right {\n        background-image: url(' + this.book.cover + ');\n        background-position: center;\n        background-repeat: no-repeat;\n        background-size: cover;\n      }\n\n      .' + title + '-box .left {\n        background-image: url(' + this.book.back + ');\n        background-position: center;\n        background-repeat: no-repeat;\n        background-size: cover;\n      }\n\n      .' + title + '-box .top,\n      .' + title + '-box .bottom {\n        width: ' + width + 'px;\n        height: ' + depth + 'px;\n      }\n\n      .' + title + '-box .front  {\n        transform: rotateY( 0deg )\n        translateZ( ' + depth + 'px );\n      }\n      .' + title + '-box .back   {\n        transform:\n          rotateX( 180deg )\n          translateZ( ' + (0 - 5) + 'px );\n      }\n      .' + title + '-box .right  {\n        transform:\n          rotateY(  90deg )\n          translateZ( ' + width / 2 + 'px )\n          translateX(' + -depth / 2 + 'px);\n      }\n      .' + title + '-box .left   {\n        transform:\n          rotateY( -90deg )\n          translateZ( ' + width / 2 + 'px )\n          translateX(' + depth / 2 + 'px);\n      }\n      .' + title + '-box .top    {\n        transform:\n          rotateX(  90deg )\n          translateZ( ' + (height / 2 - 5) + 'px )\n          translateY(' + depth / 2 + 'px);\n      }\n      .' + title + '-box .bottom {\n        transform:\n          rotateX( -90deg )\n          translateZ( ' + (height / 2 - 5) + 'px )\n          translateY(' + -depth / 2 + 'px);\n      }\n      ';
      return style;
    }
  }]);

  return Book;
}();

exports.default = Book;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
    this.length = this.magnitude(x, y);
    console.log(this);
  }

  _createClass(Vector, [{
    key: "magnitude",
    value: function magnitude() {
      var sum = 0;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      for (var i = 0; i < args.length; i++) {
        sum = sum + Math.pow(args[i], 2);
      }
      return Math.sqrt(sum);
    }
  }, {
    key: "projectionX",
    value: function projectionX(theta) {
      return this.length * Math.cos(theta);
    }
  }, {
    key: "projectionY",
    value: function projectionY(theta) {
      return this.length * Math.sin(theta);
    }
  }, {
    key: "convertToRadians",
    value: function convertToRadians(theta) {
      return theta * Math.PI / 180;
    }
  }]);

  return Vector;
}();
//for testing


window.Vector = Vector;

exports.default = Vector;
/*
if I have distance to hinge point & angle can calculate rest of points
B is hinge -> have distance to that
angle > 0
Ax = Bvector - width*cos(theta)
Ay = width*sin(theta)

Cx = B vector - diagonal*cos(theta)
Cy = diagonal*sin(theta)

Dx = Bvector + depth*cos(theta)
Dy = depth * sin(theta)

if angle < 0
A is hinge -> have distance to that
Bx = Avector + width*cos(theta)
By = width*sin(theta)

Cx = Avector - depth*cos(theta)
Cy = depth*sin(theta)

Dx = Avector + diagonal*cos(theta)
DY = diagonal * sin(theta)

diagonal = sqrt(depth^2+width^2)

convert to new coordinate system
B is hinge

axisBX = x asis off by theta - origin samw
axisBY same story


*/

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
____
^    /   /|
h   /___/ |
i   |   | |    h
e   |   | |   t
g   |   | |  p
h   |   | / e
t   |___|/ d
    width

*/

var Books = [{
  author: "Rowling, JK",
  title: "Harry Potter and The Sorcerers Stone",
  spine: "./images/hp1_spine.jpeg",
  cover: "./images/hp1_cover.jpeg",
  back: "./images/hp1_cover.jpeg",
  height: 9,
  depth: 7,
  width: 1.5,
  stars: "&#9733;&#9733;&#9733;&#9733;&#9734;",
  review: "The book that started the sensation. I partially learned to read with this book, but I find it does not stand up to repeated rereads as time goes on."
}, {
  author: "Tolkein, JRR",
  title: "Hobbit, The",
  spine: "./images/th_spine.jpeg",
  cover: "./images/th_cover.jpg",
  back: "./images/th_cover.jpg",
  height: 9,
  depth: 7,
  width: 1,
  stars: "&#9733;&#9733;&#9733;&#9733;&#9734;",
  review: "A childhood favorite. I love the adventure, but truly I fell in love with the shire and Hobbits."
}, {
  author: "Rowling, JK ",
  title: "Harry Potter and The Chamber of Secrets",
  spine: "./images/hp2_spine.jpeg",
  cover: "./images/hp2_cover.jpeg",
  back: "./images/hp2_cover.jpeg",
  height: 9,
  depth: 7,
  width: 1.5,
  stars: "&#9733;&#9733;&#9734;&#9734;&#9734;",
  review: "My least favorite Harry Potter Book. I absoloutely can not stand Lockhart"
}, {
  author: "Angelou, Maya",
  title: "I Know Why the Caged Bird Sings",
  spine: "./images/IKWtCBS_spine.jpeg",
  cover: "./images/IKWtCBS.jpg",
  back: "./images/IKWtCBS.jpg",
  height: 6,
  depth: 6,
  width: 0.5,
  stars: "&#9733;&#9733;&#9733;&#9733;&#9734;",
  review: "Powerful and intimate. This book is not written for me, and I felt that, but it made it feel more poignant"
},
// {
//   author: "Virginia Wolf",
//   title: "A Room of One's Own",
//   spine: "./images/ARoOO_spine.png",
//   cover: "./images/ARoOO_cover.png",
//   back: "./images/ARoOO_cover.png",
// w: 9,
// depth: 7,
// width: 1
// },
{
  author: "Bradbury, Ray",
  title: "Fahrenheit 451",
  spine: "./images/Fahrenheit451_spine.jpeg",
  cover: "./images/Fahrenheit451_cover.jpg",
  back: "./images/Fahrenheit451_cover.jpg",
  height: 9,
  depth: 5.5,
  width: 0.5,
  stars: "&#9733;&#9733;&#9733;&#9734;&#9734;",
  review: "An interesting book to read in interesting times. The book itself is quite symbolic, but I also felt the symbolisim it aspires to is not necessarily the symbolisim interpreted."
}, {
  author: "Douglas, Fredrick",
  title: "Narrative of the Life of Fredrick Douglas, The",
  spine: "./images/TNotLoFD_spine.jpeg",
  cover: "./images/TNotLoFD_cover.jpg",
  back: "./images/TNotLoFD_cover.jpg",
  height: 9,
  depth: 6,
  width: 0.5,
  stars: "&#9733;&#9733;&#9733;&#9733;&#9734;",
  review: "An important book to read to understand the sheer scope and magnitude of how slavery shaped American History."
}, {
  author: "Kahneman, Daniel",
  title: "Thinking Fast and Slow",
  spine: "./images/TFaS_spine.jpeg",
  cover: "./images/TFaS_cover.jpeg",
  back: "./images/TFaS_cover.jpeg",
  height: 9,
  depth: 7,
  width: 0.7,
  stars: "&#9733;&#9733;&#9733;&#9733;&#9734;",
  review: "The often sited book that explores why and how the brain uses heuristics to lower the cost of decision making, and the ways that can go awry"
}];

exports.default = Books;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map