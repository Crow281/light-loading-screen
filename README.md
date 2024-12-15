# light-loading-screen
## Introduction
![Spinner](https://crow281.github.io/light-loading-screen/image/Spinner.png)

A library providing a simple lightweight loading screen you can display while waiting for the rest of your app to finish loading.

It creates a spinner while waiting for the rest of your app to load and supports an error screen, from which you can program it to support restarting.

You can access the github project [here](https://github.com/Crow281/light-loading-screen).

## Installation

Get [@crow281/light-loading-screen from NPM](https://www.npmjs.com/package/@crow281/light-loading-screen):

```console
npm i --save @crow281/light-loading-screen
```

## Documentation

The API documentation is available [here](https://crow281.github.io/light-loading-screen/doc/api/latest/).

## Demo
The sample project is [here](https://github.com/Crow281/light-loading-screen/blob/main/sample/load-operations/).

You can view a live demo [here](https://crow281.github.io/light-loading-screen/sample/load-operations/).

## Example
Here is a quick example to show you how it can be used.

LoadingScreen provides the UI, allowing you to customize its state.

awaitPromiseFunction is a utility function to manage the logic of waiting for an operation to complete.

```typescript
import { LoadingScreen } from "@crow281/light-loading-screen";

//Create the loading screen.
const loadingScreen = new LoadingScreen();

//Customize the loading screen to have a black background via css styling.
loadingScreen.background.background = "black";

//Customize the loading screen to have a yellow spinner via css styling.
loadingScreen.spinner.color = "yellow";

/**
 * @returns
 * A promise that will attempt to load a module named "./App".
 */
function importFirstPage(): Promise<unknown> {
    return import("./App");
}

//Attempt to dynamically import the "./App" module.
//Every time it fails, user will be given the chance to try again.
awaitPromiseFunction(
    loadingScreen,
    importFirstPage
    );
```
