<p align="center">
<br/>
<img src="https://imagedelivery.net/Dr98IMl5gQ9tPkFM5JRcng/3f122976-1740-4118-e824-001f99f55c00/public" width="320"/>
<br/>
</p>

# Indigo Sample Code Base

**IMPORTANT: This branch is for the front-end sample code base.**

**IMPORTANT: Front-end code base should be located in a sub-directory under the root directory. This is just a sample code base for front-end so we do not make separate folder for that.**

**NOTE:** This is a sample code base! It is NOT intended to be used in production. We are going to create a production code base soon. So please do not make any real progress in this code base because it may be deleted in the future.

This is a sample code base powered by [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), [Material UI](https://mui.com/), and [Eslint](https://eslint.org).

Here are some instructions for you to install it locally, test it, and play with it.

## Prerequisites

You need `node.js` to power the JavaScript and package management system. You can install it at [Node.js](https://nodejs.org/en/).

After installing, use your terminal to run the following command to check if both `node` and `npm`(come with `node`) are installed.

```bash
node -v
npm -v
```

You should get their versions from these commands.

You also need a [Git](https://git-scm.com/) client to work with our repository. I believe that you should have it installed already.

## Get Started

### 1. Get the code

First, you need to clone this repository to your local machine.

After cloning, you can run the following command to switch to the `indigo-sample-code-base` branch.

```bash
git checkout indigo-sample-code-base
```
> Document for this command: https://git-scm.com/docs/git-checkout

### 2. Install dependencies

Then, using the following command, you can install all dependencies in your local machine.

```bash
npm install
```

### 3. Run the app

After installing everything, you are good to go! You can run the app by running the following command.

```bash
npm run dev
```

Next, open [http://localhost:3000](http://localhost:3000) with your browser to see the result!

### 4. Edit the code

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [React Documentation](https://reactjs.org/docs/getting-started.html) - get familiar with React because `Next.js` is built upon React.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You do not need to read them all though. An efficient way is to check them when you need to.

Especially for TailwindCSS, you can just search keywords when you want to make something and don't know what to do! It saves your time on reading all of them
 and you can still get familiar with it quickly!

## Code Standardization

We are using Google's formatting rule by extending their Eslint configuration. There are several rules that you must know before getting started:

* Indentation: 2 spaces.
* JsDoc: required.
  > Documentations for classes, functions, and more are required per Google's rule.
* Quotes: single quotes.
* Semicolons: required.
* Trailing spaces: no trailing spaces allowed.

To check all your issues, you can use the following command, or there should be eslint error in your IDE (e.g. WebStorm).

```bash
npm run lint
```

Then, you can fix **all** these issues by using the following command:

```bash
npm run lint -- --fix
```

**But be careful! You may change other's working files if you fix all files automatically.**

So, to fix the issue in **a specific file**, use the following command: (replace the `[file_path]` to a relative path to your file, e.g. `./pages/index.js`).

```bash
npm run lint -- --fix --file [file_path]
```

Just follow the guide, and you are all set!

## Play with it

You can now change the files in the `pages` directory, save it, and the preview (http://localhost:3000/) should be updated automatically.
