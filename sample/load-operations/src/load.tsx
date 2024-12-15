import {
    LoadingScreen,
    awaitPromiseFunction,
} from "@crow281/light-loading-screen";

//Create the loading screen UI.
const loadingScreen = new LoadingScreen();

const promiseFunction = (): Promise<unknown> => {
    return import("./main.tsx");
};

//Activate loading screen and make it wait till
//mainScript fires the load or error event.
awaitPromiseFunction(loadingScreen, promiseFunction);
