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

var _books2 = __webpack_require__(2);

var _books3 = _interopRequireDefault(_books2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function (event) {
  var canvas = document.getElementById('shelf');
  var ctx = canvas.getContext('2d');
  var books = addBooks();

  function draw(x, y) {
    x -= canvas.getBoundingClientRect().left;
    ctx.clearRect(x - 100, 0, x + 100, canvas.height);

    var book = void 0,
        position = 50;
    for (var i = 0; i < books.length; i++) {
      // books[i] = books[i] || {cover: "", spine: ""};
      // book = new Book(books[i].cover, books[i].spine, position, position + 50);
      books[i].leftBorder = position;
      position += 50;
      books[i].rightBorder = position;
      book = books[i];
      book.draw(ctx, x, y);
    }
  }

  function addBooks() {
    var cover = void 0,
        spine = void 0,
        book = {};
    var _books = [];
    for (var i = 0; i < _books3.default.length; i++) {
      cover = new Image();
      cover.src = _books3.default[i].cover;
      spine = new Image();
      spine.src = _books3.default[i].spine;
      // books[i] = books[i] || {cover: "", spine: ""};
      book = new _book2.default(cover, spine, 0, 0, _books3.default[i].author, _books3.default[i].title, _books3.default[i].depth);
      _books.push(book);
    }
    return _books;
  }

  function browse(e) {
    var x = e.clientX;
    var y = e.clientY;
    draw(x, y);
  }
  function titlebubble() {
    bubbleBooks("title");
    setButtonDisabled("title-sort");
    setButtonDisabled("author-sort");
  }
  function authorbubble() {
    bubbleBooks("author");
    setButtonDisabled("author-sort");
    setButtonDisabled("title-sort");
  }

  document.getElementById("title-sort").onclick = titlebubble;
  document.getElementById("author-sort").onclick = authorbubble;

  function setButtonDisabled(btnClass) {
    console.log("disable", btnClass);
    var btn = document.getElementById(btnClass);
    btn.className = "disabled";
    btn.disabled = true;
  }

  function enableButton(btnClass) {
    console.log("endable", btnClass);
    var btn = document.getElementById(btnClass);
    btn.className = "enabled";
    btn.disabled = false;
  }

  canvas.addEventListener('mousemove', browse, false);
  var start = setInterval(function () {
    return draw(0, 0);
  }, 100);
  setTimeout(function () {
    return clearInterval(start);
  }, 3000);

  var bubbleBooks = function bubbleBooks(prop) {
    console.log("sorting");
    document.createElement("h1").innerHTML = "SoRting";
    var go = setInterval(function () {
      var callCompar = void 0;
      var sorted = false;
      var temp = {};

      if (typeof prop === "string") {
        //set comparator callback
        callCompar = function callCompar(i, j) {
          return _books3.default[i][prop].localeCompare(_books3.default[j][prop]) > 0;
        };
        // console.log("str cal comp", callCompar(0,1));
      } else {
        callCompar = function callCompar(i, j) {
          return _books3.default[i][prop] > _books3.default[j][prop];
        };
      }

      for (var i = 0, j = i + 1; i < _books3.default.length - 1; i++, j++) {

        if (callCompar(i, j)) {

          temp = books[i];
          books[i] = books[j];
          books[j] = temp;
          temp = _books3.default[i];
          _books3.default[i] = _books3.default[j];
          _books3.default[j] = temp;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          draw(0, 0);
          break;
        }

        if (j === _books3.default.length - 1) {
          sorted = true;
        }
      }
      if (sorted === true) {
        clearInterval(go);
        if (prop == "author") {
          enableButton("title-sort");
        } else {
          enableButton("author-sort");
        }
      }
    }, 1000);
  };
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Book = function () {
  function Book(CoverImage, SpineImage, leftBorder, rightBorder, author, title) {
    _classCallCheck(this, Book);

    this.CoverImage = CoverImage;
    this.SpineImage = SpineImage;
    this.leftBorder = leftBorder;
    this.rightBorder = rightBorder;
    this.author = author;
    this.title = title;
    this.topSpace = 10;

    this.draw = this.draw.bind(this);
    this.drawCover = this.drawCover.bind(this);
    this.drawSpine = this.drawSpine.bind(this);
  }

  _createClass(Book, [{
    key: "drawCover",
    value: function drawCover(ctx, A) {
      var img = this.CoverImage;
      var sx = 0,
          sy = 0; //start cliping from (sx,sy) relative to image
      var swidth = 10,
          sheight = img.height; //width and height of clipped Image
      var x = A.x,
          y = A.y; // coordinates where to start drawing Image
      var width = 2,
          height = 325; //display width & height aka stretch or reduce image

      var coverWidth = this.rightBorder - A.x;
      var sample = Math.floor(img.width / coverWidth);
      swidth = sample;

      var deltaY = 25 / coverWidth;
      for (var i = 0; i < coverWidth; i++) {
        sx += sample;
        y += deltaY;
        height -= deltaY * 2;
        ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
        x += 1;
      }
    }
  }, {
    key: "drawSpine",
    value: function drawSpine(ctx, xstart, ystart, plusxWide, plusyTall) {
      var img = this.SpineImage;
      ctx.drawImage(img, xstart, ystart, 50, 325);
    }
  }, {
    key: "draw",
    value: function draw(ctx, x, y) {
      var leftBorder = this.leftBorder,
          rightBorder = this.rightBorder,
          topSpace = this.topSpace,
          width = this.width,
          height = this.height,
          mid = this.mid;

      var xRel = x - leftBorder; //x relative to book left border
      var pointA = void 0,
          pointB = void 0,
          pointC = void 0,
          pointD = void 0;

      switch (true) {

        case x <= leftBorder:
          this.drawSpine(ctx, leftBorder, topSpace, width, height);
          break;

        case x >= leftBorder && x < rightBorder:

          pointA = { x: rightBorder - xRel, y: topSpace }; //topleft


          this.drawSpine(ctx, leftBorder - xRel, topSpace, width, height);
          this.drawCover(ctx, pointA);
          break;

        case x >= rightBorder:

          pointA = { x: rightBorder - 50, y: topSpace }; //topleft

          this.drawCover(ctx, pointA);
          this.drawSpine(ctx, leftBorder - 50, topSpace, 50, 325);
          break;

        default:
      }
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
var Books = [{
  author: "Rowling, JK",
  title: "Harry Potter and The Sorcerers Stone",
  spine: "./images/hp1_spine.jpeg",
  cover: "./images/hp1_cover.jpeg",
  width: 9,
  height: 7,
  depth: 1.5
}, {
  author: "Tolkein, JRR",
  title: "Hobbit, The",
  spine: "./images/th_spine.jpeg",
  cover: "./images/th_cover.jpg",
  width: 9,
  height: 7,
  depth: 1
}, {
  author: "Rowling, JK ",
  title: "Harry Potter and The Chamber of Secrets",
  spine: "./images/hp2_spine.jpeg",
  cover: "./images/hp2_cover.jpeg",
  width: 9,
  height: 7,
  depth: 1.5
}, {
  author: "Angelou, Maya",
  title: "I Know Why the Caged Bird Sings",
  spine: "./images/IKWtCBS_spine.jpeg",
  cover: "./images/IKWtCBS.jpg",
  width: 6,
  height: 6,
  depth: 0.5
},
// {
//   author: "Virginia Wolf",
//   title: "A Room of One's Own",
//   spine: "./images/ARoOO_spine.png",
//   cover: "./images/ARoOO_cover.png",
// width: 9,
// height: 7,
// depth: 1
// },
{
  author: "Bradbury, Ray",
  title: "Fahrenheit 451",
  spine: "./images/Fahrenheit451_spine.jpeg",
  cover: "./images/Fahrenheit451_cover.jpg",
  width: 9,
  height: 5.5,
  depth: 0.5
}, {
  author: "Douglas, Fredrick",
  title: "Narrative of the Life of Fredrick Douglas, The",
  spine: "./images/TNotLoFD_spine.jpeg",
  cover: "./images/TNotLoFD_cover.jpg",
  width: 9,
  height: 6,
  depth: 0.5
}, {
  author: "Kahneman, Daniel",
  title: "Thinking Fast and Slow",
  spine: "./images/TFaS_spine.jpeg",
  cover: "./images/TFaS_cover.jpeg",
  width: 9,
  height: 7,
  depth: 0.7
}];

exports.default = Books;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map