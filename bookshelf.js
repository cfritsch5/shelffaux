import Book from './book';
import Books from './books';

document.addEventListener("DOMContentLoaded", function(event) {
  var shelf = document.getElementById('shelf');
  var books = addBooks();
  var targetBookDiv = null;
  var targetBookObject = null;
  var inTopx = 40;
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
      let pos = 0;
      for(let i = 0; i < books.length ; i++){
        books[i].i = i;
        books[i].x = pos;
        pos = pos + books[i].width + 1;
        // console.log(books[i]);
        window[books[i].title] = books[i];
        window.books = books;
        shelf.appendChild(books[i].html);
        // click on particular book then mouseover to turn only that book
        books[i].html.addEventListener('click',toggleBrowse);
        // books[i].html.addEventListener('touchstart',toggleBrowse);
      }
    }

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
      // let newAngle = _e.movementX/4 + targetBookObject.angle;
      let newAngle = Math.asin(_e.movementX/targetBookObject.depth)*(180/Math.PI) + targetBookObject.angle;
      if(newAngle > 90){newAngle = 90;}
      if(newAngle < -90){newAngle = -90;}
      targetBookObject.updateTransformation({rY:newAngle});
      pushBooks(targetBookObject);
    }

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

    function pushBooks(bookObj){
      // console.log(bookObj);
      let book1 = bookObj;
      let book2 = null;
      let book1Points = getBookCoords(bookObj);
      let axies, gap = false;
      let book2Points = null;

      if(bookObj.angle > 0 ){
        for( let i = bookObj.i+1; i < books.length ; i++){
          book2 = books[i];
          book2Points = getBookCoords(book2);
          axies = [book1Points.p, book1Points.q, book2Points.p, book2Points.q];
          gap = minMaxOverlap(axies, book1Points, book2Points);

          if(gap){
            // console.log("GAP between", bookObj.title, "and", books[i].title);
          } else {
            console.log("overlapping", book1.title, "and", book2.title);
            // console.log('book1Points',book1Points);
            // console.log('book2Points',book2Points);

            // update book 2 transfornation based on
          }
          gap = false;
          book1 = book2;
          book1Points = book2Points;
        }

      // } else {
      //   for( let i = bookObj.i-1; i >= 0 ; i--){
      //     console.log("try???");
      //     book2 = getBookCoords(books[i]);
      //     axies = [book1.p, book1.q, book2.p, book2.q];
      //     gap = minMaxOverlap(axies, book1, book2);
      //
      //     if(gap){
      //       console.log("GAP between", books[i].title);
      //     } else {
      //       console.log("overlapping", books[i].title);
      //     }
      //     gap = false;
      //     book1 = book2;
      //   }

      }

    }

    function minMaxOverlap(axies, book1, book2){
      for(let j = 0; j < axies.length; j++){
        let b1 = transformIntoPsAndQs(axies[j], book1.points);
        let b2 = transformIntoPsAndQs(axies[j], book2.points);
        let min1 = Math.min(...b1);
        let max1 = Math.max(...b1);
        let min2 = Math.min(...b2);
        let max2 = Math.max(...b2);
        // console.log("minmax",min1,max1,min2,max2);
        if(min2 > max1 || min1 > max2){
          return true;
        }
      }
      return false;
    }

    function transformIntoPsAndQs(unitVec, points){
      // console.log(points, 'unitvec:',unitVec);
      let a = points.ax*unitVec.x + points.ay*unitVec.y;
      // let aq = points.ax*q.x + points.ay*q.y;
      let b = points.bx*unitVec.x + points.by*unitVec.y;
      // let bq = points.bx*q.x + points.by*q.y;
      let c = points.cx*unitVec.x + points.cy*unitVec.y;
      // let cq = points.cx*q.x + points.cy*q.y;
      let d = points.dx*unitVec.x + points.dy*unitVec.y;
      // let dq = points.dx*q.x + points.dy*q.y;
      // console.log("a,b,c,d",{a,b,c,d});
      return [a, b, c, d];
    }

    function getBookCoords(bookObj){
      let points = getPoints(bookObj);
      // console.log(bookObj.title, 'points', points);
      let {p,q} = getUnitVectors(bookObj);
      return {points, p, q};
    }

    function getUnitVectors(bookObj){
      let angle = inRadians(bookObj.angle), p = {}, q = {};

      p.x = bookObj.width*Math.sin(angle+Math.PI/2)/bookObj.width;
      p.y = bookObj.width*Math.cos(angle+Math.PI/2)/bookObj.width;
      q.x = bookObj.depth*Math.sin(angle)/bookObj.depth;
      q.y = bookObj.depth*Math.cos(angle)/bookObj.depth;
      // console.log(bookObj.title,p,q);
      return {p, q};
    }

    function getPoints(bookObj){
      let ax = 'noped',ay = 'noped',bx = 'noped',by = 'noped',cx = 'noped',cy = 'noped',dx = 'noped',dy = 'noped';
      let {phi, x, width, depth, diagonal, angle} = bookObj;

      angle = inRadians(angle);

      if(angle >= 0){
        bx = x + width;
        by = 0;
        ax = bx - width*Math.cos(angle);
        ay = width*Math.sin(angle);
        cx = bx + depth*Math.sin(angle);
        cy = depth*Math.cos(angle);
        dx = bx + diagonal*Math.sin(angle - phi);
        dy = Math.abs(diagonal*Math.cos(phi+angle));
      } else {
        ax = x;
        ay = 0;
        bx = x + width*Math.cos(angle);
        by = -width*Math.sin(angle);
        cx = x + diagonal*Math.sin(angle + phi);
        cy = diagonal*Math.cos(angle+phi);
        dx = -(x - depth*Math.sin(angle));
        dy = depth*Math.cos(angle);
      }

      return {ax,ay,bx,by,cx,cy,dx,dy};
    }

    function inRadians(theta){
      return theta*ToRad;
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
});
