{{ template:title }}
{{ template:badges }}
{{ template:description }}

<p align="center">
	<img src="https://raw.githubusercontent.com/andreasbm/web-dialog/master/examples/example1.png" width="600">
</p>

Building a good dialog is hard - there are many things you might not think about if you try to build one. This dialog has been build using the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/#dialog_modal) and follows all of the best practices. This makes the dialog:

* **Accessible** - The dialog is accessible. When opening the dialog, the focus is trapped inside the dialog and outside scrolling is blocked. When the dialog is closed, the focus is restored to what it was before opening it. It is also possible to close the dialog pressing the escape key.
* **Works well with [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)** - The dialog works very well with Shadow DOM and is therefore super Web Component friendly. Many people don't think about Shadow DOM when they build a dialog - this one has been build with Web Components in mind.
* **Incredible lightweight** - The footprint of the dialog is around 2500 bytes gzipped.
* **Customizable** - It is easy to customize the dialog with a few [CSS variables](https://www.w3.org/TR/css-variables-1/) or styling the exposed [Shadow Parts](https://www.w3.org/TR/css-shadow-parts-1/).
* **Works with [all frameworks](https://custom-elements-everywhere.com/)** - It exposes a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) that can be used with your favorite framework.
* **Can be nested** - The dialogs can spawn on top of each other.

{{template:toc}}

## Installation

It is recommended that you install the library through [NPM](https://www.npmjs.com/package/web-dialog).

```
$ npm i {{ ids.npm }}
```

## Usage

To use this library you first need to get import the library through code somewhere (`import "web-dialog";`). After you have done this you'll be able to use the `web-dialog` web component. In-between the opening and closing tags you can add whatever content you'd want to show in the dialog.

```html
<web-dialog>
  <span>This is a default dialog!</span>
</web-dialog>
```

To open the dialog you will have to add the `open` attribute to the element.

```html
<web-dialog open>
  <span>This is a default dialog!</span>
</web-dialog>
```

Alternatively you can set the `.open` property of the dialog to true through Javascript.

```js
const $dialog = document.querySelector("web-dialog");
$dialog.open = true;
```

When the dialog opens it will look like this.

<img src="https://raw.githubusercontent.com/andreasbm/web-dialog/master/examples/example1.png" width="600">

## Center the dialog

You probably noticed the dialog is not centered as default. This is because, as default, the dialog uses the container around the element to scroll in instead of using the inside of the dialog. To center the dialog you can add the `center` attribute or set the `.center` property to true.

```html
<web-dialog center>
  <span>This is a default centered dialog!</span>
</web-dialog>
```

When opened the dialog will look like this.

<img src="https://raw.githubusercontent.com/andreasbm/web-dialog/master/examples/example2.png" width="600">

## Sticky header and footer

What about a sticky header and footer? No problem at all. Just make sure to use `header`, `article` and `footer` HTML tags for your content and center the dialog. This will style the content in such as way that the footer and header is sticky.

```html
<web-dialog center>
  <header>
    <h3>The standard Lorem Ipsum passage</h3>
  </header>
  <article>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing...</p>
  </article>
  <footer>
    <button>Okay...</button>
  </footer>
</web-dialog>
```

To make thing look nice you can add some CSS and apply a bottom border to the header, a top border to the footer and add some padding to the elements. When opened the dialog will look like this.

<img src="https://raw.githubusercontent.com/andreasbm/web-dialog/master/examples/example4.png" width="600">

## Customize

The dialog can be customized by setting some CSS variables or modifying the shadow parts. You can read about all of the CSS variables you can set and shadow parts you can change [here](#-documentation). Let's say you want to create a fullscreen dialog. Then you could change the following CSS variable to achieve it.

```css
web-dialog {
  --dialog-container-padding: 0;
  --dialog-border-radius: 0;
  --dialog-max-width: 100vw;
  --dialog-height: 100%;
  --dialog-animation-duration: 0;
}
```

```html
<web-dialog>
  <header>
    <h3>The standard Lorem Ipsum passage</h3>
  </header>
  <article>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing...</p>
  </article>
  <footer>
    <button>Okay...</button>
  </footer>
</web-dialog>
```

When opened the dialog will look like this.

<img src="https://raw.githubusercontent.com/andreasbm/web-dialog/master/examples/example5.png" width="600">

## Events

The dialog can dispatch 3 different events.

* **open** - The first event is the `open` event which is dispatched when the dialog opens.
* **closing** - The second event is the `closing` event which is dispatched when the dialog is about to close due to the user clicking on the backdrop or pressing escape. If `.preventDefault()` is called on this event the dialog won't close.
* **close** - The third event is the <code>close</code> event which is dispatched when the dialog closes. If `.result` is set on the dialog, the `.detail` property of the `close` event will have the value of the result.

Here's an example on how you'd use the events.

```js
const $dialog = document.querySelector("web-dialog");

$dialog.addEventListener("open", () => {
  console.log("The dialog opened!");
});

$dialog.addEventListener("closing", () => {
  console.log("The dialog is about to close because the backdrop was clicked or because escape was pressed!");

  // Don't allow the dialog to close
  e.preventDefault();
});

$dialog.addEventListener("close", e => {
  console.log("The dialog closed!", e.detail);
});
```

## `openDialog(...)`

If you want to use the dialog programmatically you can use the `openDialog(...)` function. This function makes sure to append content inside the dialog, adds it to the DOM and removes it when it closes. You can give an object with the following fields to the function.

* **$content** - A DOM element that will be placed inside the dialog as content. This can also be a function that takes the dialog and appends the content for the dialog.
* **$container** - A DOM element where the dialog will be placed inside. As default this is the `body` element.
* **center** - Whether the dialog is centered. As default this is false.
* **initialize** - A function that returns an instance of `WebDialog`. This is smart to overwrite if you for example have extended the WebDialog class and want to open that custom dialog instead.

In it's most simple form you can open a dialog like this:

```js
import {openDialog} from "web-dialog";

const $template = document.createElement("template");
$template.innerHTML = `
  <span>This is some content for the dialog!</span>
`;

openDialog({
  $content: $template.content.cloneNode(true)
});
```

When the `openDialog(...)` function above is called it will look like this.

<img src="https://raw.githubusercontent.com/andreasbm/web-dialog/master/examples/example8.png" width="600">

The `openDialog(...)` function returns an object with the following two properties.

* **$dialog** - The dialog HTML element.
* **resolver** - A promise that will resolve with the result of the dialog when closed.

Based on the information above, here's a little more advanced example.

```js
import {openDialog} from "web-dialog";

// Create a template
const $template = document.createElement("template");
$template.innerHTML = `
  <button data-value="no">No</button>
  <button data-value="yes">Yes</button>
`;

// Open the dialog
const {$dialog, resolver} = openDialog({
  $content: $template.content.cloneNode(true)
});

// Attach an event listener that sets the closes the dialog with the result when a button is clicked
$dialog.querySelectorAll("button").forEach($button => $button.addEventListener("click", e => {
  const result = e.target.dataset.value;
  $dialog.close(result);
}));

// Wait for the result
const result = await resolver;

// Print the result
console.log(`The result was ${result}`);
```

## lit-html & lit-element

Here's a little trick for you if you use [lit-element](https://github.com/polymer/lit-element) or [lit-html](https://github.com/polymer/lit-html). If you want to quickly open a dialog with some content you can use the render function of `lit-html` like this.

```js
import {openDialog} from "web-dialog";
import {render} from "lit-html";

openDialog({
  $content: $dialog => render(html`
    <h3>Do you like this dialog?</h3>
    <button @click="${() => $dialog.close()}">Umm, yeah!</button>
  `, $dialog)
});
```

## Extend WebDialog

It is totally possible to extend the dialog. The only thing you have to do is define a new class and extend the `WebDialog` class. Then you can add your custom logic and define a new custom element with your new class. Here's an example of what you could if you for example want a custom dialog that shows an image.

```js
import { WebDialog } from "web-dialog";

// Create a template for the content of the dialog
const $template = document.createElement("template");
$template.innerHTML = `
  <style>
    #img {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }
  </style>
  <img id="img" />
`;

// Create a class extending the WebDialog class.
class ImageDialog extends WebDialog {

  // Observe the src attribute so we can react each time it changes
  static get observedAttributes () { return ["src"]; }

  // Make sure the src property is getting reflected as an attribute
  get src () { return this.hasAttribute("src"); }
  set src (value) { this.setAttribute("src", value); }
  
  constructor () {
    super();
    
    // Append the dialog content
    this.$dialog.appendChild($template.content.cloneNode(true));
    
    // Get a reference to the img element
    this.$img = this.shadowRoot.querySelector("#img");
  }
  
  // Each time the src attribute changes we set the src of the image element
  attributeChangedCallback (name, newValue) {
    switch (name) {
      case "src":
        this.$img.src = newValue;
        break;
    }
  }
}

// Remember to define your new custom element
customElements.define("image-dialog", ImageDialog);
```

After you have defined your new dialog you are be able to use it like this.

```html
<image-dialog open center src="https://i.ytimg.com/vi/NCZ0eg1zEvw/maxresdefault.jpg"></image-dialog>
```

Or this

```js
import {openDialog} from "web-dialog";

openDialog({
  initialize: () => {
    const $dialog = new ImageDialog();
    $dialog.src = `https://i.ytimg.com/vi/NCZ0eg1zEvw/maxresdefault.jpg`;
    $dialog.center = true;
    return $dialog;
  }
});
```

When our custom dialog opens it will look like this.

<img src="https://raw.githubusercontent.com/andreasbm/web-dialog/master/examples/example9.png" width="600">

## Documentation

This section documents the `attributes`, `css variables` and `slots` of the web components this library exposes.

{{ doc:src/lib/web-dialog.ts }}

{{ template:contributors }}
{{ template:license }}

  