  var arrayOfFonts = [
      "'Pacifico', cursive",
      "'Dancing Script', cursive",
      "'Indie Flower', cursive",
      "'Give You Glory', cursive",
      "'Shadows Into Light', cursive",
      "'Gloria Hallelujah', cursive",
      "'Nanum Pen Script', cursive",
      "'Satisfy', cursive",
      "'Nanum Brush Script', cursive",
      "'Sacramento', cursive",
      "'Caveat', cursive",
     ];
  
function setQuote(d){
  var q = document.querySelector("#quote");
  q.innerHTML = d.quote;
  
  var a = document.querySelector("#author");
  a.innerHTML = '- ' + d.author;
  
  setRandomView();
};

function getRandom() {

// random color
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  randomColor=color;
  console.log(randomColor);

  // random font
  var randomFontNumber = Math.floor(Math.random() *arrayOfFonts.length); // (Math.random() *2 gives number between 0 and 1,99999..., thus we multiply it by 2 so we get 1,9 nd then Math.floor
  console.log(randomFontNumber);
  randomFont= arrayOfFonts[randomFontNumber];
  }

  function setRandomView() {

  
  // changing colors & family fonts
  getRandom();
  // background color
    document.querySelector("body").style.backgroundColor=randomColor;

  // // font color of quote & author
    // document.querySelector("#quote").style.color=randomColor;
    // document.querySelector("#author").style.color=randomColor;

  // // color of button
    document.querySelector("#btnTweet").style.backgroundColor=randomColor;
    // document.querySelector("#btnFcb").style.backgroundColor=randomColor;
    // document.querySelector("#nextQuote").style.backgroundColor=randomColor;

  // color of borders container
    document.querySelector(".container").style.borderColor=randomColor;
    document.querySelector("body").style.display ='block';
  // color of buttons
    // document.querySelector("#btnFcb").style.borderColor=randomColor;
    document.querySelector("#btnTweet").style.borderColor=randomColor;
    document.querySelector("#nextQuote").style.borderColor=randomColor;


  // changing fonts
    document.querySelector("#quote").style.fontFamily = randomFont;
    document.querySelector("#author").style.fontFamily = randomFont;
    document.querySelector("#nextQuote").style.fontFamily = randomFont;
    document.querySelector("#impressum").style.fontFamily = randomFont;
    document.querySelector("#readMore").style.fontFamily = randomFont;
    
};


var randomColor;
var randomFont;
var lastRandomFund;
var QuoteAndAuthor;

// setQuote(data);

getQuoteFromServer();
document.getElementById("nextQuote").addEventListener("click", getQuoteFromServer);


function getQuoteFromServer() {
  console.log('called')
  $.ajax( {
    url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    success: function(arrayOfQuote) {
          console.log('success: ' + JSON.stringify(arrayOfQuote));
          newObject = {
           author: arrayOfQuote[0].title,
           quote: arrayOfQuote[0].content
         }
         setQuote(newObject);

         QuoteAndAuthor = newObject.quote.substring(3, newObject.quote.length - 6) + ' - ' + newObject.author;        
        outgoing();

    },
    
     error: function() {
      console.log('did not get data');
      alert("Sorry, the data cannot be triggered due to a server's issue. It's not my fault ;) Please try again later.")
    },

    cache: false
  });

}
// DRY dont repeat yourself

$("#newQuote").hover(
  function() {
  $(this).animate({ width:180, height:65}, 1000);
},
  function() {
  $(this).animate({ width:170, height:60}, 1000);
  },  
);

function outgoing(){
  
  // textToTweet = '"' + QuoteAndAuthor.replace(/'&#8217;'/g, "'") + '"';

  var urlTweet= 'https://twitter.com/home?status=' + $("#quote").text().trim() +  "%0D%0A" + $("#author").text().trim();

  console.log(urlTweet);
  window.open(urlTweet);
  
}

document.getElementById("btnTweet").addEventListener("click", outgoing); 


var addInfo = 'A project made as a part of the <a target="_blank" href="https://www.freecodecamp.org/challenges/build-a-random-quote-machine">freeCodeCamp</a> curriculum.';

var objectives = '<h5>Objectives:</h5>\
                    <li>Use JavaScript or jQuery;</li>\
                    <li>Use whichever library or APIs you need;</li>\
                    <li>Give it your own personal style;</li>\
                    <li>Add a button to show a new random quote;</li>\
                    <li>Add a button to tweet out a quote.</li>';

var addInput =  '<h5>My additional input:</h5>\
                  <li>I chose this <a target="_blank" href="https://quotesondesign.com/api-v4-0/">API;</a></li>\
                  <li>I used Bootstrap 4;</li>\
                  <li>The color of the background, twitter button and border of the "Next Quote" button is randomly generated, each time a new quote is loaded;</li>\
                  <li>I chose several "handwritten" family fonts. The quotes are randomly displayed with one of them.</li>';                   

var lessInfo = false;
function readMore () {
    if(lessInfo) {
        document.querySelector("#moreInfo").innerHTML="Read more ...";        
        document.querySelector("#additionalInfo").innerHTML = "";
        document.querySelector("#objectives").innerHTML= "";      
        document.querySelector("#addInput").innerHTML =""; 
        document.querySelector("#readMore2").style="visibility: hidden";
        lessInfo= !lessInfo;
    } else {
/* background-color: white; */
    /* box-shadow: 15px 15px 8px grey; */

        document.querySelector("#readMore2").style="background-color:white";
        document.querySelector("#readMore2").style="box-shadow: 15px 15px 8px grey";
        document.querySelector("#moreInfo").innerHTML="Read less";
        document.querySelector("#additionalInfo").innerHTML = addInfo;
        // document.querySelector("#additionalInfo").style =marginLeft;
        document.querySelector("#objectives").innerHTML= objectives;
        // document.querySelector("#objectives").style =marginLeft;        
        document.querySelector("#addInput").innerHTML =addInput;
        // document.querySelector("#addInput").style =marginLeft;
        lessInfo= !lessInfo;
    }
};

document.querySelector("#moreInfo").addEventListener("click", readMore);


// function outgoingFcb (){
// var urlFcb= 'http://www.linkedin.com/shareArticle?mini=true&url=https://my-spoiler-alert.com/radek/QM.html&title=Radeks+Quote+Machine+&summary=The+Greatest+Web+Exp&source=<source>';

// window.open(urlFcb);
// }

//  document.getElementById("btnFcb").addEventListener("click", outgoingFcb);





