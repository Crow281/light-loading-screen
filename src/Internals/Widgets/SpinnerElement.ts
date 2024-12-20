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
import { ElementWidget } from "Internals/Widgets/ElementWidget";
import { Spinner } from "Widgets/Spinner";

/**
 * Spinner implementation, used to control
 * and render it.
 */
export class SpinnerElement implements ElementWidget, Spinner {
    /**
     * Element used to create the spinner.
     */
    private readonly _element: HTMLDivElement;

    /**
     *
     * @param element
     * {@link HTMLDivElement} used to create the spinner.
     */
    constructor(element: HTMLDivElement) {
        //Save params.
        this._element = element;

        //Setup the spinner.
        //Fetch spinner style.
        const style = element.style;

        //Turn the spinner into a circle.
        style.borderRadius = "50%";

        //Make border a solid line.
        style.borderStyle = "solid";

        //Make the border's default color transparent.
        //The parts of the circle we want visible will
        //have their colors overriden.
        style.borderColor = "transparent";

        //Setup defaults for configurable spinner properties.
        //Setup default spinner size.
        this.size = "3rem";

        //Setup default spinner border size.
        this.borderSize = "0.75rem";

        //Setup default color.
        //This overrides the border's default color with another for
        //the top and bottom.
        this.color = "rgb(64, 150, 255)";

        //Setup spinner animation.
        element.animate(
            //Make the spinner spin in a full circle.
            [
                {
                    transform: "rotate(0deg)",
                },
                {
                    transform: "rotate(360deg)",
                },
            ],
            {
                //Animation length in milliseconds.
                duration: 1000,

                //Spin forever.
                iterations: Number.POSITIVE_INFINITY,
            },
        );
    }

    get element(): HTMLDivElement {
        return this._element;
    }

    get size(): string {
        return this._element.style.width;
    }

    set size(size: string) {
        const style = this._element.style;
        style.width = size;
        style.height = size;
    }

    get borderSize(): string {
        return this._element.style.borderWidth;
    }

    set borderSize(borderSize: string) {
        this._element.style.borderWidth = borderSize;
    }

    get color(): string {
        return this._element.style.borderTopColor;
    }

    set color(color: string) {
        const style = this._element.style;
        style.borderTopColor = color;
        style.borderBottomColor = color;
    }

    get animation(): string {
        return this._element.style.animation;
    }

    set animation(animation: string) {
        this._element.style.animation = animation;
    }
}
