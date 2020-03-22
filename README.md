<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️--><h1 align="center">web-dialog</h1>
<p align="center">
		<a href="https://npmcharts.com/compare/web-dialog?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/web-dialog.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/web-dialog"><img alt="NPM Version" src="https://img.shields.io/npm/v/web-dialog.svg" height="20"/></a>
<a href="https://david-dm.org/andreasbm/web-dialog"><img alt="Dependencies" src="https://img.shields.io/david/andreasbm/web-dialog.svg" height="20"/></a>
<a href="https://github.com/andreasbm/web-dialog/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/andreasbm/web-dialog.svg" height="20"/></a>
	</p>

<p align="center">
  <b>A highly accessible, customizable and lightweight dialog.</b></br>
  <sub>Try the dialog yourself at <a href="https://codepen.io/andreasbm/pen/abbJvme">Codepen</a>. Go here to see a demo <a href="https://appnest-demo.firebaseapp.com/web-dialog/">https://appnest-demo.firebaseapp.com/web-dialog/</a>.<sub>
</p>

<br />


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


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## ➤ Table of Contents

* [➤ Installation](#-installation)
* [➤ Usage](#-usage)
* [➤ Center the dialog](#-center-the-dialog)
* [➤ Sticky header and footer](#-sticky-header-and-footer)
* [➤ Customize](#-customize)
* [➤ Events](#-events)
* [➤ `openDialog(...)`](#-opendialog)
* [➤ lit-html & lit-element](#-lit-html--lit-element)
* [➤ Extend WebDialog](#-extend-webdialog)
* [➤ Documentation](#-documentation)
	* [web-dialog](#web-dialog)
		* [Properties](#properties)
		* [Methods](#methods)
		* [Events](#events)
		* [CSS Shadow Parts](#css-shadow-parts)
		* [CSS Custom Properties](#css-custom-properties)
* [➤ Contributors](#-contributors)
* [➤ License](#-license)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#installation)

## ➤ Installation

It is recommended that you install the library through [NPM](https://www.npmjs.com/package/web-dialog).

```
$ npm i web-dialog
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

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


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#center-the-dialog)

## ➤ Center the dialog

You probably noticed the dialog is not centered as default. This is because, as default, the dialog uses the container around the element to scroll in instead of using the inside of the dialog. To center the dialog you can add the `center` attribute or set the `.center` property to true.

```html
<web-dialog center>
  <span>This is a default centered dialog!</span>
</web-dialog>
```

When opened the dialog will look like this.

<img src="https://raw.githubusercontent.com/andreasbm/web-dialog/master/examples/example2.png" width="600">


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#sticky-header-and-footer)

## ➤ Sticky header and footer

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


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#customize)

## ➤ Customize

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


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#events)

## ➤ Events

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


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#opendialog)

## ➤ `openDialog(...)`

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


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#lit-html--lit-element)

## ➤ lit-html & lit-element

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


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#extend-webdialog)

## ➤ Extend WebDialog

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


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#documentation)

## ➤ Documentation

This section documents the `attributes`, `css variables` and `slots` of the web components this library exposes.

### web-dialog

A dialog web component that can be used to display highly interruptive messages.

#### Properties

| Property          | Attribute | Type             | Description                                 |
|-------------------|-----------|------------------|---------------------------------------------|
| `center`          | `center`  |                  | Whether the dialog is centered on the page. |
| `onBackdropClick` |           |                  |                                             |
| `onKeyDown`       |           |                  |                                             |
| `open`            | `open`    |                  | Whether the dialog is opened.               |
| `result`          |           | `R \| undefined` |                                             |

#### Methods

| Method            | Type                              | Description                                      |
|-------------------|-----------------------------------|--------------------------------------------------|
| `assertClosing`   | `(): any`                         | Dispatches an event that, if asserts whether the dialog can be closed.<br />If "preventDefault()" is called on the event, assertClosing will return true<br />if the event was not cancelled. It will return false if the event was cancelled. |
| `close`           | `(result?: R \| undefined): void` | Closes the dialog with a result.                 |
| `didClose`        | `(): void`                        | Clean up the dialog after it has closed.         |
| `didOpen`         | `(): void`                        | Setup the dialog after it has opened.            |
| `onBackdropClick` | `(): void`                        | Closes the dialog when the backdrop is clicked.  |
| `onKeyDown`       | `(e: any): void`                  | Closes the dialog when escape is pressed.        |
| `show`            | `(): void`                        | Shows the dialog.                                |

#### Events

| Event     | Description                                      |
|-----------|--------------------------------------------------|
| `close`   | This event is fired when the dialog closes.      |
| `closing` | This event is fired before the dialog is closed by clicking escape or on the backdrop. The event is cancellable which means `event.preventDefault()` can cancel the closing of the dialog. |
| `open`    | This event is fired when the dialog opens.       |

#### CSS Shadow Parts

| Part       | Description    |
|------------|----------------|
| `backdrop` | Backdrop part. |
| `dialog`   | Dialog part.   |

#### CSS Custom Properties

| Property                      | Description                                  |
|-------------------------------|----------------------------------------------|
| `--dialog-animation-duration` | Duration of the dialog animation.            |
| `--dialog-animation-easing`   | Easing of the dialog animation.              |
| `--dialog-backdrop-bg`        | Background of the backdrop.                  |
| `--dialog-bg`                 | Background of the dialog.                    |
| `--dialog-border-radius`      | Border radius of the dialog.                 |
| `--dialog-box-shadow`         | Box shadow of the dialog.                    |
| `--dialog-color`              | Color of the dialog.                         |
| `--dialog-container-padding`  | Padding of the host container of the dialog. |
| `--dialog-height`             | Height of the dialog.                        |
| `--dialog-max-height`         | Max height of the dialog.                    |
| `--dialog-max-width`          | Max width of the dialog.                     |
| `--dialog-overflow-x`         | Overflow of the x-axis.                      |
| `--dialog-overflow-y`         | Overflow of the y-axis.                      |
| `--dialog-padding`            | Padding of the dialog.                       |
| `--dialog-width`              | Width of the dialog.                         |
| `--dialog-z-index`            | Z-index of the dialog.                       |



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	

| [<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |
|:--------------------------------------------------:|:--------------------------------------------------:|
| [Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).

  