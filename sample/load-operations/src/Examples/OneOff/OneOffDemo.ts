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
import { LoadingScreen, awaitPromise } from "@crow281/light-loading-screen";

/**
 * Creates a loading screen and displays the spinner animation
 * until the promise is done.
 * The promise is set to resolve in 3 seconds.
 */
export function oneOffDemo() {
    //Create the loading screen we will be showing to user.
    const loadingScreen = new LoadingScreen();

    //Executor for a promise that will delay for a bit.
    const delayExecutor = (
        resolve: () => void,
        reject: (reason: unknown) => void,
    ): void => {
        //Create a timeout that will trigger in 3 seconds (or 3000 millis).
        setTimeout((): void => {
            //After the timeout, end the promise.
            resolve();
        }, 3000);
    };

    //Create a promise that will delay for a bit.
    const delayPromise: Promise<void> = new Promise(delayExecutor);

    //Display loading screen and turn it off as soon as promise finishes.
    awaitPromise(loadingScreen, delayPromise);
}
