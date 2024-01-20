const searchFrom = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreButton = document.getElementById('show-more-button');
const accessKey = 'QQycKRVcOJW0NZwbeGV2aup1h_HY51ZjJRx7JZUIv24';
let page = 1;
let keyword = "";
async function searchImages(){
     keyword = searchBox.value;
     const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=15`;
     const response = await fetch(url);
     const data = await response.json();
     if(page === 1){
          searchResult.innerHTML = "";
     }
     const results = data.results;
     results.map((result) => {
          const img = document.createElement('img');
          img.src = result.urls.small;
          const a = document.createElement('a');
          a.href = result.links.html;
          a.target = '_blank';
          a.appendChild(img);
          searchResult.appendChild(a);
     });
     showMoreButton.style.display = 'block';
}
searchFrom.addEventListener('submit',(event) => {
     event.preventDefault();
     page = 1;
     searchImages();
});
showMoreButton.addEventListener('click',() => {
     page++;
     searchImages();
});