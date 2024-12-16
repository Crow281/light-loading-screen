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

import { MENU_BUTTON_ICON_SIZE, menuButton } from "Internals/MenuButton";

/**
 * @returns
 * A button styled for cancelling.
 */
export function cancelMenuButton(): HTMLButtonElement {
    //Create the button.
    const button = menuButton();

    //Create button's label. We will be using "X" as
    //a universal representation for cancel.
    const text = document.createElement("div");
    text.innerText = "X";

    //Fetch the label's style
    const textStyle = text.style;

    //Set line height so that text is centered.
    textStyle.lineHeight = MENU_BUTTON_ICON_SIZE;

    //Give text container size for icons.
    textStyle.width = MENU_BUTTON_ICON_SIZE;
    textStyle.height = MENU_BUTTON_ICON_SIZE;

    //Give text its own size.
    textStyle.fontSize = MENU_BUTTON_ICON_SIZE;

    //Give the button its label.
    button.appendChild(text)

    return button;
}
