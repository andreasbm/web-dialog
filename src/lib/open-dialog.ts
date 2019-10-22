import { WebDialog } from "./web-dialog";

interface IOpenDialogConfig {
	$template: HTMLElement | Text,
	$container: HTMLElement,
	center: boolean
	initialize: (() => WebDialog);
}

/**
 * Opens a dialog and appends it to the container.
 * @param $template
 * @param $container
 * @param center
 * @param T
 */
export function openDialog<T extends WebDialog> ({
	                            $template,
	                            $container = document.body,
	                            center = false,
								initialize = (() => new WebDialog())
                            }: Partial<IOpenDialogConfig> = {}) {

	// Construct the dialog
	const $dialog = initialize();

	// Attach the template
	$template != null ? $dialog.appendChild($template) : {};
	center != null ? $dialog.center = center : {};

	$dialog.addEventListener("close", $dialog.remove, {once: true});

	$container.appendChild($dialog);
	$dialog.open = true;
	return $dialog;
}
