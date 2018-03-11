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
  var shelf = document.getElementById('shelf');
  var books = addBooks();
  shelvebooks();

  function addBooks() {
    var cover = void 0,
        back = void 0,
        spine = void 0,
        book = {};
    var _books = [];
    for (var i = 0; i < _books3.default.length; i++) {
      book = new _book2.default(_books3.default[i]);
      _books.push(book);
    }
    return _books;
  }

  function shelvebooks() {
    for (var i = 0; i < books.length; i++) {
      shelf.appendChild(books[i].html);
      var rect = books[i].x = books[i].html.getBoundingClientRect().x;
      // console.log(rect);
      // click on particular book then mouseover to turn only that book
      books[i].html.addEventListener('click', toggleBrowse);

      // simple mouseover shelf turn all books as they are moused over
      // books[i].html.addEventListener('mousemove',browse,false);

      // still working on this one, but click on book and drag to turn it
      // books[i].html.ondragstart = dragStart;
      // books[i].html.ondrag = browse;

      // double click to move forward
      books[i].html.addEventListener('dblclick', doubleClickForward);
    }
  }

  function doubleClickForward(e) {
    console.log('dblclick');
    var elem = e.currentTarget;
    elem.style['transition-timing-function'] = 'ease-in-out';
    elem.style['transition-duration'] = '1s';
    // let b = elem.style.transform = 'translateZ(250px)';
    // elem.style.transform = 'translateZ(250px) rotateY(90deg)';
    // going to need something to manage the animation - possibly use css animations
    // to translate - then rotate --> could use time out but seems like better practice to
    // use animations
    // setTimeout(function(){
    elem.style.transform = 'translateZ(250px)';
    // },1000);
    setTimeout(function () {
      elem.style.transform = 'translateZ(250px) translateX(150px) rotateY(-90deg)';
      // elem.style['transition-duration'] = '2s';
    }, 900);
    // currently rotate from browse and translate from here overwrite eachother
    // may have to later do some sort of adding of transformations
    // console.log(b);
    elem.style['pointer-events'] = 'none';
    document.addEventListener('click', function clickOncetoPutBack() {
      // put back on click
      elem.style.transform = 'translateX(0px) rotateY(0deg)translateZ(250px)';
      setTimeout(function () {
        elem.style.transform = 'translateZ(0px)';
        // elem.style['transition-duration'] = '2s';
        elem.style['pointer-events'] = 'inherit';
        setTimeout(function () {
          elem.style['transition-duration'] = '0s';
        }, 900);
      }, 900);
      document.removeEventListener('click', clickOncetoPutBack);
    });
  }

  function toggleBrowse(e) {
    var title = e.currentTarget.classList[1];
    var obj = findBookObject(title);

    if (obj.clicked) {
      obj.html.removeEventListener('mousemove', browse, false);
      obj.clicked = false;
    } else {
      obj.html.addEventListener('mousemove', browse, false);
      obj.clicked = true;
    }
  }

  function dragStart(e) {
    var blank = new Image();
    e.dataTransfer.setDragImage(blank, 0, 0);
    var title = e.currentTarget.classList[1];
    var obj = findBookObject(title);
    browse(e);
  }

  function findBookObject(title) {
    for (var i = 0; i < books.length; i++) {
      if (books[i].title === title) {
        return books[i];
      }
    }
  }

  function browse(e) {
    var title = e.currentTarget.classList[1];
    var bookObj = findBookObject(title);
    // console.log(Math.asin(e.movementX/100), e.movementX, bookObj.angle);
    bookObj.angle = e.movementX / 2 + bookObj.angle;
    e.currentTarget.style.transform = 'rotateY(' + bookObj.angle + 'deg)';
    updateAngles(bookObj, e.movementX);
  }

  function updateAngles(bookObj, movementX) {
    console.log(movementX);
    var self = bookObj.x;
    if (movementX > 0) {
      for (var i = 0; i < books.length; i++) {
        // console.log(books[i].x);
        if (books[i].x > bookObj.x && books[i].angle < books[i - 1].angle) {
          console.log('angle', books[i].angle);
          books[i].angle = books[i - 1].angle;
          // books[i].html.style.border ='3px solid blue';
          books[i].html.style.transform = 'rotateY(' + bookObj.angle + 'deg)';
        }
      }
    } else {
      // movement < 0
      for (var _i = 0; _i < books.length; _i++) {
        // console.log(books[i].x);
        if (books[_i].x < bookObj.x && books[_i].angle > books[_i + 1].angle) {
          console.log('angle', books[_i].angle);
          books[_i].angle = books[_i + 1].angle;
          // books[i].html.style.border ='3px solid blue';
          books[_i].html.style.transform = 'rotateY(' + bookObj.angle + 'deg)';
        }
      }
    }
    // for(let i = 0; i < books.length; i++){
    //   books[i].angle = bookObj.angle;
    //   books[i].html.style.transform = `rotateY(${bookObj.angle}deg)`;
    // }
  }

  // function setButtonDisabled(btnClass){
  //   let btn = document.getElementById(btnClass);
  //   btn.className = "disabled";
  //   btn.disabled = true;
  // }
  //
  // function enableButton(btnClass){
  //   let btn = document.getElementById(btnClass);
  //   btn.className = "enabled";
  //   btn.disabled = false;
  // }

  // document.addEventListener('keydown', function(e) {
  //   shelf.classList.toggle('no-clicky');
  //   console.log('keydown');
  // });
  //
  // shelf.addEventListener('mousemove', cust, false);
  //
  // function cust(e){
  //   for(let i = 0; i < books.length ; i++){
  //     // books[i].html.style
  //     // rotate books that need to be rotated by comparing bounding box
  //     // with client x
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Book = function () {
  function Book(bookObj) {
    _classCallCheck(this, Book);

    this.book = bookObj;
    this.shortcode();
    this.clicked = false;
    this.html = this.createHtmlObject();
    this.angle = 0;
    this.x = 0;
  }

  _createClass(Book, [{
    key: 'shortcode',
    value: function shortcode() {
      // - todo later - make shortcode util that will ensure uniqeness
      var title = this.book.title;
      title = title.replace(/the|of|and|in|to|on|by/gi, '');
      title = title.match(/\b\w/gi).join("");
      this.title = title;
    }

    /*
    <div class="book HPPS" style="transition: 0s ease-in-out; transform: rotateY(-10deg);">
      <style type="text/css" scoped="">{...}</style>
      <div class="container HPPS-container">
        <div class="box HPPS-box">
          <figure class="side front"></figure>
          {...}
          <figure class="side back"></figure>
        </div>
      </div>
    </div>
    */

  }, {
    key: 'createHtmlObject',
    value: function createHtmlObject() {

      var style = this.genStyle();
      var bookWrapper = document.createElement('div');
      var container = document.createElement('div');
      var box = document.createElement('div');
      var cover = document.createElement('figure');
      var back = document.createElement('figure');
      var spine = document.createElement('figure');
      var top = document.createElement('figure');
      var bottom = document.createElement('figure');

      bookWrapper.classList.add('book', this.title);
      container.classList.add('container', this.title + 'container');
      box.classList.add('box', this.title + '-box');
      cover.classList.add('right', 'side');
      back.classList.add('left', 'side');
      spine.classList.add('front', 'side');
      top.classList.add('top', 'side');
      bottom.classList.add('bottom', 'side');

      box.appendChild(top);
      box.appendChild(back);
      box.appendChild(cover);
      box.appendChild(spine);
      box.appendChild(bottom);
      container.appendChild(box);
      bookWrapper.appendChild(style);
      bookWrapper.appendChild(container);

      bookWrapper.draggable = true;
      return bookWrapper;
    }
  }, {
    key: 'genStyle',
    value: function genStyle() {
      var width = 50;
      var height = 300;
      var depth = 200;
      var title = this.title;
      var style = document.createElement('style');
      style.scoped = 'scoped';
      style.type = "text/css";
      style.innerHTML = '\n      .' + /*book*/title + ' {\n        width: ' + width + 'px;\n        height: ' + height + 'px;\n        transform-origin: center center ' + 0 + 'px;\n      }\n\n      .' + title + '-container {\n        width: ' + width + 'px;\n        height: ' + height + 'px;\n      }\n\n      .' + title + '-box .front {\n        width: ' + width + 'px;\n        height: ' + height + 'px;\n      }\n\n      .' + title + '-box .back {\n        width: ' + width + 'px;\n        height: ' + (height - 5) + 'px;\n      }\n\n      .' + title + '-box .front {\n        background-image: url(' + this.book.spine + ');\n        background-position: center;\n        background-repeat: no-repeat;\n        background-size: cover;\n      }\n\n      .' + title + '-box .right,\n      .' + title + '-box .left {\n        width: ' + depth + 'px;\n        height: ' + height + 'px;\n      }\n\n      .' + title + '-box .right {\n        background-image: url(' + this.book.cover + ');\n        background-position: center;\n        background-repeat: no-repeat;\n        background-size: cover;\n      }\n\n      .' + title + '-box .left {\n        background-image: url(' + this.book.back + ');\n        background-position: center;\n        background-repeat: no-repeat;\n        background-size: cover;\n      }\n\n      .' + title + '-box .top,\n      .' + title + '-box .bottom {\n        width: ' + width + 'px;\n        height: ' + depth + 'px;\n      }\n\n      .' + title + '-box .front  {\n        transform: rotateY( 0deg )\n        translateZ( ' + depth + 'px );\n      }\n      .' + title + '-box .back   {\n        transform:\n          rotateX( 180deg )\n          translateZ( ' + (0 - 5) + 'px );\n      }\n      .' + title + '-box .right  {\n        transform:\n          rotateY(  90deg )\n          translateZ( ' + width / 2 + 'px )\n          translateX(' + -depth / 2 + 'px);\n      }\n      .' + title + '-box .left   {\n        transform:\n          rotateY( -90deg )\n          translateZ( ' + width / 2 + 'px )\n          translateX(' + depth / 2 + 'px);\n      }\n      .' + title + '-box .top    {\n        transform:\n          rotateX(  90deg )\n          translateZ( ' + (height / 2 - 5) + 'px )\n          translateY(' + depth / 2 + 'px);\n      }\n      .' + title + '-box .bottom {\n        transform:\n          rotateX( -90deg )\n          translateZ( ' + (height / 2 - 5) + 'px )\n          translateY(' + -depth / 2 + 'px);\n      }\n      ';
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