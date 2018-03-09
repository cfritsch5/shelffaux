import Book from './book';
import Books from './books';

document.addEventListener("DOMContentLoaded", function(event) {
  var shelf = document.getElementById('shelf');
  var books = addBooks();
  shelvebooks();

    function addBooks(){
      let cover, back, spine, book = {};
      var _books = [];
      for(let i = 0 ; i < Books.length; i++) {
        book = new Book(Books[i]);
        _books.push(book);
      }
      return _books;
    }

    function shelvebooks(){
      for(let i = 0; i < books.length ; i++){
        shelf.appendChild(books[i].html);
        books[i].html.addEventListener('mousemove',browse,false);
      }
    }

    function browse(e){
      let last = e.currentTarget.style.transform;
      let re = /\((.*?)\)/;
      let m = last.match(re);
      let int = 0;
      if(m){
        int = parseInt(m[0].slice(1,m[0].length-4));
        int = e.movementX + int;
      }
      e.currentTarget.style.transform = `rotateY(${int}deg)`;
    }

    function setButtonDisabled(btnClass){
      let btn = document.getElementById(btnClass);
      btn.className = "disabled";
      btn.disabled = true;
    }

    function enableButton(btnClass){
      let btn = document.getElementById(btnClass);
      btn.className = "enabled";
      btn.disabled = false;
    }

    document.addEventListener('keydown', function(e) {
      shelf.classList.toggle('no-clicky');
    });
});
