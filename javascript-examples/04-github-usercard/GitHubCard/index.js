/* Step 1: 
           Send an axios GET request to this URL:
           https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/ajcwebdev')

/* Step 2: 
           Pass the data received from Github into cardComponent function
           Create a new component and add it to the DOM as a child of .cards
*/

.then(response =>
  {document.querySelector('.cards').appendChild(cardComponent(response.data))})
.catch(error =>
  {console.log(error);})

/* Step 3: 
          Iterate over array requesting data for each user
          Create a new card for each user
          Add that card to the DOM
*/

const followersArray = ['tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'];

followersArray.forEach(user => {
  axios.get(`https://api.github.com/users/${user}`)
        .then(response =>
          {document.querySelector('.cards').appendChild(cardComponent(response.data))})
        .catch(error => {console.log(error)})
})

/* Step 3:
          Create a function that accepts one argument: a single object
          Create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function cardComponent(object){
    ///// Create elements
    const cardDiv = document.createElement('div')
    const avatar = document.createElement('img')
    const cardInfo = document.createElement('div')
    const name = document.createElement('h3')
    const username = document.createElement('p')
    const location = document.createElement('p')
    const profile = document.createElement('p')
    const profileURL = document.createElement('a')
    const followers = document.createElement('p')
    const following = document.createElement('p')
    const bio = document.createElement('p')
  
    ///// Add classes to elements
    cardDiv.classList.add('card')
    cardInfo.classList.add('card-info')
    name.classList.add('name')
    username.classList.add('username')
  
    ///// Add content to elements
    avatar.src = `${object.avatar_url}`
    name.textContent = `${object.name}`
    username.textContent = `${object.login}`
    location.textContent = `Location: ${object.location}`
    profile.textContent = `Profile: `
    profileURL.href = `${object.html_url}`
    profileURL.textContent = `${object.html_url}`
    followers.textContent = `Followers: ${object.followers}`
    following.textContent = `Following: ${object.following}`
    bio.textContent = `Bio: ${object.bio}`
  
    ///// Append elements
    cardDiv.appendChild(avatar)
    cardDiv.appendChild(cardInfo)
    cardInfo.appendChild(name)
    cardInfo.appendChild(username)
    cardInfo.appendChild(location)
    cardInfo.appendChild(profile)
    profile.appendChild(profileURL)
    cardInfo.appendChild(followers)
    cardInfo.appendChild(following)
    cardInfo.appendChild(bio)
  
    return cardDiv
  }
