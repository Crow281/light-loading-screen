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
/**
 * Allows users to customize the {@link LoadingScreen} spinner.
 */
export interface Spinner {
    /**
     * @returns
     * The CSS used to control the spinner's overall height and width.
     * @default "3em"
     */
    get size(): string;

    /**
     * @param size
     * The CSS used to control the spinner's overall height and width.
     */
    set size(size: string);

    /**
     * @returns
     * The CSS used to control the size of the spinner's border.
     * @default "0.75em"
     */
    get borderSize(): string;

    /**
     * @param borderSize
     * The CSS used to control the size of the spinner's border.
     */
    set borderSize(borderSize: string);

    /**
     * @returns
     * The CSS used to control the color of the spinner.
     * @default "rgb(64, 150, 255)"
     */
    get color(): string;

    /**
     * @param color
     * The CSS used to control the color of the spinner.
     */
    set color(color: string);
}
