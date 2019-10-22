import { openDialog } from "../../lib/open-dialog";
import { getDialogCount } from "../../lib/util";
import { WebDialog } from "../../lib/web-dialog";
import sharedStyles from "../styles/shared.scss";

const template = document.createElement("template");
template.innerHTML = `
	<style>${sharedStyles}</style>
	<h3 id="title"></h3>
	<button id="deeper">We need to go deeper!</button>
`;

export class NestedDialog extends WebDialog {
	protected $title!: HTMLElement;

	constructor () {
		super();
		this.$dialog.appendChild(template.content.cloneNode(true));
		this.$title = this.shadowRoot!.querySelector<HTMLElement>("#title")!;

		this.shadowRoot!.querySelector("#deeper")!.addEventListener("click", () => {
			openDialog({
				center: this.center,
				initialize: () => new NestedDialog()
			})
		});
	}

	didOpen () {
		super.didOpen();
		const dialogNumber = getDialogCount(this.$scrollContainer);
		this.$title.innerText = `This is dialog #${dialogNumber}`;
		if (dialogNumber >= 5) {
			while (this.$dialog.firstChild) {
				this.$dialog.firstChild.remove();
			}

			this.$dialog.appendChild(document.createTextNode(`That's enough for today :-)`));
		}
	}
}

customElements.define("nested-dialog", NestedDialog);