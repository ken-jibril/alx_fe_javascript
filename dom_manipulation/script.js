document.addEventListener('DOMContentLoaded', () => {

    const quotes = [];
    const body = document.querySelector('body');
    const display = document.querySelector('#quoteDisplay');
    const heading = document.querySelector('#heading');

    heading.style.fontSize = '3em';
    heading.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
    heading.style.margin = '10px';
    heading.addEventListener('mouseover', () => {
        heading.style.color = 'red';
    })
    heading.addEventListener('mouseout', () => {
        heading.style.color = 'blue';
    })

     function showRandomQuote() {
        const randomIndex = Math.floor(Math.random()* quotes.length);
        const quotes = quotes[randomIndex];

        if (!display) {
            const display = document.createElement('div');
            display.id = 'quoteDisplay';
            body.appendChild(display);
        }

        const quotePara = document.createElement('p');
        quotePara.textContent = quotes;
        const quoteCategory = document.createElement('p');
        quoteCategory.textContent = `category: ${quotes.category}`;

        display.innerHTML = '';
        
        display.appendChild(quotePara);
        display.appendChild(quoteCategory);
     }

     function createAddQuoteForm() {
        const form = document.createElement('form');
        form.id = 'quoteForm';

        const quoteInput = document.createElement('input');
        quoteInput.type = 'text';
        quoteInput.placeholder = 'Enter New Quote';
        quoteInput.id = 'quoteInput';
        quoteInput.required = true;


        const categoryInput = document.createElement('input');
        categoryInput.type = 'text';
        categoryInput.placeholder = 'Enter Quote Category';
        categoryInput.id = 'categoryInput';
        categoryInput.required = true;

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Add Quote';

        form.appendChild(quoteInput);
        form.appendChild(categoryInput);
        form.appendChild(submitBtn);

        body.appendChild(form);

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            quotes.push({
                text: quoteInput.value,
                category: categoryInput.value
            });
        })
        textInput.value = '';
        categoryInput.value = '';


     }
     showRandomQuote();
     createAddQuoteForm();
})