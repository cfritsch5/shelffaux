import Book from './book';
import Books from './books';

document.addEventListener("DOMContentLoaded", function(event) {
  var shelf = document.getElementById('shelf');
  var books = addBooks();
  var targetBookDiv = null;
  var targetBookObject = null;

    function addBooks(){
      var _books = [];
      for(let i = 0 ; i < Books.length; i++) {
        let book = null;
        book = new Book(Books[i], i);
        _books.push(book);
        shelf.appendChild(book.html);
        book.html.addEventListener('mousemove',onMove);
      }
      return _books;
    }

    function onMove(e){
      targetBookDiv = e.currentTarget;
      targetBookObject = findBookObject(targetBookDiv.classList[1]);
      // let direction = e.movementX >= 0 ? 1 : -1;
      // let i = targetBookObject.position;
      // let flag = true;
      // while(flag && Math.abs(i) < Books.length){
      //   turnBook(Books[i], 60*direction);
      //   i += direction;
      //   if(direction > 0){
      //     flag = i < Books.length;
      //   } else {
      //     flag = i >= 0;
      //   }
      //   console.log(i, flag);
      // }
      for(let i = 0; i < Books.length; i++){
        let direction = i <= targetBookObject.position ? -1 : 1;
        // turnBook(Books[i], 60*direction);
        books[i].updateTransformation({rY:45*direction});
      }
    }

    function turnBook(book, newAngle){
      console.log(book.title, newAngle);
      for(let i = book.angle; i < newAngle; i++){
        book.updateTransformation({rY:i});
      }
    }

    // function shelvebooks(){
    //   let pos = 0;
    //   for(let i = 0; i < books.length ; i++){
    //     books[i].i = i;
    //     books[i].x = pos;
    //     pos = pos + books[i].width + 2;
    //     console.log(books[i]);
    //     window[books[i].title] = books[i];
    //     window.books = books;
    //     shelf.appendChild(books[i].html);
    //     // click on particular book then mouseover to turn only that book
    //     books[i].html.addEventListener('click',toggleBrowse);
    //     // books[i].html.addEventListener('touchstart',toggleBrowse);
    //   }
    // }

    // function toggleBrowse(e){
    //   targetBookDiv = e.currentTarget;
    //   targetBookObject = findBookObject(targetBookDiv.classList[1]);
    //
    //   if(targetBookObject.clicked){
    //     shelf.removeEventListener('mousemove',browse);
    //     targetBookObject.clicked = false;
    //   } else {
    //     shelf.addEventListener('mousemove',browse);
    //     targetBookObject.clicked = true;
    //   }
    // }

    // function browse(_e){
    //   // let newAngle = _e.movementX/4 + targetBookObject.angle;
    //   let newAngle = Math.asin(_e.movementX/targetBookObject.depth)*(180/Math.PI) + targetBookObject.angle;
    //   if(newAngle > maxAngle){newAngle = maxAngle;}
    //   if(newAngle < -maxAngle){newAngle = -maxAngle;}
    //   targetBookObject.updateTransformation({rY:newAngle});
    //   pushBooks(targetBookObject, _e.movementX);
    // }

    function findBookObject(title){
      for(let i = 0; i < books.length; i++){
        if(books[i].title === title){
          return books[i];
        }
      }
    }

    // function updateAngles(bookObj,movementX){
    //   let direction = movementX > 0 ? 'pos' : 'neg';
    //   // direction === 'pos' ? updateForwardAngels() : updateBackwardAngles();
    //   for (let i = bookObj.i; i<books.length ; i++) {
    //     // going forward
    //
    //     books[i].updateTransformation({rY:bookObj.angle});
    //     pushBooks(books[i], books[i+1]);
    //   }
    // }

  //   function pushBooks(bookObj, movementX){
  //     let book1 = bookObj;
  //     let book2 = null;
  //     let book1Points = getBookCoords(bookObj);
  //     let axies, gap = false;
  //     let book2Points = null;
  //     let deltaX = 0;
  //
  //     if(bookObj.angle > 0 && movementX > 0){
  //       for( let i = bookObj.i+1; i < books.length ; i++){
  //         book2 = books[i];
  //         book2Points = getBookCoords(book2);
  //         axies = [book1Points.p, book1Points.q, book2Points.p, book2Points.q];
  //         gap = minMaxOverlap(axies, book1Points, book2Points);
  //
  //         if(gap){
  //           console.log("!!!!!GAP between", book1.title, "and", book2.title);
  //           console.log((`\n ${i}`));
  //           break;
  //         } else {
  //           console.log("overlapping", book1.title, "and", book2.title);
  //           book2.angle = book1.angle;
  //           book2.updateTransformation({rY: book2.angle});
  //           if(book1.title === bookObj.title){
  //             deltaX = book1.transforms.tX;
  //           }
  //           deltaX = book2.width/(Math.cos(ToRad*(book2.angle)))-book2.width*Math.cos(ToRad*book2.angle) + deltaX + 2;
  //
  //           book2.updateTransformation({tX: deltaX});
  //           // console.log('book1Points',book1Points);
  //           // console.log('book2Points',book2Points);
  //
  //           // update book 2 transfornation based on
  //           // book2.angle = book1.angle;
  //
  //           }
  //           gap = false;
  //           book1 = book2;
  //           book1Points = book2Points;
  //         }
  //
  //     }
  //     if(bookObj.angle < 0 && movementX < 0){
  //       for( let i = bookObj.i-1; i >= 0 ; i--){
  //         console.log("try???");
  //         book2 = books[i];
  //         book2Points = getBookCoords(book2);
  //         axies = [book1Points.p, book1Points.q, book2Points.p, book2Points.q];
  //         gap = minMaxOverlap(axies, book1Points, book2Points);
  //
  //         if(gap){
  //           console.log("GAP between", book1.title, "and", book2.title);
  //           break;
  //         } else {
  //           console.log("overlapping", book1.title, "and", book2.title);
  //           book2.angle = book1.angle;
  //           book2.updateTransformation({rY: book2.angle});
  //           if(book1.title === bookObj.title){
  //             deltaX = book1.transforms.tX;
  //           }
  //           deltaX = book2.width/(Math.cos(ToRad*(book2.angle)))-book2.width*Math.cos(ToRad*book2.angle) + deltaX + 2;
  //
  //           book2.updateTransformation({tX: -deltaX});
  //           // console.log('book1Points',book1Points);
  //           // console.log('book2Points',book2Points);
  //
  //           // update book 2 transfornation based on
  //           // book2.angle = book1.angle;
  //
  //           }
  //           gap = false;
  //           book1 = book2;
  //           book1Points = book2Points;
  //       }
  //
  //   }
  // }

});
