import Vector from './vector';

class Book {
  constructor(bookObj){
    this.book = bookObj;
    this.title = this.shortcode();
    this.clicked = false;
    this.angle = 0;
    this.transforms = {rX: 0, rY: 0, rZ: 0, tX: 0, tY: 0, tZ: 0};

    this.width = 40*this.book.width;
    this.height = 40*this.book.height;
    this.depth = 40*this.book.depth;
    this.diagonal = Math.sqrt(Math.pow(this.width,2)+Math.pow(this.depth,2));
    this.phi=Math.asin(this.width/this.diagonal);//is in radians

    this.html = this.createHtmlObject();

    // this.vector = new Vector(1,2);
    // this.x = 0;
    // this.y = this.depth/2;
  }

    // top view
    // 0,0 -----------> x
    //    |  A _____ B
    //    |   |     |  d
    //    |   |     |  e
    //    |   |width|  p
    //    |   |<--->|  t
    //    |   |     |  h
    //    y  C|_____|D

  shortcode(){
  // - todo later - make shortcode util that will ensure uniqeness
  // - or have a hardcoded unique ID
  let title = this.book.title;
  title = title.replace(/the|of|and|in|to|on|by/gi, '');
  title = title.match(/\b\w/gi).join("");
  return title;
}

/*
<div class="book HPPS" style="transition: 0s ease-in-out; transform: rotateY(-10deg);">
  <style type="text/css" scoped="">{...}</style>
  <div class="container HPPS-container">
    <div class="box HPPS-box">
      <figure class="side front"></figure>
      {...}
      <figure class="side back"></figure>
    </div>
  </div>
</div>
*/

  updateTransformation(transforms){
    this.transforms = Object.assign({},this.transforms, transforms);
    // console.log(this.title, this.transforms, transforms);
    this.angle = this.transforms.rY;
    // this.transforms.tX = this.transforms.tX + transforms.tX;
    //transforms = {rX:50, rY:0}
    let side = this.angle < 0 ? 'left' : 'right';
    this.updateOrigin(side);

    this.html.style.transform = `
    translateX(${this.transforms.tX}px)
    translateZ(${this.transforms.tZ})
    rotateY(${this.transforms.rY}deg)
    `;
  }

  updateOrigin(side){
    if (side === 'left' || side === 'right'){
      this.html.style['transform-origin'] = side;
    }
  }

  createHtmlObject(){
    let sides = {'right':null, 'left':null, 'front':null, 'back':null, 'top':null, 'bottom':null};
    let bookWrapper = document.createElement('div');
    let container = document.createElement('div');
    let box = document.createElement('div');

    for(let side in sides){
        sides[side] = document.createElement('figure');
        sides[side].classList.add(`${this.title}-side`, side,'side');
        box.appendChild(sides[side]);
    }

    bookWrapper.classList.add('book', this.title);
    container.classList.add('container', `${this.title}container`);
    box.classList.add('box', `${this.title}-box`);

    container.appendChild(box);
    bookWrapper.appendChild(this.genStyle());
    bookWrapper.appendChild(container);

    bookWrapper.draggable = true;
    return bookWrapper;
  }

  genStyle(){
    let depth = this.depth;
    let width = this.width;
    let height = this.height;
    let title = this.title;
    let style = document.createElement('style');
    style.scoped = 'scoped';
    style.type = "text/css";
    style.innerHTML =  `
      .${/*book*/ title} {
        width: ${width}px;
        height: ${height}px;
        transform-origin: center center ${0}px;
      }

      .${title}-container {
        width: ${width}px;
        height: ${height}px;
      }

      .${title}-box .front {
        width: ${width}px;
        height: ${height}px;
      }

      .${title}-box .back {
        width: ${width}px;
        height: ${height - 5}px;
      }

      .${title}-box .front {
        background-image: url(${this.book.spine});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .${title}-box .right,
      .${title}-box .left {
        width: ${depth}px;
        height: ${height}px;
      }

      .${title}-box .right {
        background-image: url(${this.book.cover});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .${title}-box .left {
        background-image: url(${this.book.back});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .${title}-box .top,
      .${title}-box .bottom {
        width: ${width}px;
        height: ${depth}px;
      }

      .${title}-box .front  {
        transform: rotateY( 0deg )
        translateZ( ${depth}px );
      }
      .${title}-box .back   {
        transform:
          rotateX( 180deg )
          translateZ( ${0 - 5}px );
      }
      .${title}-box .right  {
        transform:
          rotateY(  90deg )
          translateZ( ${width/2}px )
          translateX(${-depth/2}px);
      }
      .${title}-box .left   {
        transform:
          rotateY( -90deg )
          translateZ( ${width/2}px )
          translateX(${depth/2}px);
      }
      .${title}-box .top    {
        transform:
          rotateX(  90deg )
          translateZ( ${height/2 - 5}px )
          translateY(${depth/2}px);
      }
      .${title}-box .bottom {
        transform:
          rotateX( -90deg )
          translateZ( ${height/2 - 5}px )
          translateY(${-depth/2}px);
      }
      `;
      return style;
  }
}


export default Book;
