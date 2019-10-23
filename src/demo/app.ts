import { openDialog } from "../lib/open-dialog";
import { ContentDialog } from "./dialogs/content-dialog";
import { LightBoxDialog } from "./dialogs/lightbox-dialog";
import { NestedDialog } from "./dialogs/nested-dialog";
import { ResultDialog } from "./dialogs/result-dialog";
import sharedStyles from "./styles/shared.scss";

const template = document.createElement("template");
template.innerHTML = `
	<style>${sharedStyles}</style>
	<style>
		#area {
			padding: var(--spacing-xl);
			border-radius: var(--border-radius-m);
			margin: 0 0 var(--spacing-m);
		}
		
		#area:first-of-type {
			background: #e9ebef;
			display: flex;
			align-content: space-between;
			align-items: center;
		}
		
		#area:first-of-type > :first-child {
			flex-grow: 1;
		}
		
		@media screen and (max-width: 500px) {
			:host {
				--dialog-padding: var(--spacing-s);
			}
			
			#area:first-of-type {
				flex-direction: column;	
				align-items: flex-start;
			}
			
			#area:first-of-type > :first-child {
				margin: 0 0 var(--spacing-m);
			}
		}
		
		#github:hover, #github:focus {
			opacity: 0.8;
		}
		
		#github svg {
			width: 50px;
		}
	</style>
	<div id="area">
		<div>
			<h1>Web Dialog</h1>
			<span>Web Dialog is a highly accessible, customizable and lightweight dialog.</span>
		</div>
		<div>
			<a id="github" href="https://github.com/andreasbm/web-dialog" target="_blank">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438.549 438.549" preserveAspectRatio="none"><path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"/></svg>	
			</a>
		</div>
	</div>
	<div id="area">
		<h3>Here's the default dialog</h3>
		<p>Let's start out simple. Click on the button below to see the default dialog. The only thing added here is some text.</p>
		<button id="default-button">Click to open dialog</button>
	</div>
	<div id="area">
		<h3>It can also be centered!</h3>
		<p>You probably noticed the dialog is not centered as default. This is because, as default, the dialog uses the container around the element to scroll in instead of using the inside of the dialog. Try to click on the button below to see how the default dialog looks when centered.</p>
		<button id="default-center-button">Click to open dialog</button>
	</div>
	<div id="area">
		<h3>Let's add some content</h3>
		<p>Let's try to add some content and see what happens. Click on the button below to see a dialog with some content. It has been customized slightly to look the way it looks. You can of course customize everything as much as you want. More about that later.</p>
		<button id="content-button">Click to open dialog</button>
	</div>
	<div id="area">
		<h3>How about a sticky header and footer?</h3>
		<p>That's great and all, but what about a sticky header and footer? No problem at all! Just make sure to use header, article and footer HTML tags for your content and center the dialog. This will style the content in such as way that the footer and header is sticky. Try it yourself below.</p>
		<button id="content-center-button">Click to open dialog</button>
	</div>
	<div id="area">
		<h3>It is highly customizable</h3>
		<p>The dialog can be customized by setting a few CSS variables. Try the dialog below! This one has been modified to fill the entire screen and have no entry animation.</p>
		<button id="content-center-fullscreen-button">Click to open dialog</button>
	</div>
	<div id="area">
		<h3>The dialogs can nest</h3>
		<p>It is possible to open dialogs within one another! Click on the button below to try it out.</p>
		<button id="nested-button">Click to open dialog</button>
	</div>
	<div id="area">
		<h3>What about a close button?</h3>
		<p>If you really want, you can add your own close button. Click on the button below to open a dialog with some cute cats and a close button.</p>
		<button id="lightbox-button">Click to open dialog</button>
	</div>
	<div id="area">
		<h3>What events does the dialog dispatch?</h3>
		<p>The dialog can dispatch 3 different events. The first event is the <code>open</code> event which is dispatched when the dialog opens. The second event is the <code>closing</code> event which is dispatched when the dialog is about to close due to the user clicking on the backdrop or pressing escape. If <code>.preventDefault()</code> is called on this event the dialog won't close. The third event is the <code>close</code> event which is dispatched when the dialog closes. If <code>.result</code> is set on the dialog, the <code>.detail</code> property of the <code>close</code> event will have the value of the result.</p>
		<button id="returnvalue-button">Click to open dialog</button>
		<br />
		<br />
		<p id="returnvalue-result"></p>
	</div>
`;

export class WebDialogApp extends HTMLElement {
	constructor () {
		super();
		const shadow = this.attachShadow({mode: "open"});
		shadow.appendChild(template.content.cloneNode(true));

		shadow.querySelector("#default-button")!.addEventListener("click", () => {
			openDialog({
				$content: document.createTextNode(`This is a default dialog!`)
			});
		});

		shadow.querySelector("#default-center-button")!.addEventListener("click", () => {
			const $template = document.createElement("template");
			$template.innerHTML = `
				<span>This is a default centered dialog!</span>
			`;

			openDialog({
				center: true,
				$content: $template.content.cloneNode(true)
			});
		});

		shadow.querySelector("#content-button")!.addEventListener("click", () => {
			openDialog({
				initialize: () => new ContentDialog()
			});
		});


		shadow.querySelector("#content-center-button")!.addEventListener("click", () => {
			openDialog({
				center: true,
				initialize: () => new ContentDialog()
			});
		});

		shadow.querySelector("#content-center-fullscreen-button")!.addEventListener("click", () => {
			openDialog({
				center: true,
				initialize: () => {
					const $dialog = new ContentDialog();
					$dialog.style.setProperty(`--dialog-container-padding`, `0`);
					$dialog.style.setProperty(`--dialog-border-radius`, `0`);
					$dialog.style.setProperty(`--dialog-max-width`, `100vw`);
					$dialog.style.setProperty(`--dialog-height`, `100%`);
					$dialog.style.setProperty(`--dialog-animation-duration`, `0`);

					// Don't allow the backdrop to close the dialog
					//$dialog.addEventListener("closing", (e: Event) => e.preventDefault());

					return $dialog;
				}
			});
		});

		shadow.querySelector("#lightbox-button")!.addEventListener("click", () => {
			openDialog({
				initialize: () => {
					const $dialog = new LightBoxDialog();
					$dialog.setImages([
						"https://i.ytimg.com/vi/6kzrFoXNYVg/maxresdefault.jpg",
						"https://i.ytimg.com/vi/cbP2N1BQdYc/maxresdefault.jpg",
						"https://i.imgur.com/gdWIxn2.jpg",
						"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvLPNuRHS0qXPTxkSIzD4SHYhCK6ga2IUnlgYIsKTD15KnzWU7",
						"https://ae01.alicdn.com/kf/HTB1w.uMacfrK1RkSnb4q6xHRFXay/Pet-Glasses-Dog-Glasses-Cute-cat-toy-for-Little-Dog-Eye-Wear-Dog-Sunglasses-Photos-Props.jpg"
					]);
					return $dialog;
				}
			});
		});

		shadow.querySelector("#nested-button")!.addEventListener("click", () => {
			openDialog({
				center: true,
				initialize: () => new NestedDialog()
			});
		});

		shadow.querySelector("#returnvalue-button")!.addEventListener("click", async () => {
			const {resolver} = openDialog({
				center: true,
				initialize: () => new ResultDialog()
			});

			// Wait for the result
			const result = await resolver;
			shadow.querySelector<HTMLElement>("#returnvalue-result")!.innerText = `Result: ${result || "Nothing.."}`;
		});
	}
}

customElements.define("web-dialog-app", WebDialogApp);