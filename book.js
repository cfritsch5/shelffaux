class Book {
  constructor(lb,rb){

    this.lb = lb;
    this.rb = rb;
    this.draw = this.draw.bind(this);
  }

  draw(ctx, x, y){

    let {lb, rb}= this;
    let mid = (lb + rb)/2;
    console.log(lb, rb);

    switch(true){
      // case (x < lb):
      // console.log("A2");
      // // console.log(this.lb, this.rb);
      // ctx.fillStyle = 'rgba(0, 50, 200, 1)';
      // ctx.fillRect(100+(50), 10, 50, 325);
      // // ctx.fillRect(left position, top position, width, height);
      // ctx.fillStyle = 'rgba(0, 50, 200, 0.5)';
      // ctx.beginPath();
      // ctx.moveTo(lb + (50), 10);
      // ctx.lineTo(lb + (50), 335);
      // ctx.lineTo(lb, 300);
      // ctx.lineTo(lb, 35);
      // ctx.fill();
      // break;

      case (x <= lb):
      console.log("A");
      // console.log(this.lb, this.rb);
      ctx.fillStyle = 'rgba(0, 50, 200, 1)';
      ctx.fillRect(lb, 10, 50, 325);
      // ctx.fillRect(left position, top position, width, height);
      break;
      case (x >= lb && x <rb):
      console.log("B", rb+50);
      ctx.fillStyle = 'rgba(0, 50, 200, 1)';
      ctx.fillRect(lb-(x-lb), 10, 50, 325);
      ctx.fillStyle = 'rgba(0, 50, 200, 0.5)';

      ctx.beginPath();
      ctx.moveTo(rb - (x-lb), 10);
      ctx.lineTo(rb - (x-lb), 335);
      ctx.lineTo(rb, 300);
      ctx.lineTo(rb, 35);
      ctx.fill();
      // ctx.fillRect(left position, top position, width, height);
      break;
      case (x >= rb):
      console.log("C", rb+50);
      // console.log(this.lb, this.rb);
      ctx.fillStyle = 'rgba(0, 50, 200, 1)';
      ctx.fillRect(lb-(50), 10, 50, 325);
      // ctx.fillRect(left position, top position, width, height);
      ctx.fillStyle = 'rgba(0, 50, 200, 0.5)';
      ctx.beginPath();
      ctx.moveTo(rb - (50), 10);
      ctx.lineTo(rb - (50), 335);
      ctx.lineTo(rb, 300);
      ctx.lineTo(rb, 35);
      ctx.fill();
      break;

      default:
    }
  }

}

export default Book;
// module.exports = Book;
