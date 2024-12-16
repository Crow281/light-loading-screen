/*
 * The MIT License
 *
 * Copyright 2024 Crow281.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { cancelMenuButton } from "Internals/CancelMenuButton";
import { ElementWidget } from "Internals/ElementWidget";
import { tryAgainMenuButton } from "Internals/TryAgainMenuButton";
import { ErrorDialog } from "Widgets/ErrorDialog";

/**
 * Error dialog implementation, used to control and render it.
 */
export class ErrorDialogElement implements ElementWidget, ErrorDialog {
    /**
     * Element used to create the root of the error dialog.
     */
    private readonly _element: HTMLDivElement;

    /**
     * Element used to render error message.
     */
    private readonly _messageParagraph: HTMLParagraphElement;

    /**
     * Element used to create the try again button.
     *
     * Is only visible if user sets the onTryAgain property.
     *
     * This button will fire onTryAgain off.
     */
    private readonly _tryAgainButton: HTMLButtonElement;

    /**
     * Element used to create the cacnel button.
     *
     * Is only visible if user sets the onCancel property.
     *
     * This button will fire onCancel off.
     */
    private readonly _cancelButton: HTMLButtonElement;

    /**
     * Function called if user clicks the try again button.
     *
     * Try again button will only be visible if this property is set.
     */
    private _onTryAgain: () => void = null;

    /**
     * Function called if user clicks the cancel button.
     *
     * Cancel button will only be visible if this property is set.
     */
    private _onCancel: () => void = null;

    /**
     * @param element
     * {@link HTMLDivElement} used to create the root of the error dialog.
     */
    constructor(element: HTMLDivElement) {
        //Save params.
        this._element = element;

        //Setup the dialog root.
        const style = element.style;

        //Give it some padding.
        style.padding = "1rem";

        //Create the message element.
        const messageParagraph = document.createElement("p");
        this._messageParagraph = messageParagraph;

        //Add it to the dialog element.
        element.appendChild(messageParagraph);

        //Create container to hold buttons.
        const menuDiv = document.createElement("div");

        //Style the menu.
        const menuDivStyle = menuDiv.style;

        //Make loading screen a flexible box container.
        menuDivStyle.display = "flex";

        //Align flex children to the center horizontally.
        menuDivStyle.justifyContent = "center";

        //Add menu container to the overall element.
        element.appendChild(menuDiv);

        //Create the try again button.
        const tryAgainButton = tryAgainMenuButton();
        this._tryAgainButton = tryAgainButton;

        //Setup the try again button.
        //If button is clicked, trigger onTryAgain.
        tryAgainButton.onclick = (): void => {
            //Make it call the onTryAgain event.
            //Don't need to run a null check since button won't
            //even be clickable if onTryAgain is null.
            this._onTryAgain();
        };

        //Add the try again button.
        menuDiv.append(tryAgainButton);

        //Create the cancel button.
        const cancelButton = cancelMenuButton();
        this._cancelButton = cancelButton;

        //If button is clicked, trigger onCancel.
        cancelButton.onclick = (): void => {
            //Make it call the onCancel event.
            //Don't need to run a null check since button won't
            //even be clickable if onCancel is null.
            this._onCancel();
        };

        //Add the cancel button.
        menuDiv.append(cancelButton);

        //Set customizable options to their defaults.
        this.messageColor = "red";
    }

    get element(): HTMLDivElement {
        return this._element;
    }

    get message(): string {
        return this._messageParagraph.innerText;
    }

    set message(message: string) {
        this._messageParagraph.innerText = message;
    }

    get messageColor(): string {
        return this._messageParagraph.style.color;
    }

    set messageColor(messageColor: string) {
        this._messageParagraph.style.color = messageColor;
    }

    get onTryAgain(): () => void | null {
        return this._onTryAgain;
    }

    set onTryAgain(onTryAgain: () => void | null) {
        //Save new value of try again.
        this._onTryAgain = onTryAgain;

        //Make cancel button hidden if onCancel is empty.
        this._tryAgainButton.hidden = !onTryAgain;
    }

    get onCancel(): () => void | null {
        return this._onCancel;
    }

    set onCancel(onCancel: () => void | null) {
        //Save new value of cancel.
        this._onCancel = onCancel;

        //Make cancel button hidden if onCancel is empty.
        this._cancelButton.hidden = !onCancel;
    }
}
