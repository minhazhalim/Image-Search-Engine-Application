const imageWrapper = document.querySelector('.images');
const input = document.querySelector('.search input');
const loadMore = document.querySelector('.gallery .load-more');
const lightbox = document.querySelector('.lightbox');
const uilImport = lightbox.querySelector('.uil-import');
const closeIcon = lightbox.querySelector('.close-icon');
const apiKey = 'kDA05AHwJlpJjDEMZ0cPgxKiBqDsAFWDIYkcWsr5hc6d1HYzDg48WumH';
const perPage = 15;
let currentPage = 1;
let searchTerm = null;
const downloadImage = (imageUrl) => {
     fetch(imageUrl).then(response => response.blob()).then(blob => {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = new Date().getTime();
          a.click();
     }).catch(() => alert('Failed to Download Image!'));
};
const showLightbox = (name,image) => {
     lightbox.querySelector('img').src = image;
     lightbox.querySelector('span').innerText = name;
     uilImport.setAttribute('data-image',image);
     lightbox.classList.add('show');
     document.body.style.overflow = 'hidden';
};
const hideLightbox = () => {
     lightbox.classList.remove('show');
     document.body.style.overflow = 'auto';
};
const generateHTML = (images) => {
     imageWrapper.innerHTML += images.map(image => {
          `<li class="card">
               <img onclick="showLightbox('${image.photographer}', '${image.src.large2x}')" src="${image.src.large2x}" alt="image">
               <div class="details">
                    <div class="photographer">
                         <i class="uil uil-camera"></i>
                         <span>${image.photographer}</span>
                    </div>
                    <button onclick="downloadImage('${image.src.large2x}');"><i class="uil uil-import"></i></button>
               </div>
          </li>`
     }).join("");
};
const getImages = (apiURL) => {
     input.blur();
     loadMore.innerText = 'Loading.....';
     loadMore.classList.add('disabled');
     fetch(apiURL,{headers: {Authorization: apiKey}}).then(response => response.json()).then(data => {
          generateHTML(data.photos);
          loadMore.innerText = 'Load More';
          loadMore.classList.remove('disabled');
     }).catch(() => alert('Failed to Load Images!'));
};
getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
const loadMoreImages = () => {
     currentPage++;
     let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
     apiUrl = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiUrl;
     getImages(apiUrl);
};
const loadSearchImages = (event) => {
     if(event.target.value === "") return searchTerm = null;
     if(event.key === 'Enter'){
          currentPage = 1;
          searchTerm = event.target.value;
          imageWrapper.innerHTML = "";
          getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
     }
};
loadMore.addEventListener('click',loadMoreImages);
input.addEventListener('keyup',loadSearchImages);
closeIcon.addEventListener('click',hideLightbox);
uilImport.addEventListener('click',(event) => downloadImage(event.target.value));