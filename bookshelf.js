// import book from './book';

document.addEventListener("DOMContentLoaded", function(event) {
    //code
    // var canvas = document.getElementById('shelf');
    // var ctx = canvas.getContext('2d');
    function draw(x, y) {
        var canvas = document.getElementById('shelf');
        var ctx = canvas.getContext('2d');

        // ctx.fillStyle = 'rgb(200, 40, 0)';
        // ctx.fillRect(0, 0, 50, 50);

        ctx.fillStyle = 'rgba(0, 50, 200, 1)';
        ctx.fillRect(50+x, 50, 50, 325);

        ctx.fillStyle = 'rgba(0, 50, 150, 1)';
        ctx.beginPath();
        ctx.moveTo(200+x, 70);
        ctx.lineTo(200+x, 300);
        ctx.lineTo(100+x, 375);
        ctx.lineTo(100+x, 50);
        ctx.fill();
        //
        // ctx.fillStyle = 'rgba(0, 200, 50, 1)';
        // ctx.fillRect(150, 50, 50, 325);
        // ctx.fillStyle = 'rgba(0, 150, 50, 1)';
        // ctx.beginPath();
        // ctx.moveTo(300, 70);
        // ctx.lineTo(300, 300);
        // ctx.lineTo(200, 375);
        // ctx.lineTo(200, 50);
        // ctx.fill();

    }
    draw(0,0);
});
