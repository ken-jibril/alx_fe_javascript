document.addEventListener('DOMContentLoaded', () => {

    const quotes = [
         { text: "Be yourself; everyone else is already taken.", category: "Life" },
        { text: "Simplicity is the soul of efficiency.", category: "Programming" }
    ];
    const body = document.querySelector('body');
    const display = document.querySelector('#quoteDisplay');
    const heading = document.querySelector('#heading');
    const newQuoteButton = document.querySelector('#newQuote');
    const quoteInput = document.querySelector('#newQuoteText');
    const categoryInput = document.querySelector('#newQuoteCategory');

    heading.style.fontSize = '3em';
    heading.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
    heading.style.margin = '10px';
    heading.addEventListener('mouseover', () => heading.style.color = 'red' );
    heading.addEventListener('mouseout', () => heading.style.color = 'blue' );
   
    // Function to display a random quote
    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random()* quotes.length);
        const randomQuote = quotes[randomIndex];
        
        if (!display) {
            const display = document.createElement('div');
            display.id = 'quoteDisplay';
            body.appendChild(display);
        }
        
        const quotePara = document.createElement('p');
        quotePara.textContent = randomQuote.text;
        const quoteCategory = document.createElement('p');
        quoteCategory.textContent = randomQuote.category;
        
        display.innerHTML = '';
            
        display.appendChild(quotePara);
        display.appendChild(quoteCategory);
    }
    newQuoteButton.addEventListener('click', showRandomQuote);
    
    // Add quotes Dynamically
    function addQuote() {
        if (quoteInput.value && categoryInput.value) {
            
            quotes.push({
                text: quoteInput.value,
                category: categoryInput.value
            });
            quoteInput.value = '';
            categoryInput.value = '';
        }
    }
  window.addQuote = addQuote;
    showRandomQuote();
});