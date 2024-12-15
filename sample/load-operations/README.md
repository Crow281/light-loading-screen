# I18nextAutocomplete

## Introduction

This project provides a simple example of LoadingScreen in action.

You can view a live demo [here](https://crow281.github.io/light-loading-screen/sample/load-operations/).

## Setup

Open your terminal to inside the project folder and run the following:

```console
npm install
npm run build
```

## Running

Once the project is built, you can run the following command in your terminal to activate a web server with the project:

```console
npm run preview
```

You can then open your browser in the url it specifies in the terminal. For example, if it has the following output:

```console
> vite preview

  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Local is set to [http://localhost:4173/](http://localhost:4173/), which you can open inside of your web browser.

## Sample Code

The sample itself is loaded via [src/load.tsx](src/load.tsx), which uses a dynamic import to load the rest of the project.
