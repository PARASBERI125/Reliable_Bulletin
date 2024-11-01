const API_KEY = "3066149e84624a398f091db2d94fd06a";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("India"));
async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsTemplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) {
      return;
    }
    const cardClone = newsTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
  function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsSource.innerHTML = article.source.name;
    newsDesc.innerHTML = article.description;
    cardClone.firstElementChild.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
  }
}
function onNavItemClick(id) {
  fetchNews(id);
}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("news-input");
searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) {
    return;
  }
  fetchNews(query);
});
function reload() {
  window.location.reload();
}
