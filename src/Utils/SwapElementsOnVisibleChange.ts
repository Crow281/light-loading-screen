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
 * When loading screen is visible, the items in parameter elements
 * will be removed from their parents.
 * When loading screen is no longer visible, they will be added back
 * to their parents.
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
 * //Fetch App root.
 * const root = document.findElementById("root");
 *
 * //Set the loading screen to disable the root DOM element until it is finished.
 * //LoadingScreen is primarily intended for app initialization,
 * //but in the event you do want to use it for more, this utility makes
 * //it easier to ensure the rest of the UI doesn't interfere with
 * //the loading screen.
 * swapElementsOnVisibleChange(loadingScreen, root);
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
 * @param elements
 * Elements to remove from their parents when loading screen is visible.
 * When loading screen is no longer visible, they will be appended
 * back to their parents.
 * @returns
 * The listener this added to loadingScreen.
 * Allows you to remove it if so desired.
 */
export function swapElementsOnVisibleChange(
    loadingScreen: LoadingScreen,
    ...elements: HTMLElement[]
): (visible: boolean) => void {
    //Stores the parents of each element.
    const parents: HTMLElement[] = new Array(elements.length);

    //Function to fire off whenever visibility changes.
    const onVisibleChangeListener = (visible: boolean): void => {
        //If loading screen is visible.
        if (visible) {
            //Make elements invisible.
            for (let index = 0; index < elements.length; ++index) {
                //Fetch element to operate on.
                const element: HTMLElement = elements[index];

                //Fetch parent of element we are operating on.
                const parent: HTMLElement = element.parentElement;

                //Save parent for when loading screen becomes invisible again.
                parents[index] = parent;

                //If element actually has a parent.
                if (parent) {
                    //Remove element from its parent.
                    parent.removeChild(element);
                }
            }

            //If loading screen is no longer visible.
        } else {
            //Make elements visible again.
            for (let index = 0; index < elements.length; ++index) {
                //Fetch element to operate on.
                const element = elements[index];

                //Fetch parent of element we are operating on.
                const parent = parents[index];

                //If parent does not exist.
                if (!parent) {
                    //Skip.
                    continue;
                }

                //Add element back to its parent.
                parent.appendChild(element);
            }
        }
    };

    //Register the listener to loading screen.
    loadingScreen.addVisibleListener(onVisibleChangeListener);

    //Fire off listener for the current value.
    onVisibleChangeListener(loadingScreen.visible);

    return onVisibleChangeListener;
}
