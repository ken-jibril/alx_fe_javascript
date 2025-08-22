document.addEventListener('DOMContentLoaded', () => {

    const quotes = [];
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

     
})