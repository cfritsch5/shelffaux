import Book from './book';
import Books from './books';

document.addEventListener("DOMContentLoaded", function(event) {
  var canvas = document.getElementById('shelf');
  var books = addBooks();

    function addBooks(){
      let cover, spine, book = {};
      var _books = [];
      for(let i = 0 ; i < Books.length; i++) {
        cover = new Image();
        cover.src = Books[i].cover;
        spine = new Image();
        spine.src = Books[i].spine;
        // books[i] = books[i] || {cover: "", spine: ""};
        // book = new Book(cover, spine, 0, 0, Books[i].author, Books[i].title, Books[i].depth, Books[i].review);
        book = new Book(cover, spine, 0, 0,
          Books[i].author, Books[i].title,
          Books[i].review, Books[i].stars);
        _books.push(book);
      }
      return _books;
    }

    function browse(e){
      const x = e.clientX;
      const y = e.clientY;
    }


    function setButtonDisabled(btnClass){
      // console.log("disable", btnClass);
      let btn = document.getElementById(btnClass);
      btn.className = "disabled";
      btn.disabled = true;
    }

    function enableButton(btnClass){
      // console.log("endable",btnClass);
      let btn = document.getElementById(btnClass);
      btn.className = "enabled";
      btn.disabled = false;
    }
});
