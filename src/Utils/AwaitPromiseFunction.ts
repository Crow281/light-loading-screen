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
import { awaitPromise } from "Utils/AwaitPromise";
import { LoadingScreen } from "Widgets/LoadingScreen";

/**
 * Intended for operations that may fail but offer the user the chance
 * to try again.
 *
 * Sets the loading screen to animate until parameter promise completes.
 *
 * If the promise is successful, the loading screen will then remove itself.
 *
 * If the promise fails, it will display the error and a try again button.
 * If the try again button is clicked, it will call createPromise again
 * and wait on the new promise with the same rules as the original.
 * @example
 * In the following example, the user is attempting to import module "MainMenu".
 * This will open the loading screen and activate the spinner animation.
 * If the promise returned by importMainMenuModule is successful, it will
 * simply turn off the loading screen.
 *
 * If something goes terribly wrong, the loading screen will display an
 * error message and give the user the option to try again, which will
 * result in importMainMenuModule again being called.
 * ```typescript
 * //Import the modules we need.
 * import { LoadingScreen, awaitPromiseFunction } from "@crow281/light-loading-screen";
 *
 * //Create the new loading screen.
 * const loadingScreen = new LoadingScreen();
 *
 * //Function to load the main menu.
 * //It will be called once while attempting to load.
 * //If the returned promise triggers an error, it will offer the
 * //user the chance to call it again via the try again button.
 * const importMainMenuModule = (): Promise<any> => {
 *     //Use dynamic import to load a desired module.
 *     return import("./MainMenu");
 * }
 *
 * //Function to generate the error message.
 * //Using this is optional.
 * //Default implementation will attempt to convert reason to a string.
 * //Dynamic imports are expected to pass
 * //a subclass of the Error type as the reason.
 * const convertReasonToMessage = (reason: Error): string => {
 *     return reason.message
 * }
 *
 * //Activate the loading screen and wait for importMainMenuModule to succeed.
 * //User can keep trying again until it succeeds,
 * //but cancelling has not been enabled.
 * awaitPromiseFunction(
 *     loadingScreen,
 *     importMainMenuModule,
 *     convertReasonToMessage
 * );
 * ```
 * @param loadingScreen
 * UI widget used to indicate progress to user.
 * @param createPromise
 * Creates the Promise we want the loading screen to wait on.
 *
 * Will be called again if the original promise fails and the
 * user clicks the try again button.
 * @param convertReasonToMessage
 * If promise fails, this method will be passed the promise's error reason.
 * Whatever string it returns will be used as the error message.
 *
 * If convertReasonToMessage is left empty and the promise's reason is
 * non-empty, the error message will default to new String(reason) instead.
 * If reason is empty, the error message will be "Error ⚠".
 */
export function awaitPromiseFunction(
    loadingScreen: LoadingScreen,
    createPromise: () => Promise<unknown>,
    convertReasonToMessage?: (reason: unknown) => string,
): void {
    //Setup what loading screen will do if user wants to try again.
    loadingScreen.errorDialog.onTryAgain = (): void => {
        //Create a new promise and wait on it for success again.
        awaitPromise(loadingScreen, createPromise(), convertReasonToMessage);
    };

    //Create a promise and wait on it for success for the first time.
    awaitPromise(loadingScreen, createPromise(), convertReasonToMessage);
}
