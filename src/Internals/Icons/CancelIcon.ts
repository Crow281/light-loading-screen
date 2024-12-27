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
 * @returns
 * An SVG image with a cancel icon in the form of an "X".
 */
export function cancelIcon(): SVGSVGElement {
    //Create the parent SVG image tag.
    const svgImage: SVGSVGElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
    );

    //Set the view box, which controls which part of the SVG to view.
    //Offset simply starts from the origin.
    //Size = 16(icon) + 4 * 2(padding) = 24.
    svgImage.setAttribute("viewBox", "0 0 24 24");

    //Create the path element representing the X.
    const path: SVGPathElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
    );

    //Tell the path how to draw the x.
    //Use 4 pixels of padding on each side.
    path.setAttribute("d", "M 4,4 L 20,20 M 20,4 L 4,20");

    //Give path its default line color.
    path.setAttribute("stroke", "black");

    //Make path's line thicker.
    path.setAttribute("stroke-width", "2");

    //Add the path to the SVG.
    svgImage.appendChild(path);

    return svgImage;
}
