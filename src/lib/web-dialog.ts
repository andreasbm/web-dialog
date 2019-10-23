import { FocusTrap } from "@a11y/focus-trap";
import "@a11y/focus-trap";
import styles from "web-dialog.scss";
import { getDialogCount, setDialogCount, traverseActiveElements } from "./util";

const template = document.createElement("template");
template.innerHTML = `
  <style>${styles}</style>
  <div id="backdrop" part="backdrop"></div>
  <focus-trap id="dialog" part="dialog">
    <slot></slot>
  </focus-trap>
`;

/**
 * A dialog web component that can be used to display highly interruptive messages.
 * @fires open - This event is fired when the dialog opens.
 * @fires close - This event is fired when the dialog closes.
 * @fires closing - This event is fired before the dialog is closed by clicking escape or on the backdrop. The event is cancellable.
 * @cssprop --dialog-container-padding - Padding of the host container of the dialog.
 * @cssprop --dialog-z-index - Z-index of the dialog.
 * @cssprop --dialog-overflow-x - Overflow of the x-axis.
 * @cssprop --dialog-overflow-y - Overflow of the y-axis.
 * @cssprop --dialog-max-height - Max height of the dialog.
 * @cssprop --dialog-height - Height of the dialog.
 * @cssprop --dialog-backdrop-bg - Background of the backdrop.
 * @cssprop --dialog-animation-duration - Duration of the animation duration.
 * @cssprop --dialog-animation-easing - Easing of the animation.
 * @cssprop --dialog-border-radius - Border radius of the dialog.
 * @cssprop --dialog-box-shadow - Box shadow of the dialog.
 * @cssprop --dialog-max-width - Max width of the dialog.
 * @cssprop --dialog-width - Width of the dialog.
 * @cssprop --dialog-padding - Padding of the dialog.
 * @part backdrop - Backdrop part.
 * @part dialog - Dialog part.
 */
export class WebDialog<R = any> extends HTMLElement {
	static get observedAttributes () {
		return ["open", "center"];
	}

	/**
	 * Whether the dialog is opened.
	 * @attr
	 */
	get open () {
		return this.hasAttribute("open");
	}

	set open (value) {
		value ? this.setAttribute("open", "") : this.removeAttribute("open");
	}

	/**
	 * Whether the dialog is centered on the page.
	 * @attr
	 */
	get center () {
		return this.hasAttribute("center");
	}

	set center (value) {
		value ? this.setAttribute("center", "") : this.removeAttribute("center");
	}

	// Result of the dialog
	public result?: R;

	protected $dialog!: FocusTrap;
	protected $backdrop!: HTMLElement;
	protected $scrollContainer: HTMLElement = document.documentElement;
	protected $previousActiveElement: HTMLElement | null = null;

	/**
	 * Attaches the shadow root.
	 */
	constructor () {
		super();
		const shadow = this.attachShadow({mode: "open"});
		shadow.appendChild(template.content.cloneNode(true));

		this.$dialog = shadow.querySelector<FocusTrap>("#dialog")!;
		this.$backdrop = shadow.querySelector<HTMLElement>("#backdrop")!;

		this.onBackdropClick = this.onBackdropClick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);

		// Set aria attributes
		this.setAttribute("aria-modal", "true");
		this.$dialog.setAttribute("role", "alertdialog");
	}

	/**
	 * Attaches event listeners when connected.
	 */
	connectedCallback () {
		this.$backdrop.addEventListener("click", this.onBackdropClick);
	}

	/**
	 * Removes event listeners when disconnected.
	 */
	disconnectedCallback () {
		this.$backdrop.removeEventListener("click", this.onBackdropClick);

		// If the dialog is open when it is removed from the DOM
		// we need to cleanup the event listeners and side effects.
		if (this.open) {
			this.didClose();
		}
	}

	/**
	 * Closes the dialog when the backdrop is clicked.
	 */
	onBackdropClick () {
		if (this.assertClosing()) {
			this.open = false;
		}
	}

	/**
	 * Closes the dialog when escape is pressed.
	 */
	onKeyDown (e: KeyboardEvent) {
		switch (e.code) {
			case "Escape":
				if (this.assertClosing()) {
					this.open = false;

					// If there are more dialogs, we don't want to close those also :-)
					e.stopImmediatePropagation();
				}
				break;
		}
	}

	/**
	 * Dispatches an event that, if asserts whether the dialog can be closed.
	 * If "preventDefault()" is called on the event, assertClosing will return true
	 * if the event was not cancelled. It will return false if the event was cancelled.
	 */
	assertClosing () {
		return this.dispatchEvent(new CustomEvent("closing", {cancelable: true}));
	}

	/**
	 * When we open the dialog we need to.
	 * 1. Save the current focus.
	 * 2. Block the scrolling of the scroll container.
	 * 3. Dispatch an open event.
	 */
	didOpen () {

		// Save the current active element
		this.$previousActiveElement = traverseActiveElements(document.activeElement) as HTMLElement;

		// Focus the first element in the focus trap
		// Wait for the dialog to show its content before we try to focus inside it.
		// We request an animation frame to make sure the content is now visible.
		requestAnimationFrame(() => {
			this.$dialog.focusFirstElement();
		});

		// Make the dialog focusable
		this.tabIndex = 1;

		// Block the scrolling on the scroll container
		this.$scrollContainer.style.overflow = `hidden`;

		// Listen for key events
		this.addEventListener("keydown", this.onKeyDown, {capture: true});

		// Increment the dialog count with one
		setDialogCount(this.$scrollContainer, getDialogCount(this.$scrollContainer) + 1);

		// Dispatch an event so the rest of the world knows we opened
		this.dispatchEvent(new CustomEvent("open"));
	}


	/**
	 * When we close the dialog we need to.
	 * 1. Restore the previous focus focus.
	 * 2. Unblock the scrolling of the scroll container if there are no more dialogs.
	 * 3. Dispatch a close event.
	 */
	didClose () {

		// Remove the listener listening for key events
		this.removeEventListener("keydown", this.onKeyDown, {capture: true});

		// Decrement the dialog count with one
		setDialogCount(
			this.$scrollContainer,
			Math.max(0, getDialogCount(this.$scrollContainer) - 1)
		);

		// If there are now 0 active dialogs we unblock the scrolling from the scroll container
		if (getDialogCount(this.$scrollContainer) <= 0) {
			this.$scrollContainer.style.overflow = ``;
		}

		// Make the dialog unfocusable
		this.tabIndex = -1;

		// Restore previous active element
		if (this.$previousActiveElement != null) {
			this.$previousActiveElement.focus();
			this.$previousActiveElement = null;
		}

		// Dispatch an event so the rest of the world knows we closed
		this.dispatchEvent(new CustomEvent("close", {detail: this.result}));
	}

	/**
	 * Reacts when an observed attribute changes.
	 */
	attributeChangedCallback (name: string, newValue: unknown, oldValue: unknown) {
		switch (name) {
			case "open":
				this.open ? this.didOpen() : this.didClose();
				break;
		}
	}
}

customElements.define("web-dialog", WebDialog);

declare global {
	interface HTMLElementTagNameMap {
		"web-dialog": WebDialog;
	}
}