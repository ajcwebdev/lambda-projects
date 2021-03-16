# Events

Every user interaction with a site is an event: a click, moving the mouse, scrolling the page, pressing a key on the keyboard, etc.  Javascript allows us to add features and make modifications to our site by directly reacting to user interactions such as a button click, drag and drop, or zoom. The browser can detect events. When an event happens on a page, it is known as a trigger.

We need to be able to listen for specific events on specific elements.
* Did a user click that button?
* Did a users mouse hover over an element?
* Was there text entered into the input field?

### Event Listener

The tracking process and subsequent action taken is called an **event listener**. We put an event listener on an element and give it a **callback**. When that event is triggered on the element, the callback is run.

#### `.addEventListener`

Once we have an element selected, we use the `.addEventListener` method which takes two arguments:
* The event to listen for.
* The callback to fire when that event is triggered.

```javascript
element.addEventListener('click', callback);
```

Among the dozens of available events the most common are mouse events highlighted by the ‘click’ event.
* Event listeners can be added for many events (`mouseclick`, `keypress`, `hover`) all on the same element.
* We need to call `.addEventListener` and pass a callback for each event.

### Event Handler

The callback takes a single argument, the **`Event Object`**, a Javascript object containing information about the event and the element it happened on.

```javascript
element.addEventListener('click', (event) => {});
```

#### `.target`

Gives us all the information about the DOM node where the event happened.
* Has many of the same properties as regular DOM nodes (`.children`, `.parent`, `.style`, `innerText`).
* These properties can manipulate the element itself or its relatives.
* We can use this to manipulate the target such as changing the background color:

```javascript
element.addEventListener('click', (event) => { event.target.style.backgroundColor = 'blue'; });
```
Depending on the type of event listened for, we can access other information such as key pressed in the form of a code.

## Click

`click`, `dblclick`: Device button has been pressed and released on an element or clicked twice on an element.  
`select`: Some text is being selected.

## Mouse

`mousedown`: Device button is pressed on an element.  
`mouseenter`, `mouseleave`: Device is moved onto or off the element that has the listener attached.  
`mousemove`: Device is moved over an element (fired continously as the mouse moves).  
`mouseover, mouseout`: Device is moved onto or off the element that has the listener attached or onto one of its children.  
`mouseup`: Device button is released over an element.


## Drag & Drop

`drag`: An element or text selection is being dragged (fired every 350ms).  
`dragover`: An element or text selection is being dragged over a valid drop target (fired every 350ms).  
`dragstart, dragend`: The user starts or ends dragging an element or text selection.  
`dragenter, dragleave`: A dragged element or text selection enters or leaves a valid drop target.  
`drop`: An element is dropped on a valid drop target.

## Keyboard

`keydown`, `keyup`: ANY key is pressed or released.  
`keypress`: ANY key (except Shift, Fn, or CapsLock) is in pressed position (fired continously).

## Form

`reset`: Reset button is pressed.  
`submit`: Submit button is pressed.

## Focus

`focus`: An element has received focus (does not bubble).  
`blur`: An element has lost focus (does not bubble).  
`focusin, focusout`: An element is about to receive or lose focus (does bubble).
