const accessKey = "w1Gy-DiabOLK9udgQmokalukrp4A4x3AMtL1YEBxaNo";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMoreBtnEl = document.getElementById("showmore-btn");

let inputData = "";
let page = 1;


formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    page = 1;
    searchImages();
})

async function searchImages() {
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const data = await fetch(url);
    const parsedData = await data.json();

    if (page === 1) {
        searchResults.innerHTML = ""
    }

    let results = parsedData.results;

    results.map((result) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageContainer.appendChild(image);
        imageContainer.appendChild(imageLink);
        searchResults.appendChild(imageContainer);
    })

    page++

    if (page > 1) {
        showMoreBtnEl.style.display = "block";
    }
}
showMoreBtnEl.addEventListener("click", () => {
    searchImages();
})










