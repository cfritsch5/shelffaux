class Book {
  constructor(CoverImage, SpineImage, leftBorder, rightBorder, topSpace, width, height, author, title){
    this.CoverImage = CoverImage;
    this.SpineImage = SpineImage;
    this.leftBorder = leftBorder;
    // this.rightBorder = leftBorder + height ;
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
    let img = this.CoverImage;
    let sx = 0, sy = 0; //start cliping from (sx,sy) relative to image
    let swidth = 10, sheight = img.height; //width and height of clipped Image
    let x = A.x, y = A.y; // coordinates where to start drawing Image
    let width = 2, height = 325; //display width & height aka stretch or reduce image

    let coverWidth = this.rightBorder - A.x;
    let sample = Math.floor(img.width / coverWidth);
    swidth = sample;
    let deltaY = (25/coverWidth);
    for ( let i = 0 ; i < coverWidth; i++){
      sx += sample;
      y += deltaY;
      height -= deltaY * 2;
      ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
      x += 1;
    }
  }

  drawSpine(ctx, xstart, ystart, plusxWide, plusyTall){
    let img = this.SpineImage;
    ctx.drawImage(img, xstart, ystart, 50, 325);
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


        this.drawSpine(ctx, leftBorder-xRel, topSpace, width, height);
        this.drawCover(ctx, pointA, pointB, pointC, pointD);
        break;

      case (x >= rightBorder):

        pointA = {x: rightBorder - (50), y: topSpace}; //topleft

        this.drawCover(ctx, pointA, pointB, pointC, pointD);
        this.drawSpine(ctx,leftBorder-(50), topSpace, 50, 325);
        break;

      default:
    }
  }

}

export default Book;
