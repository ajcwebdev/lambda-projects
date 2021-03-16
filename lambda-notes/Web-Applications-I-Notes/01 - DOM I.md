# DOM

### The Document Object Model is an object representation of an html document
* Programming interface to select and manipulate the page.
* Can change document structure, content, and styling.
* Creates and propagates event objects with information about event type and target.
  
### The object model is a tree structure with each DOM element in a tree node
* Parent elements have nested child elements.
* We traverse branches of the tree to get to the leaf (or leaves) we want to access.
* Branches can be their own trees.
* Node properties can be informational or methods used for interaction.

![DOM tree](https://tk-assets.lambdaschool.com/b75e53cc-0f0d-40c3-8f3f-31cc49eab207_dom-tree.jpg)

When a web page is loaded, the browser first looks for the HTML file. The browser uses the HTML and CSS files as a blueprint to build the page. The browser parses these instructions and builds a model for how the page should look and act using Javascript. The model it builds is a Javascript Object containing every element in order on the page.

### Developers access the DOM in the form of the global Javascript object `document`
* The `document` object contains the entire hierarchy of the page, with each HTML element contained in a DOM node.
* It also contains dozens of built in methods and properties that manipulate what we see on the screen.

![DOM tree 2](https://data-flair.training/blogs/wp-content/uploads/sites/2/2019/08/JavaScript-Dom-Tree.png)

# DOM Selectors

To manipulate elements on the DOM, we need to select them. We can select body and head with `document.body` and `document.head`. If we want to go deeper, `document` has several built-in methods for accessing specific elements.

## `getElement` Methods
Original methods for selecting elements from the DOM. Each takes a **single string** as the only argument containing either the **id** or **class** you are looking for.

#### `getElementsByTagName()`
* Single string argument containing **element name** of elements
* Returns array-like object (`HTMLCollection`) containing matching **elements**
```javascript
document.getElementsByTagName(‘p’);
```

#### `getElementById()`
* Single string argument containing **id** of an element
* Returns matching **element**
```javascript
document.getElementById(‘idName’);
```

#### `getElementsByClassName()`
* Single string argument containing **class** of elements
* Returns array-like object (`HTMLCollection`) containing matching **elements**
```javascript
document.getElementsByClassName(‘className’);
```

## `querySelector` Methods
Newest element selection methods added to the DOM that allow us to select elements based on CSS style selectors (`.` for class, `#` for id). They take a **string** containing the **selectors** and return the **element(s)**.

#### `querySelector()`
Takes **CSS selector** as argument and returns **first element** matching the value passed into method
* `(‘custom-style’)` instead of `(‘.custom-style’)` would error out
```javascript
document.querySelector(‘.custom-style’); 
```

#### `querySelectorAll()`
Takes **string** as argument and returns array-like object (`NodeList`) containing matching **elements**
```javascript
document.querySelectorAll(‘queryString’);
```

# DOM Arrays

### `HTMLCollection`
Returned by `getElementsByClassName()` and only has numerical zero-based indices and length property.

### `NodeList`
Returned by `querySelectorAll()` and has access to `.forEach` but not other array methods (`.reduce`, `.map`)

### `.from()`
`Array` class contains a method to create an array from an array-like object. It takes an array-like object as its only argument.
```javascript
Array.from(arrayLikeObject)
```

# DOM Methods

### `.createElement`
Creates a brand new element based on a given string.
* New element exists in memory, but not on the DOM yet.
* Can use any DOM property or method to style and manipulate the element.
```javascript
document.createElement('h1')
```


### `.textContent`
Gets and sets the text between the open and closing tags of an HTML element.
* The assignment operator (=) resets the text of an element
* Removes all of its children and replaces them with the new single text node.
```javascript
element.textContent = 'Something New;'
```

### `.setAttribute()`
Set or reassign an attribute on the element. Takes two arguments:
* Attribute to set
* Value to set to that attribute.
```javascript
element.setAttribute('src', 'http://www.imagsource.com/image.jpg')
```

### `.style`
Accesses the element's style object containing every available style as a key and a value.
* These are NOT the CSS styles, these are inline HTML styles.
* Access and change a property on the style object by using the assignment operator =.
* Changing a property on the style object gives the element an inline style but does not change anything in the CSS file.
```javascript
element.style.color = ‘blue’;
```

### `.className`
Accesses or assigns a string containing all of the classes on the element.

### `.id`
Accesses or assigns a string containing the id of the element.

### `.classList`
Returns an array-like object of all the classes on the element. `classList` is a `DOMTokenList`, an array-like object with:
* A numerical zero-based index
* A length property
* `contains()`
* `.forEach()`

The methods `.add()` `.remove()` and `.toggle()` take a single string representing the class.
* `.add('className')` and `.remove('className')` add and remove classes.
* `.toggle('className')` adds the class if it does not exist and remove it if if does.

### `.appendChild()`
Takes an element and adds it to it’s children. If the children are displayed in order it will be the last.
```javascript
parentElement.appendChild(childElement)
```

### `.prepend()`
Adds a child to the beginning, displaying it first.
```javascript
parentElement.prepend(childElement)
```

### `.children`
Returns `HTMLCollection` of all children of that element.

### `.parentNode`
Returns parent element of that element.
