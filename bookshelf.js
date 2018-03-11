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
        books[i].html.addEventListener('click',toggleBrowse);
        // books[i].html.addEventListener('mousemove',browse,false);
        // books[i].html.ondragstart = dragStart;
        // books[i].html.ondrag = browse;
      }
    }

    function toggleBrowse(e){
        let title = e.currentTarget.classList[1];
        let obj = findBookObject(title);
        
      if(obj.clicked){
        obj.html.removeEventListener('mousemove',browse,false);
        obj.clicked = false;
      } else {
        obj.html.addEventListener('mousemove',browse,false);
        obj.clicked = true;
      }
    }

    //
    // function dragStart(e){
    //   // e.preventDefault();
    //   let blank  = new Image;
    //   e.dataTransfer.setDragImage(blank,0,0);
    //   let title = e.currentTarget.classList[1];
    //   let obj = findBookObject(title);
    //   // console.log(obj);
    //   // console.log(e);
    // }

    function findBookObject(title){
      for(let i = 0; i < books.length; i++){
        if(books[i].title == title){
          return books[i];
        }
      }
    }

    function browse(e){
      console.log('browse',e.clientX);
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
