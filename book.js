class Book {
  constructor(bookObj){
    this.book = bookObj;
    this.shortcode();
    this.clicked = false;
    this.angle = 0;
    this.transX = 0;
    this.transZ = 0;
    this.width = 30;
    this.height = 300;
    this.depth = 200;
    this.html = this.createHtmlObject();
  }

  shortcode(){
  // - todo later - make shortcode util that will ensure uniqeness
  let title = this.book.title;
  title = title.replace(/the|of|and|in|to|on|by/gi, '');
  title = title.match(/\b\w/gi).join("");
  this.title = title;
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

  updateTransformation(transferArr){
    // [{form: 'translateX', value: '50px'}]
    let str = '';
    for(let i = 0; i < transferArr.length; i++){
      str = str + " " + transferArr[i].form + " " + transferArr[i].value;
    }
    this.html.style.transform = str;
  }

  createHtmlObject(){

    let style = this.genStyle();
    let bookWrapper = document.createElement('div');
    let container = document.createElement('div');
    let box = document.createElement('div');
    let cover = document.createElement('figure');
    let back = document.createElement('figure');
    let spine = document.createElement('figure');
    let top = document.createElement('figure');
    let bottom = document.createElement('figure');

    bookWrapper.classList.add('book', this.title);
    container.classList.add('container', `${this.title}container`);
    box.classList.add('box', `${this.title}-box`);
    cover.classList.add('right','side');
    back.classList.add('left','side');
    spine.classList.add('front','side');
    top.classList.add('top','side');
    bottom.classList.add('bottom','side');

    box.appendChild(top);
    box.appendChild(back);
    box.appendChild(cover);
    box.appendChild(spine);
    box.appendChild(bottom);
    container.appendChild(box);
    bookWrapper.appendChild(style);
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
