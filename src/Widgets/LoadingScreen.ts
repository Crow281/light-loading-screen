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
import { BackgroundElement } from "Internals/Widgets/BackgroundElement";
import { ErrorDialogElement } from "Internals/Widgets/ErrorDialogElement";
import { SpinnerElement } from "Internals/Widgets/SpinnerElement";
import { Background } from "Widgets/Background";
import { ErrorDialog } from "Widgets/ErrorDialog";
import { LoadingScreenState } from "Widgets/LoadingScreenState";
import { Spinner } from "Widgets/Spinner";

/**
 * A lightweight class allowing the user to display a loading spinner
 * until they are done with something.
 *
 * On its own, it is just a configurable UI.
 *
 * There are several convenient utility functions to setup the loading screen
 * for common operations, such as {@link awaitPromise} for an event you
 * only want to fire off once succeed or fail, {@link awaitPromiseFunction} for
 * something that you want the user to be able to try again with,
 * or {@link awaitScriptLoad} for initializing an application.
 *
 * The {@link LoadingScreen.visible} property determines whether
 * the loading screen is part of the document body and therefore visible
 * or not.
 *
 * The {@link LoadingScreen.state} property determines whether it is playing
 * the spinner animation or displaying an error message.
 *
 * The {@link LoadingScreen.errorDialog} property allows you to customize
 * what happens when something goes wrong.
 */
export class LoadingScreen {
    /**
     * Used as the root and to implement the background.
     */
    private readonly _background: BackgroundElement;

    /**
     * Used to render the spinner.
     */
    private readonly _spinner: SpinnerElement;

    /**
     * Displays error and potentially lets you try again.
     */
    private readonly _errorDialog: ErrorDialogElement;

    /**
     * List of listeners wanting to know when visibility changes.
     */
    private readonly _onVisibleListeners: ((visible: boolean) => void)[] = [];

    /**
     * Current state of the loading screen.
     */
    private _state: LoadingScreenState = LoadingScreenState.None;

    /**
     *
     */
    constructor() {
        //Create the background, which also holds the root element.
        const backgroundElement = document.createElement("div");
        this._background = new BackgroundElement(backgroundElement);

        //Create the spinner element.
        const spinnerElement = document.createElement("div");
        this._spinner = new SpinnerElement(spinnerElement);

        //Create the error dialog element.
        const errorDialogElement = document.createElement("div");
        this._errorDialog = new ErrorDialogElement(errorDialogElement);

        //Initialize loading screen to spinner state.
        this.state = LoadingScreenState.Spinner;
    }

    /**
     * @returns
     * Highest ranking parent of all HTML elements the loading screen is
     * made from.
     */
    public get root(): HTMLElement {
        return this._background.element;
    }

    /**
     * @returns
     * Object allowing user to customize the background.
     */
    public get background(): Background {
        return this._background;
    }

    /**
     * @returns
     * Object allowing user to customize the spinner.
     */
    public get spinner(): Spinner {
        return this._spinner;
    }

    /**
     * @returns
     * Object allowing user to customize the error dialog
     * and what the user can do when something goes wrong.
     */
    public get errorDialog(): ErrorDialog {
        return this._errorDialog;
    }

    /**
     * @returns
     * True if loading screen is currently a child of another element,
     * presumably the document body.
     */
    public get visible(): boolean {
        //Return true if this is attached to anything.
        return this._background.element.parentElement !== null;
    }

    /**
     * @param visible
     * Allows user to control whether loading screen is currently a child
     * of another element, presumably the document body.
     *
     * Setting it to true will add it to document.body,
     * setting it to false will remove it from its parent.
     *
     * Call will be ignored if it is already in the desired state.
     */
    public set visible(visible: boolean) {
        //Ignore if already in this state.
        if (this.visible === visible) {
            return;
        }

        //If user wants to make loading screen visible.
        if (visible) {
            //Add the root to the document body.
            document.body.appendChild(this._background.element);

            //If user wants to remove the loading screen.
        } else {
            //Fetch root of the document.
            const root = this._background.element;

            //Remove it from its parent.
            root.parentElement.removeChild(root);
        }

        //Fire listeners with the new value of visible.
        for (const listener of this._onVisibleListeners) {
            listener(visible);
        }
    }

    /**
     *
     * @param listener
     * A listener that will be fired whenever
     * the value of property visible is changed.
     */
    public addVisibleListener(listener: (visible: boolean) => void): void {
        //Add to array of listeners.
        this._onVisibleListeners.push(listener);
    }

    /**
     *
     * @param listener
     * A listener that should stop listening on visibility.
     * @returns
     * true if listener was removed, false if listener does not exist.
     */
    public removeVisibleListener(
        listener: (visible: boolean) => void,
    ): boolean {
        //Fetch array of listeners.
        const listeners = this._onVisibleListeners;

        //Search for listener.
        const index = listeners.indexOf(listener);

        //If listener does not exist.
        if (index === -1) {
            //Tell user it does not exist.
            return false;

            //If listener exists.
        } else {
            //Erase listener from the array.
            listeners.splice(index, 1);

            //Tell user it was removed.
            return true;
        }
    }

    /**
     * @returns
     * Current mode of the loading screen.
     * Controls which submenu is currently visible.
     * @default {@link LoadingScreenState.None}
     */
    public get state(): LoadingScreenState {
        return this._state;
    }

    /**
     * @param state
     * Current mode of the loading screen.
     * Controls which submenu is currently visible.
     */
    public set state(state: LoadingScreenState) {
        //Ignore if no change.
        if (this._state === state) {
            return;
        }

        //Fetch root element elements are added to and removed from.
        const backgroundElement: HTMLDivElement = this._background.element;

        //Get elements being shown right now.
        const removeElements: HTMLElement[] = this.getStateElements(
            this._state,
        );

        //Get elements we want to start showing.
        const addElements: HTMLElement[] = this.getStateElements(state);

        //Remove elements we no longer want to show.
        for (const element of removeElements) {
            backgroundElement.removeChild(element);
        }

        //Add elements we want to show.
        for (const element of addElements) {
            backgroundElement.appendChild(element);
        }

        //Save new value.
        this._state = state;
    }

    /**
     * @param state
     * State we want the elements for.
     * @returns
     * Array of elements used in the given state.
     */
    private getStateElements(state: LoadingScreenState): HTMLElement[] {
        //Return elements corresponding to this state.
        switch (state) {
            //If they want to see the spinner.
            case LoadingScreenState.Spinner:
                return [this._spinner.element];

            //If they want to see the error dialog.
            case LoadingScreenState.ErrorDialog:
                return [this._errorDialog.element];

            //If state is None or something unknown.
            default:
                //Return an empty array.
                return [];
        }
    }
}
