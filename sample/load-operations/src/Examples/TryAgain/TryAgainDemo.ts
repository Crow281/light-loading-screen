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
import {
    LoadingScreen,
    awaitPromiseFunction,
} from "@crow281/light-loading-screen";

/**
 * Creates a promise that will trigger resolve after
 * delay milliseconds has passed.
 * @param delay
 * Milliseconds to wait.
 */
function delayResolve(delay: number): Promise<void> {
    //Executor for a promise that will delay for a bit.
    const delayExecutor = (
        resolve: () => void,
        reject: (reason: unknown) => void,
    ): void => {
        //Create a timeout that will trigger after delay.
        setTimeout((): void => {
            //After the timeout, end the promise.
            resolve();
        }, delay);
    };

    //Create a promise that will delay for a bit.
    return new Promise(delayExecutor);
}

/**
 * Creates a promise that will trigger reject after
 * delay milliseconds has passed.
 * @param delay
 * Milliseconds to wait.
 */
function delayReject(delay: number): Promise<void> {
    //Executor for a promise that will delay for a bit.
    const delayExecutor = (
        resolve: () => void,
        reject: (reason: unknown) => void,
    ): void => {
        //Create a timeout that will trigger after delay.
        setTimeout((): void => {
            //After the timeout, end the promise with a fake error.
            reject(new Error("Something went terribly wrong!"));
        }, delay);
    };

    //Create a promise that will delay for a bit.
    return new Promise(delayExecutor);
}

/**
 * Creates a loading screen and displays the spinner animation
 * until the promise is done.
 * The promise is set to resolve in 3 seconds.
 */
export function tryAgainDemo() {
    //Create the loading screen we will be showing to user.
    const loadingScreen = new LoadingScreen();

    //By default, awaitPromiseFunction will just keep forcing the user to.
    //try again. By setting onCancel, this will make the cancel button
    //visible and give the user the option to give up early.
    loadingScreen.errorDialog.onCancel = (): void => {
        //If the user clicked the cancel button,
        //turn off the loading screen.
        loadingScreen.visible = false;
    };

    //Since we are generating a fake error,
    //record whether we have returned it yet or not.
    let firstTime: boolean = true;

    //A function that will try the operation until we succeed.
    //In this specific case, we will intentionally fail and then succeed.
    const createPromise = (): Promise<void> => {
        //If we haven't generated the fake error yet.
        if (firstTime) {
            //Reord that we have generated the fake error.
            firstTime = false;

            //Fail after a timeout.
            return delayReject(3000);

            //If this is not the first time this has been called.
        } else {
            //Succeed after a timeout.
            return delayResolve(3000);
        }
    };

    //Display loading screen and turn it off as soon as promise finishes.
    awaitPromiseFunction(loadingScreen, createPromise);
}
