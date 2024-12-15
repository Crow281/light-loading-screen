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
 * Source code for the one off demo.
 */
export const awaitScriptTSCode: string = `import { LoadingScreen, awaitScriptLoad } from "@crow281/light-loading-screen";

//Create the loading screen.
const loadingScreen = new LoadingScreen();

//Create the script tag that will load the App.
//Normally, this element would be directly in the document.
//However, in this simplified example, the Loading Screen is
//unoptimized as well as more expensive than the App.
//Since this example would complete too fast otherwise,
//we will programmatically add it after a delay.
const scriptElement = document.createElement("script");

//Set script to load asynchronously.
scriptElement.async = true;

//Point script element to the script we want.
scriptElement.src = "./Example/AwaitScript/App.js";

//Make loading screen play until script element loads or fails.
awaitScriptLoad(loadingScreen, scriptElement);

//After a short, but perceptible delay, activate the script element.
setTimeout(
    function() {
        document.body.appendChild(scriptElement);
    },
    3000
);`;
