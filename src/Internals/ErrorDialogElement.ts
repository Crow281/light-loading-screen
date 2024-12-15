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
import { ElementWidget } from "Internals/ElementWidget";
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
        //Center the error dialog and everything in it.
        const style = element.style;
        style.position = "absolute";
        style.left = "50%";
        style.top = "50%";
        style.transform = "translate(-50%, -50%)";
        style.textAlign = "center";

        //Create the message element.
        const messageParagraph = document.createElement("p");
        this._messageParagraph = messageParagraph;

        //Add it to the dialog element.
        element.appendChild(messageParagraph);

        //Add a break between the message and buttons.
        element.appendChild(document.createElement("br"));

        //Create the try again button.
        const tryAgainButton = document.createElement("button");
        this._tryAgainButton = tryAgainButton;

        //Try again button is invisible until callback is set.
        tryAgainButton.hidden = true;

        //Add the try again button.
        element.append(tryAgainButton);

        //Setup the try again button.
        //Use a universal unicode for cycling to represent it.
        tryAgainButton.innerText = "🗘";

        //If button is clicked, trigger onTryAgain.
        tryAgainButton.onclick = (): void => {
            //Make it call the onTryAgain event.
            //Don't need to run a null check since button won't
            //even be clickable if onTryAgain is null.
            this._onTryAgain();
        };

        //Create the cancel button.
        const cancelButton = document.createElement("button");
        this._cancelButton = cancelButton;

        //Cancel button is invisible until callback is set.
        cancelButton.hidden = true;

        //Add the cancel button.
        element.append(cancelButton);

        //Setup the cancel button.
        //Use a universal unicode for cancel to represent it.
        cancelButton.innerText = "🗙";

        //If button is clicked, trigger onCancel.
        cancelButton.onclick = (): void => {
            //Make it call the onCancel event.
            //Don't need to run a null check since button won't
            //even be clickable if onCancel is null.
            this._onCancel();
        };

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
