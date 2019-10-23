import { WebDialog } from "../../lib/web-dialog";

const template = document.createElement("template");
template.innerHTML = `
	<style>
		#img {
			width: 100%;
			height: 400px;
			object-fit: cover;
		}
		
		#close {
		    position: absolute;
			top: 0;
			left: 0;
			transform: translate(-50%, -50%);
			height: 40px;
			padding: 0;
			width: 40px;
			border-radius: 100%;
			color: black;
			background: white;
			border: 1px solid lightgray;
			outline: none;
			cursor: pointer;
		}
		
		#close:focus {
			background: lightgrey;
		}
	</style>
	<img id="img" alt="Image of a cute cat" />
	<button id="close" aria-label="Close this dialog window">𝗫</button>
`;

export class LightBoxDialog extends WebDialog {
	private $img!: HTMLImageElement;
	private images: string[] = [];
	private index = 0;

	constructor () {
		super();
		this.$dialog.appendChild(template.content.cloneNode(true));
		this.$img = this.shadowRoot!.querySelector<HTMLImageElement>("#img")!;

		this.shadowRoot!.querySelector("#close")!.addEventListener("click", () => this.open = false);

	}

	setImages (images: string[]) {
		this.images = images;
		this.setup();
	}

	onKeyDown (e: KeyboardEvent) {
		super.onKeyDown(e);
		switch (e.code) {
			case "ArrowRight":
				this.setIndex(this.index + 1);
				break;
			case "ArrowLeft":
				this.setIndex(this.index - 1);
				break;

		}
	}

	setup () {
		this.setIndex(0);
	}

	setIndex (index: number) {
		if (index >= 0 && index < this.images.length) {
			this.$img.src = this.images[index];
			this.index = index;
		}
	}
}

customElements.define("lightbox-dialog", LightBoxDialog);