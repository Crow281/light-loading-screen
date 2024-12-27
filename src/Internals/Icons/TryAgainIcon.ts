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
 * An SVG image with a try again icon in the form of a circling arrow.
 */
export function tryAgainIcon(): SVGSVGElement {
    //Create the parent SVG image tag.
    const svgImage: SVGSVGElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
    );

    //Set the view box, which controls which part of the SVG to view.
    //Since the the circle and origin are shared,
    //but we need space for the arrow, offset is -4, -4.
    //Size = 16(icon) + 4 * 2(padding) = 24.
    svgImage.setAttribute("viewBox", "-4 -4 24 24");

    //Create the path element representing the circling line.
    const circlePath: SVGPathElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
    );

    //Tell the path how to draw a circling arrow.
    circlePath.setAttribute(
        "d",
        "M 13.656854249,13.656854249 A 8,8 0 1 1 16,8",
    );

    //Make circlePath just a line.
    circlePath.setAttribute("fill", "none");

    //Give arrow its default line color.
    circlePath.setAttribute("stroke", "black");

    //Make circlePath's line thicker.
    circlePath.setAttribute("stroke-width", "2");

    //Add the circling line to the svg.
    svgImage.appendChild(circlePath);

    //Create the path element representing the arrow.
    const arrowPath: SVGPathElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
    );

    //Tell the path how to draw an arrow.
    arrowPath.setAttribute("d", "M 21,6 L 16,10 L 11,6");

    //Add the arrow to the svg.
    svgImage.appendChild(arrowPath);

    return svgImage;
}
