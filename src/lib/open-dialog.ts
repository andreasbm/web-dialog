import { WebDialog } from "./web-dialog";

interface IOpenDialogConfig<T extends WebDialog<R>, R = any> {
	$content: Node | (($dialog: T) => void),
	$container: HTMLElement,
	center: boolean
	initialize: (() => T);
}

/**
 * Opens a dialog and appends it to the container.
 * @param $content
 * @param $container
 * @param center
 * @param initialize
 */
export function openDialog<T extends WebDialog<R>, R = any> ({
	                                                             $content,
	                                                             $container = document.body,
	                                                             center = false,
	                                                             initialize = (() => new WebDialog<R>() as T)
                                                             }: Partial<IOpenDialogConfig<T, R>> = {}): {$dialog: T, resolver: Promise<R>} {

	// Construct the dialog.
	const $dialog = initialize();

	// Set the relevant properties of the dialog.
	if (center != null) {
		$dialog.center = center;
	}

	// Attach the content to the dialog.
	if ($content != null) {
		if (typeof $content === "function") {
			$content($dialog);
		} else {
			$dialog.appendChild($content);
		}
	}

	// Create a resolver that resolves when the dialog closes.
	const resolver = new Promise<R>(res => {
		$dialog.addEventListener<any>("close", (e: CustomEvent<R>) => {
			$dialog.remove();
			res(e.detail);
		}, {once: true});
	});

	// Append the dialog to the container and open it.
	$container.appendChild($dialog);
	$dialog.show();

	return {$dialog, resolver};
}
