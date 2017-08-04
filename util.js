//callback functions on how to sort
//plus actual sorting algorithms
const bubbleBooks = function (books, prop){
  document.createElement("h1").innerHTML = "SoRting";
  console.log(books);
  prop = "title";
  const start = setInterval( ()=>{
    console.log("interval");
    // console.log(books);
    // console.log(books[0], books[1]);
    let callCompar;
    let sorted = false;
    let temp = {};

    if(typeof prop === "string"){
      //set comparator callback
      callCompar = (i,j) => (books[i][prop].localeCompare(books[j][prop]) > 0);
      // console.log("str cal comp", callCompar(0,1));
    } else {
      callCompar = (i,j) => (books[i][prop] > (books[j][prop]));
      console.log("wtf");
    }

    for(let i = 0, j = i + 1; i < books.length - 1 ; i++, j++){

      // console.log(callCompar(i,j));
      if(callCompar(i,j)){
        console.log(books[i].title, books[j].title);

        temp = books[i];
        books[i] = books[j];
        books[j] = temp;
        // console.log(i, j);
        // console.log(books);
        break;
      }

      if(j === books.length - 1){
        console.log(sorted);
        sorted = true;
      }
    }
    if(sorted === true){
      console.log("clear interval");
      console.log(books);
      clearInterval(start);
    }
  },1000);
};

export default bubbleBooks;
