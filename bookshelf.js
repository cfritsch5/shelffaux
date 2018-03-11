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
        let rect = books[i].x = books[i].html.getBoundingClientRect().x;
        // console.log(rect);
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
      elem.style['pointer-events'] = 'none';
      document.addEventListener('click',function clickOncetoPutBack(){
        // put back on click
        elem.style.transform = 'translateX(0px) rotateY(0deg)translateZ(250px)';
        setTimeout(function(){
          elem.style.transform = 'translateZ(0px)';
          // elem.style['transition-duration'] = '2s';
          elem.style['pointer-events'] = 'inherit';
          setTimeout(function(){
            elem.style['transition-duration'] = '0s';
          },900);
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
      let blank  = new Image;
      e.dataTransfer.setDragImage(blank,0,0);
      let title = e.currentTarget.classList[1];
      let obj = findBookObject(title);
      browse(e);
    }

    function findBookObject(title){
      for(let i = 0; i < books.length; i++){
        if(books[i].title === title){
          return books[i];
        }
      }
    }

    function browse(e){
      let title = e.currentTarget.classList[1];
      let bookObj = findBookObject(title);
      // console.log(Math.asin(e.movementX/100), e.movementX, bookObj.angle);
      bookObj.angle = e.movementX/2 + bookObj.angle;
      e.currentTarget.style.transform = `rotateY(${bookObj.angle}deg)`;
      updateAngles(bookObj,e.movementX);
    }

    function updateAngles(bookObj, movementX){
      console.log(movementX);
      let self = bookObj.x;
      if(movementX > 0){
        for(let i = 0 ; i < books.length; i++){
          // console.log(books[i].x);
          if(books[i].x > bookObj.x && books[i].angle < books[i-1].angle){
            console.log('angle',books[i].angle);
            books[i].angle = books[i-1].angle;
            // books[i].html.style.border ='3px solid blue';
            books[i].html.style.transform = `rotateY(${bookObj.angle}deg)`;
          }
        }
      } else {
        // movement < 0
        for(let i = 0 ; i < books.length; i++){
          // console.log(books[i].x);
          if(books[i].x < bookObj.x && books[i].angle > books[i+1].angle){
            console.log('angle',books[i].angle);
            books[i].angle = books[i+1].angle;
            // books[i].html.style.border ='3px solid blue';
            books[i].html.style.transform = `rotateY(${bookObj.angle}deg)`;
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
