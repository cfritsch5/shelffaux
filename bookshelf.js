import Book from './book';
import Books from './books';

document.addEventListener("DOMContentLoaded", function(event) {
  var canvas = document.getElementById('shelf');
  var ctx = canvas.getContext('2d');
  var books = addBooks();

    function draw(x, y) {
      x -= canvas.getBoundingClientRect().left;
      ctx.clearRect(x-100, 0, x+100, canvas.height);

      let book, position = 50;
      for(let i = 0 ; i < books.length; i++ ) {
        // books[i] = books[i] || {cover: "", spine: ""};
        // book = new Book(books[i].cover, books[i].spine, position, position + 50);
        books[i].leftBorder = position;
        books[i].rightBorder = position + 50;
        book = books[i];
        book.draw(ctx, x, y);
        position += 50;
      }
    }

    function addBooks(){
      let cover, spine, book = {};
      var _books = [];
      for(let i = 0 ; i < Books.length; i++) {
        cover = new Image();
        cover.src = Books[i].cover;
        spine = new Image();
        spine.src = Books[i].spine;
        // books[i] = books[i] || {cover: "", spine: ""};
        book = new Book(cover, spine, 0, 0, Books[i].author, Books[i].title, Books[i].depth);
        _books.push(book);
      }
      return _books;
    }

    function browse(e){
      const x = e.clientX;
      const y = e.clientY;
      draw(x,y);
    }
    function titlebubble(){
      bubbleBooks("title");
    }
    function authorbubble(){
      bubbleBooks("author");
    }

    document.getElementById("title-sort").onclick = titlebubble;
    document.getElementById("author-sort").onclick = authorbubble;

    canvas.addEventListener('mousemove',browse,false);
    const start = setInterval(()=>(draw(0,0)),10);
    setTimeout(()=>clearInterval(start),1000);

    const bubbleBooks = function (prop){
      document.createElement("h1").innerHTML = "SoRting";
      const go = setInterval( ()=>{
        let callCompar;
        let sorted = false;
        let temp = {};

        if(typeof prop === "string"){
          //set comparator callback
          callCompar = (i,j) => (Books[i][prop].localeCompare(Books[j][prop]) > 0);
          // console.log("str cal comp", callCompar(0,1));
        } else {
          callCompar = (i,j) => (Books[i][prop] > (Books[j][prop]));
        }

        for(let i = 0, j = i + 1; i < Books.length - 1 ; i++, j++){

          if(callCompar(i,j)){

            temp = books[i];
            books[i] = books[j];
            books[j] = temp;
            temp = Books[i];
            Books[i] = Books[j];
            Books[j] = temp;
            ctx.clearRect(0,0,canvas.width, canvas.height);
            draw(0,0);
            break;
          }

          if(j === Books.length - 1){
            sorted = true;
          }
        }
        if(sorted === true){
          clearInterval(go);
        }
      },1000);
    };
});
