# Components I

A component is made of HTML, CSS, or JavaScript brought together for reuse in a website or application.

### HTML
We need to ask the question: “What am I trying to display from my data?” We are focused on user interface concepts and don’t need to access a database. Static HTML is data.

```html
<div class="custom-buttons">
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
  <button>Button 4</button>
</div>
```
Since we have repeating `<button></button>` tags we could use our CSS and JavaScript to create multiple buttons. The HTML gives us a great starting point for a button component, but we need to style it for reuse.

### CSS
Components should be modular or stand-alone and could be moved around at any moment. One way to control styles is using a specific class name that only matches up with the component.

```html
<div class="custom-buttons">
  <button class="custom-btn">Button 1</button>
  <button class="custom-btn">Button 2</button>
  <button class="custom-btn">Button 3</button>
  <button class="custom-btn">Button 4</button>
</div>
```

If you are using a preprocessor:
* Name your preprocessed file after the component.
* Import your component name into the main file.

```
@import custom-btn.less
.custom-btn {
  // custom styles here
}
```
### JavaScript
JavaScript is used to consume the data and output the content into the DOM. It is the core component in the repeatable nature of components, the glue that ties everything together. It consumes the HTML and returns a component version.

#### `.createElement`

Using a function and `.createElement`, we can create components and add them to the DOM.
* Sometimes it makes sense to build several elements with similar functionality.
* Perhaps lots of components have click handlers that use the same callback, or a group of components shares the same style.
* Once we create an element, we can use any property or method on it as we use on an element selected from the DOM.
* We can add event listeners to the newly formed element.

```javascript
let button = document.createElement('button');
button.textContent = 'Button 1';
button.classList.add('button');
button.addEventListener('click', (e) => {
    console.log('clicked!');
});

parent.appendChild(button);
```

If we want to create many buttons on our page we compartmentalize all the code into a function.
* Anything that may change, we can add in as an argument, everything else will stay the same.
* This function will allow us to create components.

```javascript
function buttonCreator(buttonText){
    const button = document.createElement('button');
    button.textContent = buttonText;
    button.classList.add('button');
    button.addEventListener('click', (e) => {
        console.log('clicked!');
    });

    return button;
}

let firstButton = buttonCreator('Button 1');
let secondButton = buttonCreator('Button 2');

parent.appendChild(firstButton);
parent.appendChild(secondButton);
```

We often will receive data, such as an array, and we need to create a new component for each item. Array methods can be used to create components based on the data present, regardless of its forms. Here we are using an array of strings:

```javascript
const data = [
    "Button One",
    "Button Two",
    "Button Three",
    "Button Four"
]
```

We can use the `buttonCreator` function from earlier:

```javascript
function buttonCreator(buttonText){
    const button = document.createElement('button');
    button.textContent = buttonText;
    button.classList.add('button');
    button.addEventListener('click', (e) => {
        console.log('clicked!');
    });

    return button;
})
```

#### `.forEach`
Runs the array through a loop, passing each item to our callback function. It doesn’t return a new array or mutate the data unless we tell it to. This is a simple way to iterate over arrays, create components, and add them instantly to the DOM.

```javascript
data.forEach((arrayItem) => {
  let newButton = buttonCreator(arrayItem);
  parent.appendChild(newButton);
});
```

We created a new component for each item in the array and added it to the DOM. It doesn't matter how many items are in the array. One downside is we add items to the DOM instantly. We may want to create the components and add them at a different time.

#### `.map`
Returns a new array with items transformed by our callback.

```javascript
let newComponents = data.map((arrayItem) => {
  let newButton = buttonCreator(arrayItem);
  return newButton;
});
```

With an array of DOM elements we can wait to add the components to the DOM or we can manipulate them further. `.forEach` adds them to the DOM.

```javascript
newComponents.forEach(component => {
  parent.appendChild(component);
});
```
