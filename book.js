class Book {
  constructor(leftBorder, rightBorder, topSpace, width, height){

    this.leftBorder = leftBorder;
    this.rightBorder = rightBorder;
    this.mid = (leftBorder + rightBorder)/2;
    this.topSpace = topSpace || 10;
    this.width = width || 50;
    this.height = height || 325;

    this.draw = this.draw.bind(this);
    this.drawCover = this.drawCover.bind(this);
    this.drawSpine = this.drawSpine.bind(this);
  }

  drawCover(ctx, A, B, C, D){
    ctx.fillStyle = 'rgba(50, 100, 200, 0.5)';
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.lineTo(C.x, C.y);
    ctx.lineTo(D.x, D.y);
    ctx.fill();
  }

  drawSpine(ctx, xstart, ystart, plusxWide, plusyTall){
    ctx.fillStyle = 'rgba(0, 50, 200, 1)';
    ctx.fillRect(xstart, ystart, plusxWide, plusyTall);
    ctx.strokeStyle="rgba(0,0,0,1)";
    ctx.strokeRect(xstart, ystart, plusxWide, plusyTall);
  }

  draw(ctx, x, y){
    let {leftBorder, rightBorder, topSpace, width, height, mid}= this;
    let xRel = x - leftBorder; //x relative to book left border
    let pointA, pointB, pointC, pointD;


    switch(true){

      case (x <= leftBorder):
        this.drawSpine(ctx,leftBorder, topSpace, width, height);
        break;

      case (x >= leftBorder && x <rightBorder):

        pointA = {x: rightBorder - xRel, y: topSpace}; //topleft
        pointB = {x: rightBorder - xRel, y: height + 10}; //bottom left
        pointC = {x: rightBorder, y: height - 25}; // bottom right
        pointD = {x: rightBorder, y: topSpace + 25}; // top right

        this.drawSpine(ctx, leftBorder-xRel, topSpace, width, height);
        this.drawCover(ctx, pointA, pointB, pointC, pointD);
        break;

      case (x >= rightBorder):

        pointA = {x: rightBorder - (50), y: topSpace}; //topleft
        pointB = {x: rightBorder - (50), y: height + 10}; //bottom left
        pointC = {x: rightBorder, y: height - 25}; // bottom right
        pointD = {x: rightBorder, y: topSpace + 25}; // top right

        this.drawCover(ctx, pointA, pointB, pointC, pointD);
        this.drawSpine(ctx,leftBorder-(50), topSpace, 50, 325);
        break;

      default:
    }
  }

}

export default Book;
// module.exports = Book;
