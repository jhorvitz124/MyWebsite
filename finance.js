// Function to fetch stock data from Alpha Vantage API
function getStockData() {
    var apiKey = "YOUR_API_KEY"; // Replace with your Alpha Vantage API key
    var symbol = "AAPL"; // Change the symbol if necessary
    var apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var stockData = data["Global Quote"];
            var symbol = stockData["01. symbol"];
            var price = parseFloat(stockData["05. price"]);
            var change = parseFloat(stockData["09. change"]);
            var changePercent = parseFloat(stockData["10. change percent"]);
            var direction = change > 0 ? "▲" : "▼";
            var color = change > 0 ? "green" : "red";

            document.getElementById("stock-ticker").innerHTML = `<strong>${symbol}: $${price.toFixed(2)} ${direction} $${Math.abs(change).toFixed(2)} (${changePercent.toFixed(2)}%)</strong>`;
        })
        .catch(error => console.error("Error fetching stock data:", error));
}

// Fetch stock data every 30 seconds
setInterval(getStockData, 30000);

// Initial fetch
getStockData();
