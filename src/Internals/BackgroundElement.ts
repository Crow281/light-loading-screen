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
import { Background } from "Widgets/Background";

/**
 * Background implementation, used to control and render it.
 */
export class BackgroundElement implements ElementWidget, Background {
    /**
     * Element used to create the background.
     */
    private readonly _element: HTMLDivElement;

    /**
     * @param element
     * {@link HTMLDivElement} used to create the background.
     */
    constructor(element: HTMLDivElement) {
        //Save params.
        this._element = element;

        //Setup the spinner.
        //Fetch spinner style.
        const style = element.style;

        //Make loading screen a flexible box container.
        style.display = "flex";

        //Ensure loading screen remains the same regardless of how user scrolls.
        style.position = "fixed";

        //Make root fill the whole screen.
        style.inset = "0px";

        //Align flex children to the center horizontally.
        style.justifyContent = "center";

        //Align flex children to the center vertically.
        style.alignItems = "center";

        //Color the background white.
        style.background = "white";
    }

    get element(): HTMLDivElement {
        return this._element;
    }

    get zIndex(): string {
        return this._element.style.zIndex;
    }

    set zIndex(zIndex: string) {
        this._element.style.zIndex = zIndex;
    }

    get background(): string {
        return this._element.style.background;
    }

    set background(background: string) {
        this._element.style.background = background;
    }
}
