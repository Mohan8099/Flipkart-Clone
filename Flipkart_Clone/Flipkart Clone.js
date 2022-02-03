let searchBooksBtnEl = document.getElementById('search');
let inputEl = document.getElementById('input');
let booksContainerEl = document.getElementById('books');
let infoEl = document.getElementById('info');
let url;

function displayBooks(result) {
    let {
        title,
        imageLink,
        author
    } = result;

    let contEl = document.createElement('div');
    contEl.classList.add('books-card');
    booksContainerEl.appendChild(contEl);

    let titleName = document.createElement('h1');
    titleName.classList.add('book-title');
    titleName.textContent = title;
    contEl.appendChild(titleName);

    let imgEl = document.createElement('img');
    imgEl.setAttribute('src', imageLink);
    imgEl.classList.add("offer-img");
    contEl.appendChild(imgEl);

    let authorName = document.createElement('p');
    authorName.classList.add('book-title');
    authorName.textContent = author;
    contEl.appendChild(authorName);
}

function displaySearchResults(searchResults) {
    if (searchResults.length !== 0) {
        infoEl.textContent = "Popular Books";
        for (let result of searchResults) {
            displayBooks(result);
        }
    } else {
        infoEl.textContent = "No reuslts found";
    }
}

searchBooksBtnEl.addEventListener('click', function() {
    const booksUrl = 'https://apis.ccbp.in/book-store';
    fetch(booksUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let {
                search_results
            } = jsonData;
            console.log(search_results);
            displaySearchResults(search_results);
        });
});


inputEl.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let bookName = event.target.value;
        url = 'https://apis.ccbp.in/book-store?title=' + bookName + '&maxResults=' + 30;
        console.log(url);
        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displaySearchResults(search_results);
            });
    }
});