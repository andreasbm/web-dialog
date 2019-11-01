import { WebDialog } from "../../lib/web-dialog";
import sharedStyles from "../styles/shared.scss";

const template = document.createElement("template");
template.innerHTML = `
	<style>
		${sharedStyles}
		input {
			width: 100%;
			margin: 0 0 var(--spacing-m);
		}
	</style>
	<form>
		<h3>Enter your name</h3>
		<input name="name" placeholder="Enter your name.." required/>
		<button type="submit">Save</button>
	</form>
`;

export class ResultDialog extends WebDialog {
	constructor () {
		super();
		this.$dialog.appendChild(template.content.cloneNode(true));

		const $form = this.shadowRoot!.querySelector<HTMLFormElement>("form")!;

		// Listen for the submit event on the form and set the result
		$form.addEventListener("submit", (e: Event) => {
			e.preventDefault();
			const formData = new FormData(e.target as HTMLFormElement);
			this.close(formData.get("name"));
		});

		this.addEventListener("closing", (e: Event) => {
			if ($form.checkValidity() && !confirm(`You have unsafed changed. Do you really want to close the dialog?`)) {
				e.preventDefault();
			}

		});
	}
}

customElements.define("result-dialog", ResultDialog);