/**
 * Returns the data dialog count for an element.
 * @param $elem
 */
export function getDialogCount ($elem: HTMLElement): number {
	return Number($elem.getAttribute(`data-dialog-count`)) || 0;
}

/**
 * Sets the data dialog count for an element.
 * @param $elem
 * @param count
 */
export function setDialogCount ($elem: HTMLElement, count: number) {
	$elem.setAttribute(`data-dialog-count`, count.toString());
}

/**
 * Traverses the tree of active elements down the shadow tree.
 * @param activeElement
 */
export function traverseActiveElements (activeElement: Element | null = document.activeElement): Element | null {
	if (activeElement != null && activeElement.shadowRoot != null && activeElement.shadowRoot.activeElement != null) {
		return traverseActiveElements(activeElement.shadowRoot.activeElement);
	}

	return activeElement;
}