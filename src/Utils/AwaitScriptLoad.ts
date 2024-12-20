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
import { LoadingScreen } from "Widgets/LoadingScreen";
import { LoadingScreenState } from "Widgets/LoadingScreenState";

/**
 * Intended for initializing an overall web application.
 *
 * Sets the loading screen to animate until the given script element
 * triggers the load event.
 *
 * If the script element fires the load event,
 * the loading screen will then remove itself.
 *
 * If the script element fires the error event,
 * it will display the error message and a try again button.
 * The try again button will simply reload the page
 * by calling window.location.reload.
 * @example
 * ```html
 * <html>
 *     <head>
 *         <title>Example</title>
 *     </head>
 *     <body>
 *         <script type="module" src="./LoadLoadingScreen.js"></script>
 *         <!--
 *             Note that the app initialization script is later in the
 *             document order than the loading screen and
 *             has the async propert set.
 *         -->
 *         <script id="mainScript" type="module" src="./main.js" async></script>
 *     </body>
 * </html>
 * ```
 * ```typescript
 * //LoadLoadingScreen.ts -> LoadLoadingScreen.js after compiling.
 * //Import the modules we need.
 * import { LoadingScreen, awaitScriptLoad } from "@crow281/light-loading-screen";
 *
 * //Create the new loading screen.
 * const loadingScreen = new LoadingScreen();
 *
 * //Fetch the script element used to load the app.
 * //Since this tag has async on it, the browser won't wait for it to load,
 * //and since it is after LoadLoadingScreen in the document,
 * //LoadLoadingScreen will be called first.
 * const mainScript = document.getElementById("mainScript");
 *
 * //Activate loading screen and make it wait till
 * //mainScript fires the load or error event.
 * awaitScriptLoad(loadingScreen, mainScript);
 * ```
 * @param loadingScreen
 * UI widget used to indicate progress to user.
 * @param scriptElement
 * The loading script tag the loading screen is waiting on.
 *
 * The script is assumed to have been set to async.
 *
 * This method has no way of checking whether a script element has
 * already been loaded.
 * If the script element passed to this method fired the load event
 * before you passed it to this method, then the loading screen will never end.
 */
export function awaitScriptLoad(
    loadingScreen: LoadingScreen,
    scriptElement: HTMLScriptElement,
): void {
    //Cleans up listeners when no longer needed.
    const cleanListeners = (): void => {
        //Cleanup listeners.
        scriptElement.removeEventListener("load", loadListener);
        scriptElement.removeEventListener("error", errorListener);
    };

    //A listener that listens for success loading.
    const loadListener = (event: Event): void => {
        //Clean up after ourselves.
        cleanListeners();

        //Since we succeeded, end the loading screen.
        loadingScreen.visible = false;
    };

    //A listener that listens for an error loading.
    const errorListener = (event: ErrorEvent): void => {
        //Clean up after ourselves.
        cleanListeners();

        //Since we failed, set to error dialog.
        loadingScreen.state = LoadingScreenState.ErrorDialog;

        //Display the error message.
        loadingScreen.errorDialog.message = event.message;

        //Make try again button reload the entire page.
        loadingScreen.errorDialog.onTryAgain = (): void => {
            window.location.reload();
        };
    };

    //Make loading screen visible.
    loadingScreen.visible = true;

    //Set loading screen to the loading state.
    loadingScreen.state = LoadingScreenState.Spinner;

    //Listen for success loading.
    scriptElement.addEventListener("load", loadListener);

    //Listen for error loading.
    scriptElement.addEventListener("error", errorListener);
}
