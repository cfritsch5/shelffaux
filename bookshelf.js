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
        // click on particular book then mouseover to turn only that book
        books[i].html.addEventListener('click',toggleBrowse);

        // simple mouseover shelf turn all books as they are moused over
        // books[i].html.addEventListener('mousemove',browse,false);

        // still working on this one, but click on book and drag to turn it
        // books[i].html.ondragstart = dragStart;
        // books[i].html.ondrag = browse;

        // double click to move forward
          books[i].html.addEventListener('dblclick',doubleClickForward);
      }
    }

    function doubleClickForward(e) {
      console.log('dblclick');
      let elem = e.currentTarget;
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
      setTimeout(function(){
        elem.style.transform = 'translateZ(250px) translateX(150px) rotateY(-90deg)';
        // elem.style['transition-duration'] = '2s';
      },900);
      // currently rotate from browse and translate from here overwrite eachother
      // may have to later do some sort of adding of transformations
      // console.log(b);
      document.addEventListener('click',function clickOncetoPutBack(){
        // put back on click
        elem.style.transform = 'translateX(0px) rotateY(0deg)translateZ(250px)';
        setTimeout(function(){
          elem.style.transform = 'translateZ(0px)';
          // elem.style['transition-duration'] = '2s';
        },900);
        document.removeEventListener('click',clickOncetoPutBack);
      });
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


    function dragStart(e){
      // e.preventDefault();
      let blank  = new Image;
      e.dataTransfer.setDragImage(blank,0,0);
      let title = e.currentTarget.classList[1];
      let obj = findBookObject(title);
      // console.log(obj);
      // console.log(e);
      browse(e);
    }

    function findBookObject(title){
      for(let i = 0; i < books.length; i++){
        if(books[i].title == title){
          return books[i];
        }
      }
    }

    function browse(e){
      // let last = e.currentTarget.style.transform;
      // let re = /\((.*?)\)/;
      // let m = last.match(re);
      // let int = 0;
      // if(m){
      //   int = parseInt(m[0].slice(1,m[0].length-4));
      //   int = e.movementX + int;
      // }
      let title = e.currentTarget.classList[1];
      let bookObj = findBookObject(title);
      console.log(Math.asin(e.movementX/100), e.movementX, bookObj.angle);
      bookObj.angle = e.movementX/2 + bookObj.angle;
      e.currentTarget.style.transform = `rotateY(${bookObj.angle}deg)`;
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
