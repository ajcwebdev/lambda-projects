// // STEP 3: Create article cards.
// // -----------------------
// // Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// // Study the response data you get back, closely.
// // You will be creating a card for each 'article' in the response.
// // This won't be as easy as just iterating over an array though.
// //
// // Write a function that returns the following markup:
// //
// // <div class="card">
// //   <div class="headline">{Headline of article}</div>
// //   <div class="author">
// //     <div class="img-container">
// //       <img src={url of authors image} />
// //     </div>
// //     <span>By {author's name}</span>
// //   </div>
// // </div>
// //
// // Use your function to create a card for each of the articles and add the card to the DOM.

function cardComponent(object) {

    ///// Create elements
    const cardDiv = document.createElement('div')
    const headline = document.createElement('div')
    const author = document.createElement('div')
    const imgDiv = document.createElement('div')
    const signature = document.createElement('span')
    const img = document.createElement('img')

    ///// Add classes to elements
    cardDiv.classList.add('card')
    headline.classList.add('headline')
    author.classList.add('author')
    imgDiv.classList.add('img-container')

    ///// Add content to elements
    headline.textContent = `${object.headline}`
    img.src = `${object.authorPhoto}`
    signature.textContent = `By ${object.authorName}`

    ///// Append elements
    cardDiv.appendChild(headline)
    cardDiv.appendChild(author)
    author.appendChild(imgDiv)
    imgDiv.appendChild(img)
    author.appendChild(signature)    

    return cardDiv
}

const headerContainer = document.querySelector('.cards-container')

axios.get(`https://lambda-times-backend.herokuapp.com/articles`)
  .then(response =>{
      const articles = Object.entries(response.data.articles)
      articles.forEach(array => {
          array[1].forEach(article => {
              headerContainer.appendChild(cardComponent(article))
  })})})
  .catch(error => {console.log(error)})