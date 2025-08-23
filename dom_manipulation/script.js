let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do not watch the clock. Do what it does. Keep going.", category: "Inspiration" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");

let notificationBox = document.createElement("div");
notificationBox.id = "notificationBox";
notificationBox.style.cssText = "margin-top:10px; color: green; font-weight: bold;";
document.body.appendChild(notificationBox);

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
  let filteredQuotes = getFilteredQuotes();
  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }
  let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  let quote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories();
    textInput.value = "";
    categoryInput.value = "";
    showNotification("Quote added successfully!");
  } else {
    showNotification("Please enter both a quote and a category.", "red");
  }
}

function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Quote";
  addBtn.onclick = addQuote;

  formDiv.appendChild(textInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addBtn);

  document.body.appendChild(formDiv);
}

function populateCategories() {
  const categories = ["all", ...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = "";
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categoryFilter.appendChild(option);
  });

  const lastCategory = localStorage.getItem("lastCategory");
  if (lastCategory && categories.includes(lastCategory)) {
    categoryFilter.value = lastCategory;
  }
}

function getFilteredQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("lastCategory", selectedCategory);
  return selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);
}

function filterQuotes() {
  showRandomQuote();
}

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    showNotification("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    const serverQuotes = data.slice(0, 3).map(item => ({
      text: item.title,
      category: "Server"
    }));
    return serverQuotes;
  } catch (error) {
    showNotification("Failed to fetch from server.", "red");
    return [];
  }
}

async function postQuoteToServer(quote) {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote)
    });
    showNotification("Quote posted to server!");
  } catch (error) {
    showNotification("Failed to post quote to server.", "red");
  }
}

async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();

  let combined = [...quotes, ...serverQuotes];
  let uniqueQuotes = [];
  let seen = new Set();

  combined.forEach(q => {
    let key = q.text + "|" + q.category;
    if (!seen.has(key)) {
      uniqueQuotes.push(q);
      seen.add(key);
    }
  });

  quotes = uniqueQuotes;
  saveQuotes();
  populateCategories();
  showNotification("Quotes synced with server!");
}

function showNotification(message, color = "green") {
  notificationBox.textContent = message;
  notificationBox.style.color = color;
  setTimeout(() => {
    notificationBox.textContent = "";
  }, 3000);
}

newQuoteBtn.addEventListener("click", showRandomQuote);
categoryFilter.addEventListener("change", filterQuotes);

createAddQuoteForm();
populateCategories();
showRandomQuote();

setInterval(syncQuotes, 30000);

