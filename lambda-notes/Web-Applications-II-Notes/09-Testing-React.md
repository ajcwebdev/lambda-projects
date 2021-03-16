# Testing React

In some cases when props are updated you’ll want to run a secondary test on the same component. There is a built in method called `rerender()` that looks at a component with new props. We need to add the `rerender` function when setting our test. We test the component after the prop has been updated. The user will update a component called `PhoneNumber` with their phone number. We want to show an error message when the component is empty but pass the test after the user puts in a number between 0 and 10.

```javascript
// name test
test("entering an invalid value shows an error message", () => {
  // pull in testing properties - add rerender and debug
  const { getByLabelText, getByRole, rerender } = render(
    <PhoneNumber />
  );
  const input = getByLabelText(/favorite number/i);
  // update prop
  fireEvent.change(input, { target: { value: "2025550113" } });
  // test component
  expect(getByRole("alert")).toHaveTextContent(/the number is invalid/i);
  // test prop updates
  rerender(<PhoneNumber phoneNumber={"2025550113"} />);
});
```

Since the first test is testing the component before the prop updates the test will fail and show an error message. Once the user inputs their number the second test (the rendering) should pass. If you ran this code in your console that’s what you’d see.

### Assert Content is not Rendered

In some cases we want to make sure that content is not rendering on the DOM, like if a component should show up on click or any time after pageload. React testing library isn’t built for this. `getBy` assertions return an error if they can’t find the thing they’re searching for (if a return is `null`). As a workaround the assertion `queryByRoll` (or any `queryBy` assertion) will return `null` instead of an error. This let’s us query for something this isn’t supposed to be on the DOM. It allows us to use an assertion like `.toBeNull()` or `toBeFalsy()`. The tests will then start passing even when no content is rendered.

```javascript
test("entering an invalid value shows an error message", () => {
  // pull in testing properties - add rerender
  // render the component without a prop
  const { getByLabelText, getByRole, queryByRole, rerender } = render(
    <PhoneNumber />
  );
  const input = getByLabelText(/favorite number/i);
  // test component
  expect(getByRole("alert")).toHaveTextContent(/the number is invalid/i);
  // test prop updates by rerendering component with different props
  rerender(<PhoneNumber phoneNumber={"2025550113"} />);
  // assert that the error message is NOT being rendered (optional)
  expect(queryByRold("alert")).toBeNull();
});
```

Here is a parent component that is in charge of fetching the data from dog.ceo, and a child component that receives that data as a prop and displays the dog images on the page. We will render the dog images into a new component after the initial rendering of the page. We need to test if the dog images appear on rerender. We want to test the child component and test that it renders a “getting data” message when it is passed an empty array as a prop. Then we will re-render the component and pass down our actual data to simulate the parent component receiving data from the API and passing that data down to this child component. We don’t have to test the async function or the event that kicked off the API call. We just render what this component looks like when it first mounts with no data, and what it looks like when it receives new props and re-renders.

### Create test and pull in relevant matchers from react testing library

```javascript
//import libraries
import React from "react";
import { render } from "@testing-library/react";
import DoggoImages from "./DoggoImages";

test("renders dog images from API", () => {
  // Render the component with an empty array
  const { getAllByTestId, rerender } = render(<Doggos images={[]} />);

  // Assert that there are no dog images rendered yet
  expect(getAllByTestId(/doggo images/i)).toHaveLength(0);
});
```

### Update prop by passing a user input. Test updated prop using `rerender`.

```javascript
//import libraries
import React from "react";
import { render } from "@testing-library/react";
import DoggoImages from "./DoggoImages";

test("renders dog images from API", () => {
  const doggoUrls = [
    'url-one.jpg', 'url-two.jpeg', 'url-three.jpg'
  ]
  const { getAllByTestId, rerender } = render(<DoggoImages images={[]} />);

  expect(getAllByTestId(/doggo images/i)).toHaveLength(0);

  // We will rerender the component with our dummy data passed in as the new props
  rerender(<DoggoImages images={doggoUrls} />);

  // Assert that we now have dog images rendering!
  expect(getAllByTestId(/doggo images/i)).toHaveLength(3);
});
```

