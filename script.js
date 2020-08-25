const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
function loading() {
    loader.hidden = false;
    quoteText.hidden = true;
    quoteAuthor.hidden = true;
}

// Hide loading
function complete() {
    loader.hidden = true;
    quoteText.hidden = false;
    quoteAuthor.hidden = false;
}

// Get Quote from API
async function getQuote(){

    loading()

    const proxuUrl = 'https://tranquil-ridge-07797.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxuUrl + apiUrl);
        const data = await response.json();
        console.log(data);
        updateUI(data);
        complete();
    } catch (error) {
        getQuote();
        console.log('oops', error);
    }
}

function updateUI(data) {

    // Reduce font-size for long quotes
    if(data.quoteText.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    
    quoteAuthor.innerText = data.quoteAuthor === "" ? "unknown" : data.quoteAuthor;
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
twitterButton.addEventListener('click', tweetQuote);
newQuoteButton.addEventListener('click', getQuote);

// On Load
getQuote();