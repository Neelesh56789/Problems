const quotes = [
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "The best way to predict the future is to create it.",
    "Don't watch the clock; do what it does. Keep going.",
    "The only way to do great work is to love what you do.",
    "Life is what happens when you're busy making other plans.",
    "Your time is limited, don't waste it living someone else's life.",
    "The secret of getting ahead is getting started.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "The only source of knowledge is experience."
  ];
  
  function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  
  document.getElementById("quoteButton").addEventListener("click", function() {
    const quoteElement = document.getElementById("quote");
    quoteElement.textContent = getRandomQuote();
  });
  
  // Generate a random quote on page load
  document.addEventListener("DOMContentLoaded", function() {
    const quoteElement = document.getElementById("quote");
    quoteElement.textContent = getRandomQuote();
  });
  