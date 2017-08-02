// const Book = require('./book.js');
import Book from './book';

document.addEventListener("DOMContentLoaded", function(event) {

    function draw(x, y) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
          for(let i = 1 ; i <= 10 ; i++){
            let book = new Book(100+(i*50), 150+(i*50));
            book.draw(ctx, x, y);
          }
    }

    function browse(e){
      var x = e.clientX;
      var y = e.clientY;
      var coor = "Coordinates: (" + x + "," + y + ")";
      document.getElementById("demo").innerHTML = coor;
      draw(x,y);
    }

    var canvas = document.getElementById('shelf');
    var ctx = canvas.getContext('2d');
    canvas.addEventListener('mousemove',browse,false);
    draw(0,0);
});