## Mocks

Our functions don’t live in a vacuum. They have entanglements with dependencies on other modules. They might take callbacks as arguments, creating a problem of how to test that the callbacks were invoked with the correct arguments passed. To handle both these problems we can use Jest’s mock functions. A function in testing may have inconvenient dependencies on other objects. To isolate the behavior of the function, it’s often desirable to replace the other objects with mocks that simulate the behavior of the real objects. Replacing objects is especially useful if the real objects are impractical to incorporate into the unit test.

Another use of mocks is as “spies” because they let us spy on the behavior of a function that is called by some other code. Mock functions can keep track of calls to the function, as well as the parameters passed in those calls. We can even define an implementation for the mock, but that’s optional. Simpler mocks that implement only enough behavior to execute test code are sometimes called “stubs”. Let’s implement a helper function with an uncomfortable dependency that makes the helper impure (reliant on something outside of its scope) and, therefore, harder to test (you’ll need to install the `uuid` npm module).

```javascript
   import uuid from "uuid";

   export const makeUser = (firstName, lastName) => {
     return {
       id: uuid(),
       fullName: `${firstName} ${lastName}`
     };
   };
   ```
   
Testing expected output against actual output would be hard, because `uuid()` generates a new, random id each time. Note the use of `.toEqual()` to make our assertion. It compares nested properties of objects that we need to check.

```javascript
import { makeUser } from "../utils/makeUser";

test("generates a user with an id and a full name", () => {
  // Arrange
  const expected = { id: "abcde", fullName: "Peter Parker" }; // fishy...

  // Act
  const actual = makeUser("Peter", "Parker");

  // Assert
  expect(actual).toEqual(expected);
});
```

