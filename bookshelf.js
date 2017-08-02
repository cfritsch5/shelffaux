// const Book = require('./book.js');
import Book from './book';
document.addEventListener("DOMContentLoaded", function(event) {
    //code
    var canvas = document.getElementById('shelf');
    var ctx = canvas.getContext('2d');

    function draw(x, y) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
          for(let i = 1 ; i <= 3 ; i++){
            let book = new Book(100+(i*50), 150+(i*50));
            book.draw(ctx, x, y);

          }
    }
    draw(0,0);

    // on mouse move redraw books relative to mouse position???
    canvas.addEventListener('mousemove',browse,false);

    function browse(e){
      var x = e.clientX;
      var y = e.clientY;
      var coor = "Coordinates: (" + x + "," + y + ")";
      document.getElementById("demo").innerHTML = coor;
      draw(x,y);
    }

});
