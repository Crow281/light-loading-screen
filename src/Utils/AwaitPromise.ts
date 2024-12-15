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
import { LoadingScreen, LoadingScreenState } from "Widgets";

/**
 * Intended for operations that don't offer the user the chance
 * to try again.
 *
 * Sets the loading screen to animate until parameter promise completes.
 *
 * If the promise is successful, the loading screen will then remove itself.
 *
 * If the promise fails, it will display the error.
 * Unless you set {@link ErrorDialog.onTryAgain} or
 * {@link ErrorDialog.onCancel} yourself,
 * the loading screen will stay there.
 * @example
 * In the following example, the user is attempting to download data
 * from a website and do something with it.
 * This will open the loading screen and activate the spinner animation.
 * If the promise returned by requestData is successful, it will
 * simply turn off the loading screen.
 *
 * If something goes terribly wrong, the loading screen will display an
 * error message. However, user will not be given the option to try again.
 *
 * Thanks to setting {@link ErrorDialog.onCancel}, it is possible
 * for the user to give up.
 * ```typescript
 * //Import the packages we need.
 * import { LoadingScreen, awaitPromiseFunction } from "@crow281/light-loading-screen";
 *
 * //Create the new loading screen.
 * const loadingScreen = new LoadingScreen();
 *
 * //Configure the loading screen to make it cancellable.
 * //This is optional and is NOT configured by awaitPromise.
 * loadingScreen.errorDialog.onCancel = (): void => {
 *     //Turn off loading screen
 *     loadingScreen.visible = false;
 * }
 *
 * //Function to download some data and do something with it.
 * //It will be called once while attempting to load.
 * //If the returned promise triggers an error, it will display the error
 * //and end there.
 * const requestData = (): Promise<void> => {
 *     //Download data from some website.
 *     const data: Response = await fetch("http://example.com");
 *
 *     //Do whatever you want with the data upon success.
 *     console.log(data.status);
 * }
 *
 * //Create the promise we will wait on.
 * const requestDataPromise = requestData();
 *
 * //Activate the loading screen and wait for requestDataPromise to succeed.
 * awaitPromiseFunction(
 *     loadingScreen,
 *     requestDataPromise
 * );
 * ```
 * @param loadingScreen
 * UI widget used to indicate progress to user.
 * @param promise
 * Promise we want the loading screen to wait on.
 * @param convertReasonToMessage
 * If promise fails, this method will be passed the promise's error reason.
 * Whatever string it returns will be used as the error message.
 *
 * If convertReasonToMessage is left empty and the promise's reason is
 * non-empty, the error message will default to new String(reason) instead.
 * If reason is empty, the error message will be "Error ⚠".
 */
export function awaitPromise(
    loadingScreen: LoadingScreen,
    promise: Promise<unknown>,
    convertReasonToMessage?: (reason: unknown) => string,
): void {
    //Make loading screen visible.
    loadingScreen.visible = true;

    //Set loading screen to the loading state.
    loadingScreen.state = LoadingScreenState.Spinner;

    //If message function is empty, use a default.
    if (!convertReasonToMessage) {
        //The default will check the reason and attempt to
        //generate an error message to show to user.
        convertReasonToMessage = (reason: unknown): string => {
            //If reason was non-empty.
            if (reason) {
                //Convert it to a string.
                return String(reason);

                //If reason was empty.
            } else {
                //Use a default string.
                return "Error ⚠";
            }
        };
    }

    //Wait for the promise to finish.
    promise.then(
        (value: unknown): void => {
            //Since we succeeded, end the loading screen.
            loadingScreen.visible = false;
        },
        (reason: unknown): void => {
            //Since we failed, set to error dialog.
            loadingScreen.state = LoadingScreenState.ErrorDialog;

            //Use message function to convert reason to
            //a string we can show to user.
            loadingScreen.errorDialog.message = convertReasonToMessage(reason);
        },
    );
}
