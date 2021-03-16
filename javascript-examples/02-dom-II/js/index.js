// Your code goes here

const pTags = document.querySelectorAll('p');
const body = document.querySelector('body');
const navBar = document.querySelectorAll('.nav-link');
const imgs = document.querySelectorAll('img');
const h4 = document.querySelectorAll('h4');
const footer = document.querySelector('footer');

//////// ContextMenu
imgs.forEach(img => {
  img.addEventListener('contextmenu', (event) => {event.target.style.visibility = 'hidden';});
});

//////// Mouseover, Mouseout
pTags.forEach(paragraph => {
  paragraph.addEventListener('mouseover', event => {event.target.style.color = 'grey';
    paragraph.addEventListener('mouseout', () => {event.target.style.color = 'black';})
  });
});

//////// Mouseenter, Mouseleave
h4.forEach(paragraph => {
  paragraph.addEventListener('mouseenter', event => {event.target.style.color = 'purple';
    paragraph.addEventListener('mouseleave', () => {event.target.style.color = 'orange';})
  });
});

//////// Keydown
body.addEventListener('keydown', (event) => {
  if(event.code === "Space") body.style.backgroundColor = 'black';
  event.preventDefault();
});

//////// Keyup
body.addEventListener('keyup', (event) => {
  if(event.code === "Space") body.style.backgroundColor = 'lightgrey';
  event.preventDefault();
});

////////// dbclick
body.addEventListener('dblclick', (event) => {body.style.backgroundColor = 'white';});

////////// Wheel
body.addEventListener('wheel', (event) => {body.style.backgroundColor = 'lightblue';});

////////// click
body.addEventListener('click', (event) => {body.style.backgroundColor = 'red';});

////////// stopPropagation
footer.addEventListener('click', (event) => {footer.style.backgroundColor = 'blue';
  event.stopPropagation()});

////////// preventDault
navBar.forEach(event => {
  event.addEventListener('click', event => event.preventDefault());});
