const apiKey = '6b42ad81d41a40b58aed853ecbf38261'; // Your API key
const newsContainer = document.getElementById('news-articles');

let currentIndex = 0; // Start with the first article
const articlesToShow = [];

async function fetchNews() {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&category=business`);
        const data = await response.json();

        console.log(data); // Log the response for debugging

        if (data.articles && data.articles.length > 0) {
            data.articles.forEach(article => {
                // Check if the article has valid content
                if (article.title && article.urlToImage) {
                    articlesToShow.push(article);
                }
            });

            if (articlesToShow.length > 0) {
                updateNews();
                setInterval(updateNews, 5000); // Change news every 5 seconds
            } else {
                newsContainer.innerHTML = '<p>No news articles found.</p>';
            }
        } else {
            newsContainer.innerHTML = '<p>No news articles found.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Failed to fetch news articles. Please try again later.</p>';
    }
}

function updateNews() {
    newsContainer.innerHTML = ''; // Clear the current articles
    const article = articlesToShow[currentIndex];

    const articleCard = `
        <div class="carousel-item active">
            <div class="card mb-4">
                <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description || 'No description available.'}</p>
                    <a href="${article.url}" class="btn btn-link" target="_blank">Read More</a>
                </div>
            </div>
        </div>
    `;

    newsContainer.insertAdjacentHTML('beforeend', articleCard);
    
    currentIndex = (currentIndex + 1) % articlesToShow.length; // Move to the next article
}

// Call the fetchNews function to load the news articles
fetchNews();
