import Book from './book';
import Books from './books';

document.addEventListener("DOMContentLoaded", function(event) {
  var shelf = document.getElementById('shelf');
  var books = addBooks();
  var targetBookDiv = null;
  var targetBookObject = null;
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
        // books[i].html.addEventListener('touchstart',toggleBrowse);

        // simple mouseover shelf turn all books as they are moused over
        // works but interferes w/ regular togglebrowse
        // books[i].html.addEventListener('mousemove',toggleBrowseShelf,false);

        // still working on this one, but click on book and drag to turn it
        // books[i].html.ondragstart = dragStart;
        // books[i].html.ondrag = browse;

        // double click to move forward
          books[i].html.addEventListener('dblclick',doubleClickForward);
      }
    }

    function toggleBrowseShelf(e){
      // current issue is that if the event listener for this is on I want it
      // to be deselected / turned off when turning by individually selected book
      // w/ toggle browse

      targetBookDiv = e.currentTarget;
      let title = targetBookDiv.classList[1];
      targetBookObject = findBookObject(title);
      let move = e.movementX > 0 ? e.movementX : e.movementX * -1;
      let newAngle = (targetBookObject.angle - e.movementX/2);
      if(newAngle >= 0){targetBookDiv.style['transform-origin'] = 'right';}
      if(newAngle < 0){targetBookDiv.style['transform-origin'] = 'left';}
      if(newAngle > 45){newAngle = 45;}
      if(newAngle < -45){newAngle = -45;}
      targetBookObject.angle = newAngle;
      targetBookDiv.style.transform = `rotateY(${targetBookObject.angle}deg)`;
      updateAngles(targetBookObject,e.movementX);
    }


    function toggleBrowse(e){
      targetBookDiv = e.currentTarget;
      let title = targetBookDiv.classList[1];
      targetBookObject = findBookObject(title);

      if(targetBookObject.clicked){
        shelf.removeEventListener('mousemove',browse,false);
        // targetBookObject.html.addEventListener('mousemove',toggleBrowseShelf,false);

        targetBookObject.clicked = false;
      } else {
        shelf.addEventListener('mousemove',browse,false);
        // targetBookObject.html.removeEventListener('mousemove',toggleBrowseShelf,false);

        targetBookObject.clicked = true;
      }

    }

    function browse(_e){

      let newAngle = _e.movementX/2 + targetBookObject.angle;
      if(newAngle >= 0){targetBookDiv.style['transform-origin'] = 'right';}
      if(newAngle < 0){targetBookDiv.style['transform-origin'] = 'left';}
      if(newAngle > 45){newAngle = 45;}
      if(newAngle < -45){newAngle = -45;}
      targetBookObject.angle = newAngle;
      targetBookDiv.style.transform = `rotateY(${targetBookObject.angle}deg)`;
      // console.log(targetBookDiv,_e.movementX);
      updateAngles(targetBookObject,_e.movementX);
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

    function updateAngles(bookObj, movementX){
      let width = bookObj.width;
      // let width = 50;
      let budgeUp = 0;
      // let testIdea = (width/Math.cos((bookObj.angle*3.14)/180)-width) + budgeUp;

      function updatePosition(booksi){
        if(booksi.angle >= 0){booksi.html.style['transform-origin'] = 'right';}
        if(booksi.angle < 0){booksi.html.style['transform-origin'] = 'left';}
        budgeUp = (width/Math.cos((booksi.angle*3.14)/180)-width) + budgeUp;
        booksi.transX = budgeUp;
      }

      if(movementX > 0){
        for(let i = 0 ; i < books.length; i++){
          // console.log(books[i].title, (width/Math.cos((books[i].angle*3.14)/180)-width), books[i].transX, bookObj.transX);
          if(books[i].x > bookObj.x && books[i].angle < books[i-1].angle){
            books[i].angle = books[i-1].angle;
            updatePosition(books[i]);
            books[i].html.style.transform = `translateX(${budgeUp}px) rotateY(${bookObj.angle}deg)`;
          }
        }
      } else {
        // movement < 0
        for(let i = books.length-1 ; i >= 0; i--){
          if(books[i].x < bookObj.x && books[i].angle > books[i+1].angle){
            books[i].angle = books[i+1].angle;
            updatePosition(books[i]);
            books[i].html.style.transform = `translateX(-${budgeUp}px) rotateY(${bookObj.angle}deg)`;
          }
        }
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
