import Book from './book';
import Books from './books';
var Promise = require('es6-promise').Promise;

document.addEventListener("DOMContentLoaded", function(event) {
  var canvas = document.getElementById('shelf');
  var ctx = canvas.getContext('2d');
  var books = addBooks();

    function draw(x, y) {
      x -= canvas.getBoundingClientRect().left;
      ctx.clearRect(x-100, 0, x+100, canvas.height);

      let book, Rposition = 50;
      for(let i = 0 ; i < Books.length; i++ ) {
        books[i] = books[i] || {cover: "", spine: ""};
        book = new Book(books[i].cover, books[i].spine, Rposition, Rposition + 50);
        book.draw(ctx, x, y);
        Rposition += 50;
      }
    }

    function addBooks(){
      let cover, spine, book = {};
      var _books = [];
      // const addcover = ()=>(book['cover']=cover);
      // const addspine = ()=>(book['spine']=spine);
      for(let i = 0 ; i < Books.length; i++) {
        cover = new Image();
        cover.src = Books[i].cover;
        // console.log(Books[i]);
        // cover.onload = addcover;
        spine = new Image();
        spine.src = Books[i].spine;
        // spine.onload = addspine;
        _books.push({cover: cover, spine: spine});
      }
      return _books;
    }

    function browse(e){
      const x = e.clientX;
      const y = e.clientY;
      draw(x,y);
    }

    canvas.addEventListener('mousemove',browse,false);
    const start = setInterval(()=>(draw(0,0)),10);
    setTimeout(()=>clearInterval(start),1000);
});
