import { WebDialog } from "../../lib/web-dialog";

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
	get src (): string { return this.getAttribute("src") || ""; }
	set src (value: string) { this.setAttribute("src", value); }

	private $img!: HTMLImageElement;

	constructor () {
		super();

		// Append the dialog content
		this.$dialog.appendChild($template.content.cloneNode(true));

		// Get a reference to the img element
		this.$img = this.shadowRoot!.querySelector<HTMLImageElement>("#img")!;
		this.$img.src = this.src;
	}

	// Each time the src attribute changes we set the src of the image element
	attributeChangedCallback (name: string, newValue: string) {
		switch (name) {
			case "src":
				this.$img.src = this.src;
				break;
		}
	}
}

// Remember to define your custom element
customElements.define("image-dialog", ImageDialog);