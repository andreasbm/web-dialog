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
* **Customizable** - It is easy to customize the dialog with a few [CSS variables](https://www.w3.org/TR/css-variables-1/) or styling the exposed [shadow parts](https://www.w3.org/TR/css-shadow-parts-1/).
* **Works with [all frameworks](https://custom-elements-everywhere.com/)** - It exposes a [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) that can be used with your favorite framework.
* **Can be nested** - The dialogs can spawn on to of each other.

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

<p align="center">
	<img src="https://raw.githubusercontent.com/andreasbm/web-dialog/master/examples/example1.png" width="600">
</p>

## Center the dialog

You probably noticed the dialog is not centered as default. This is because, as default, the dialog uses the container around the element to scroll in instead of using the inside of the dialog. To center the dialog you can add the `center` attribute or set the `.center` property to true.

```html
<web-dialog center>
	<span>This is a default centered dialog!</span>
</web-dialog>
```

When opened the dialog will look like this.

<p align="center">
	<img src="https://raw.githubusercontent.com/andreasbm/web-dialog/master/examples/example2.png" width="600">
</p>

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

<p align="center">
	<img src="https://raw.githubusercontent.com/andreasbm/web-dialog/master/examples/example4.png" width="600">
</p>

## Customize

The dialog can be customized by setting some CSS variables or modifying the shadow parts. You can read about all of the CSS variables you can set and shadow parts you can change [here](#-documentation). Let's say you want to create a fullscreen dialog. Then you could change the following CSS variable to achieve it.

```
<style>
  --dialog-container-padding: 0;
  --dialog-border-radius: 0;
  --dialog-max-width: 100vw;
  --dialog-height: 100%;
  --dialog-animation-duration: 0;
</style>
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

<p align="center">
	<img src="https://raw.githubusercontent.com/andreasbm/web-dialog/master/examples/example5.png" width="600">
</p>


## Documentation

This section documents the `attributes`, `css variables` and `slots` of the web components this library exposes.

{{ doc:src/lib/web-dialog.ts }}

{{ template:contributors }}
{{ template:license }}

  