![Unit test](https://tk-assets.lambdaschool.com/6db480a0-84b6-4210-91a2-091475a1c731_ScreenShot2019-04-16at19.33.30.png)

This is called a unit test, a test for a single unit of code such as an isolated function like `makeUser`. To get around this problem, we can stub out a fake version of `uuid` that will replace the real one during the execution of the test. Outside of the `test` block, at the top level of the test file, place the following code:

```javascript
jest.mock("uuid", () => () => "abcde");
```

As the first argument to `jest.mock()`, we pass the path to the module we want to replace. As the second argument, we pass a callback that returns whatever it is we want the faked thing to be. We wish for `uuid` to become a silly stub function that always returns the same string: `uuid() // "abcde"`. Our tests should now pass. There is a way to centralize mocks that are used often (`uuid`/`axios`) in external files, so that they are used in test suites without even bothering with imports.

Most applications need to deal with async operations. Adding tests to async code is challenging as we need to make sure the code has finished executing and the application is stable before running the assertions. An asynchronous test is a special kind of test that does not complete right away. It needs to wait for the results of one or more asynchronous operations. When writing async code (dealing with APIs) it’s important to write async tests.

React testing library has helper functions to write these tests. The `wait` function tells the test that we need to wait for the async call to finish before continuing our assertions. We will use the `jest.mock` function to make mocks of the asynchronous functions so we won’t have to wait for the actual call to be made.

Like non asynchronous tests, we need to import components, render components, simulate an event, and run the test. The difference is a few added functions to make calls async. Let’s say we have a component that fetches data from the dog.ceo API when the user pushes a “Fetch Doggos” button. The component uses a function called `fetchDoggos` to make the API call. We have pulled this function out of the component and into an `/api` directory in our file structure to make it easier to test. We would write a test for this component following these steps:

### Imports

As usual, we need to import the required libraries for testing. In addition to our normal libraries, we’ll import `wait` to make our function run asynchronously, and we’ll import our component `fetchDoggos` as `mockFetchDoggos` so that we don’t have to wait for the actual call to be made.

* Import the regular `react` and `@testing-library/react` dependencies
* Also import `wait` from rtl
* Import `fetchDoggos` from the `/api` directory, and rename it to `mockFetchDoggos` so we know that it will be mocked - remember that a mock allows us to isolate a function from its dependencies.


```javascript
// import libraries

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { fetchDoggos as mockFetchDoggos } from "../api/fetchDoggos";
import Doggos from "./Doggos";

// set up test
test("renders dog images from API", async () => {});
```

### Mocking the Async Function

Next we need to set up the mock. Like before, we will create the mock outside of the `test` block to mock the fetchDoggos async function. Then, inside the `test` block we will tell the mock function with what data it should resolve. When the component makes the async request using our mocked function, it will resolve quickly with that data.

```javascript
// import libraries
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { fetchDoggos as mockFetchDoggos } from "../api/fetchDoggos";
import Doggos from "./Doggos";

//create mock *before* setting up test
jest.mock("../ap/fetchDoggosi");

// set up test
test("renders dog images from API", () => {
  //mock resolved results
  mockFetchDoggos.mockResolvedValueOnce({
    message: [
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg"
    ]
  });
});
```

### Render, Query, and Fire Events

Render the component, query for the necessary elements, and fire the onClick event with `fireEvent`. This step should look familiar from our first lessons on react testing library as we haven’t added any of the async functionality yet (other than importing `wait`).

```javascript
//import libraries
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { fetchDoggos as mockFetchDoggos } from "../api/fetchDoggos";
import Doggos from "./Doggos";

//set up test
jest.mock("../api/fetchDoggos");

test("renders dog images from API", () => {
  mockFetchDoggos.mockResolvedValueOnce({
    message: [
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg"
    ]
  });

  const { getByText } = render(<Doggos />);

  const fetchDoggosButton = getByText(/fetch doggos/i);
  fireEvent.click(fetchDoggosButton);
});
```

### Async/Await

At this point, the async call has been made. We need to tell our test that it is going to handle an async function by adding `async` right after the test name string, and before the callback function. This is using JavaScript’s `async/await` syntax! This tells the function that it’s going to do an async operation.

```javascript
// add async function
test("renders dog images from API", async () => {
  //mock resolved results
  mockFetchDoggos.mockResolvedValueOnce({
    message: [
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg"
    ]
  });

  const { getByText } = render(<Doggos />);

  const fetchDoggosButton = getByText(/fetch doggos/i);
  fireEvent.click(fetchDoggosButton);
});
```

### Await and the Wait Function

Tell the function which async operation it needs to wait for. There are two related parts we need to set up here, then we’ll be able to make our assertion.

* Use the `await` keyword to tell the function we’re awaiting for the async operation to finish
* Use the `wait` function from RTL to wait for RTL to update the DOM so we can query for the dog images
* Write an assertion in the `wait` functions callback function. Note that wait is usually required but certain assertions can work without it, you’ll need to do research on a case by case basis to determine wither or not wait is required.

```javascript
test("renders dog images from API", async () => {
  mockFetchDoggos.mockResolvedValueOnce({
    message: [
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg"
    ]
  });

  const { getByText, getAllByTestId } = render(<Doggos />);

  const fetchDoggosButton = getByText(/fetch doggos/i);
  fireEvent.click(fetchDoggosButton);
  // add await
  await waitFor(() => expect(getAllByTestId(/doggo-images/i)).toHaveLength(3));
});
```

### One Last Assertion

Finally, we will make sure that the correct function was called by adding an extra assertion, `expect(mockFetchDoggos).toHaveBeenCalledTimes(1);`.

```javascipt
test("renders dog images from API", async () => {
  mockFetchDoggos.mockResolvedValueOnce({
    message: [
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg"
    ]
  });

  const { getByText, getAllByTestId } = render(<Doggos />);

  const fetchDoggosButton = getByText(/fetch doggos/i);
  fireEvent.click(fetchDoggosButton);

  // add new assertion
  expect(mockFetchDoggos).toHaveBeenCalledTimes(1);

  await waitFor(() => expect(getAllByTestId(/doggo-images/i)).toHaveLength(3));
});
```

