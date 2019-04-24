// alert("Hello from your Chrome extension!");
var div = document.createElement("div");
      var imgPath = chrome.extension.getURL('img/mohawk.jpg');
      div.innerHTML = `
      <div id="clippy"></div>
          <img id="clippyImg" src=${imgPath} />
      `;
      document.body.appendChild(div);

// load the quotes from the json file
const quotesURL = chrome.runtime.getURL('quotes.json');
var quotes;

function sayQuote(qts) {
    var quote = qts.quotes[Math.floor(Math.random() * qts.quotes.length)];
    document.getElementById("clippy").innerHTML = `<div id="speech-bubble"><p>${quote}</p></div>`;
    console.log(quote);
 } 

fetch(quotesURL).then((response) => response.json())
    .then((json) => {
        quotes = json;
        // say one right away
        sayQuote(quotes);
        
        // set an interval with some randomness to update the quote
        setInterval( () => sayQuote(quotes), 5000 + Math.random()*3000);
    })
    .catch((error) => console.log(error, error.message));

