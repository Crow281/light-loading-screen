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
import { LoadingScreen } from "Widgets";

/**
 * When loading screen is visible, all other children of document.body
 * will be removed.
 * When loading screen is no longer visible, they will be added back.
 *
 * You would generally use this if you still
 * want to continue using LoadingScreen after your app has been initialized
 * and need to ensure the rest of your UI does not interfere.
 * @example
 * ```typescript
 * //Import the modules we need.
 * import { LoadingScreen, awaitPromiseFunction } from "@crow281/light-loading-screen";
 *
 * //Create the new loading screen.
 * const loadingScreen = new LoadingScreen();
 *
 * //Set the loading screen to disable other DOM elements until it is finished.
 * //LoadingScreen is primarily intended for app initialization,
 * //but in the event you do want to use it for more, this utility makes
 * //it easier to ensure the rest of the UI doesn't interfere with
 * //the loading screen.
 * swapBodyOnVisibleChange(loadingScreen);
 *
 * //Function to load the next menu.
 * //It will be called once while attempting to load.
 * //If the returned promise triggers an error, it will offer the
 * //user the chance to call it again via the try again button.
 * const importMenuModule = (): Promise<any> => {
 *     //Use dynamic import to load a desired module.
 *     return import("./NextMenu");
 * }
 *
 * //Activate the loading screen and wait for importMenuModule to succeed.
 * //User can keep trying again until it succeeds,
 * //but cancelling has not been enabled.
 * awaitPromiseFunction(
 *     loadingScreen,
 *     importMenuModule
 * );
 * ```
 * @param loadingScreen
 * UI widget used to indicate progress to user.
 * @returns
 * The listener this added to loadingScreen.
 * Allows you to remove it if so desired.
 */
export function swapBodyOnVisibleChange(
    loadingScreen: LoadingScreen,
): (visible: boolean) => void {
    //Fetch the root element of the loading screen.
    const root = loadingScreen.root;

    //Records all items removed last time loading screen became visible.
    let removed: Element[] = [];

    //Function to fire off whenever visibility changes.
    const onVisibleChangeListener = (visible: boolean): void => {
        //Fetch body of the document.
        const body = document.body;

        //If loading screen is visible.
        if (visible) {
            //Fetch children of document body.
            const children = body.children;

            //Iterate children backwards.
            for (let index = children.length - 1; index >= 0; --index) {
                //Fetch current item.
                const item = children.item(index);

                //Ignore the loading screen.
                if (item === root) {
                    continue;
                }

                //Remove item from body.
                item.remove();

                //Record it so we can add it back later.
                removed.push(item);
            }

            //If loading screen is no longer visible.
        } else {
            //Iterate removed items.
            for (let index = removed.length - 1; index >= 0; --index) {
                //Add removed items back to the body in their original order.
                body.appendChild(removed[index]);
            }

            //Reset the array.
            removed = [];
        }
    };

    //Register the listener to loading screen.
    loadingScreen.addVisibleListener(onVisibleChangeListener);

    //Fire off listener for the current value.
    onVisibleChangeListener(loadingScreen.visible);

    return onVisibleChangeListener;
}
