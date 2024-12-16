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
import { tryAgainIcon } from "Internals/TryAgainIcon";

/**
 * @returns
 * A button styled for trying again.
 */
export function tryAgainMenuButton(): HTMLButtonElement {
    //Create the button.
    const button = menuButton();

    //Use an SVG image with a circling arrow to represent trying again.
    const icon: SVGSVGElement = tryAgainIcon();

    //Fetch icon's styling.
    const iconStyle = icon.style;

    //Ensure image is centered.
    iconStyle.verticalAlign = "middle";

    //Make text container a specific size to ensure it
    //is the same as the SVG image.
    iconStyle.width = MENU_BUTTON_ICON_SIZE;
    iconStyle.height = MENU_BUTTON_ICON_SIZE;

    //Add icon to its button.
    button.appendChild(icon);

    return button;
}
