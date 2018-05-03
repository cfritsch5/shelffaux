import Book from './book';
import Books from './books';

document.addEventListener("DOMContentLoaded", function(event) {
  var shelf = document.getElementById('shelf');
  var books = addBooks();
  var targetBookDiv = null;
  var targetBookObject = null;
  shelvebooks();
  const ToRad = 3.14/180;

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
      let pos = 100;
      for(let i = 0; i < books.length ; i++){
        books[i].x = pos;
        shelf.appendChild(books[i].html);
        // books[i].html.style.left = `${pos}px`;
        // books[i].updateTransformation({tX:pos});
        pos = pos + books[i].width;

        // click on particular book then mouseover to turn only that book
        books[i].html.addEventListener('click',toggleBrowse);
        // books[i].html.addEventListener('touchstart',toggleBrowse);

        // simple mouseover shelf turn all books as they are moused over
        // works but interferes w/ regular togglebrowse
        // books[i].html.addEventListener('mousemove',toggleBrowseShelf,false);

        // still working on this one, but click on book and drag to turn it
        // books[i].html.ondragstart = dragStart;
        // books[i].html.ondrag = browse;

      }
    }

    // function toggleBrowseShelf(e){
    //   // current issue is that if the event listener for this is on I want it
    //   // to be deselected / turned off when turning by individually selected book
    //   // w/ toggle browse
    //   targetBookDiv = e.currentTarget;
    //   let title = targetBookDiv.classList[1];
    //   targetBookObject = findBookObject(title);
    //   let move = e.movementX > 0 ? e.movementX : e.movementX * -1;
    //   let newAngle = (targetBookObject.angle - e.movementX/2);
    //   if(newAngle >= 0){targetBookDiv.style['transform-origin'] = 'right';}
    //   if(newAngle < 0){targetBookDiv.style['transform-origin'] = 'left';}
    //   if(newAngle > 45){newAngle = 45;}
    //   if(newAngle < -45){newAngle = -45;}
    //   targetBookObject.angle = newAngle;
    //   targetBookDiv.style.transform = `rotateY(${targetBookObject.angle}deg)`;
    //   updateAngles(targetBookObject,e.movementX);
    // }


    function toggleBrowse(e){
      targetBookDiv = e.currentTarget;
      targetBookObject = findBookObject(targetBookDiv.classList[1]);

      if(targetBookObject.clicked){
        shelf.removeEventListener('mousemove',browse);
        targetBookObject.clicked = false;
      } else {
        shelf.addEventListener('mousemove',browse);
        targetBookObject.clicked = true;
      }
    }

    function browse(_e){

      let newAngle = _e.movementX/4 + targetBookObject.angle;
      if(newAngle > 90){newAngle = 90;}
      if(newAngle < -90){newAngle = -90;}
      targetBookObject.updateTransformation({rY:newAngle});
      // updateAngles(targetBookObject,_e.movementX);
    }

    function findBookObject(title){
      for(let i = 0; i < books.length; i++){
        if(books[i].title === title){
          return books[i];
        }
      }
    }

    function SAT(bookObj,movementX){

    }


    // function updateAngles(bookObj, movementX){
    //   let width = bookObj.width;
    //   let budgeUp = 0;
    //   let newAngle, newXPos;
    //
    //   function budge(i,next){
    //     budgeUp = (width/Math.cos(books[next].angle*ToRad)-width) + budgeUp;
    //     budgeUp = budgeUp > books[i].transforms.tX ? budgeUp : books[i].transforms.tX;
    //   }
    //
    //   if(movementX > 0){
    //     for(let i = 0 ; i < books.length; i++){
    //       newAngle = 0;
    //       newXPos = 0;
    //       if(books[i].x > bookObj.x){
    //         budge(i,i-1);
    //         newXPos = books[i-1]  ? budgeUp : books[i].transforms.tX;
    //         newAngle = books[i].angle < books[i-1].angle ? books[i-1].angle : books[i].angle;
    //         books[i].updateTransformation({tX: newXPos, rY: newAngle});
    //       }
    //     }
    //   } else {
    //     // movement < 0
    //     for(let i = books.length-1 ; i >= 0; i--){
    //       if(books[i].x < bookObj.x){
    //         if(books[i+1] ){
    //           budge(i,i+1);
    //           books[i].updateTransformation({tX: -budgeUp});
    //         }
    //         if(books[i].angle > books[i+1].angle){
    //           books[i].updateTransformation({rY: books[i+1].angle});
    //         }
    //       }
    //     }
    //   }
    // }


        // function dragStart(e){
        //   let blank  = new Image;
        //   e.dataTransfer.setDragImage(blank,0,0);
        //   let title = e.currentTarget.classList[1];
        //   let obj = findBookObject(title);
        //   browse(e);
        // }

    //
    // double click to move forward
    // add following line to shelvebooks to work
    // books[i].html.addEventListener('dblclick',doubleClickForward);

    // function doubleClickForward(e) {


    //   console.log('dblclick');
    //   let elem = e.currentTarget;
    //   elem.style['transition-timing-function'] = 'ease-in-out';
    //   elem.style['transition-duration'] = '1s';
    //   // let b = elem.style.transform = 'translateZ(250px)';
    //   // elem.style.transform = 'translateZ(250px) rotateY(90deg)';
    //   // going to need something to manage the animation - possibly use css animations
    //   // to translate - then rotate --> could use time out but seems like better practice to
    //   // use animations
    //   // setTimeout(function(){
    //   elem.style.transform = 'translateZ(250px)';
    //   // },1000);
    //   setTimeout(function(){
    //     elem.style.transform = 'translateZ(250px) translateX(150px) rotateY(-90deg)';
    //     // elem.style['transition-duration'] = '2s';
    //   },900);
    //   // currently rotate from browse and translate from here overwrite eachother
    //   // may have to later do some sort of adding of transformations
    //   // console.log(b);
    //   elem.style['pointer-events'] = 'none';
    //   document.addEventListener('click',function clickOncetoPutBack(){
    //     // put back on click
    //     elem.style.transform = 'translateX(0px) rotateY(0deg)translateZ(250px)';
    //     setTimeout(function(){
    //       elem.style.transform = 'translateZ(0px)';
    //       // elem.style['transition-duration'] = '2s';
    //       elem.style['pointer-events'] = 'inherit';
    //       setTimeout(function(){
    //         elem.style['transition-duration'] = '0s';
    //       },900);
    //     },900);
    //     document.removeEventListener('click',clickOncetoPutBack);
    //   });
    // }
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
});
