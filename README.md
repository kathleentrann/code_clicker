## Introduction

In 2013, a French web developer Julien "Orteil" Thiennot created a game called "[Cookie Clicker](https://orteil.dashnet.org/cookieclicker/)" that became popular and inspired a genre of games called "idle" or "incremental" games. These games involve repetitive actions to gain resources, which can be used to automate the process and make the game play itself. In this project, we will create a clone of Cookie Clicker called "Code Clicker."


## Code Clicker

Our Code Clicker clone will be code-themed. The player will click a giant coding station, incrementing a code counter showing the quantity of code lines they currently possess. Code lines can be spent to purchase code-producing to automate your code production; every second, the player will passively accumulate code line proportionate to the number and kind of code-producing devices they've purchased.

Importantly, the price (in code) of each producer will increase according to the number already in the player's possession. This is what enables the game to remain interesting even after code production has been automated: the player has to make decisions about which purchases make best use of their code depending on the current price of each producer.

In addition to a code line counter, the player will be able to see how many of each producer they possess, the current price of each producer, the CPS (code per second) of each producer, and the total CPS for all producers, combined. Finally, to make things more interesting, we won't show all of the producers at the start of the game-- they'll be unlocked successively as they player accumulates more code.

## First Steps

This assignment is set up so that as you begin to pass the tests, you'll see more functionality appear in the web page you're working on. So you'll be going back and forth between code, tests, and the final product in the browser.

The command `npm start` will start a simple web server and open up your page; you'll need to keep this server running if you want to be able to refresh the page as you work. It might help to keep multiple console windows or tabs open if you want to run the server and run the tests at the same time.

True unit tests look at blocks of code in isolation from each other. Many of the tests we've written here are not true unit tests; the code they test will sometimes need to invoke other code, tested elsewhere. That is, we're going to ask some of your functions to call others, sometimes for their return values, sometimes for their effects on the DOM, and sometimes for their effects on the data.

This means that you won't be able to pass some of the later tests until you pass earlier ones. If you get stuck, ask fellows or instructors for help. And, remember that it's okay for some functions you write to invoke other functions you've written.


## Starting Point

We've written the HTML and CSS for Code Clicker for you. You'll be working _only_ in the `scripts.js` file. We promise that all of the tests can be passed without editing anything but `script.js`!

But `script.js` isn't the only file in this project which contains Javascript; the `data.js` file, written for you, contains a large object which will serve as the data for Code Clicker. It contains two keys: `code`, whose value is an integer representing how much code the player has accumulated, and `producers`, whose value is an array of objects. Each of these objects represents a code producer, and the keys and values describe the producer's properties.

While you won't need to edit the `data.js` file, you will need to programmatically access and modify the data it contains. You might be wondering: how is it possible to access variables defined in one Javascript file in a different Javascript file?

Near the bottom of the `index.html` file you'll see two `<script>` tags; these make sure the browser loads up `data.js` and `script.js` in sequence. We set up the `data.js` file to save the data object on the browser's built-in `window` object. At the top of `script.js`, we grab the `data` key from the `window` object and make it available in `script.js`'s global scope as `data`.

We've already declared the functions being tested in `script.js`, but they don't yet do anything; it will be up to you to fill them in. You'll also see that we've pre-written a function body or two for you.

## Mocha

Mocha allows us to write and run tests-- but instead of running tests in the browser, Mocha runs them on the command line. After you clone a repository with mocha tests, you'll first need to run `npm install` to get everything set up. Then, to start the tests, run `npm test`.

Mocha will _watch_ the files in your folder and restart the tests every time you save a change.

You'll see some console output that prints the name of each test, finally letting you know that none have passed an all are pending. Now open the test file. You'll notice that the `it()` blocks defining tests are all prefaced with an `x`. This is part of Mocha's syntax-- adding and removing the `x` lets you decide to set some tests as _pending_, meaning that while their names will be printed out to the console, they won't run.

But what if you only want to run or see one or two tests? It would be tedious to have to add and remove `x`s to the entire test suite. To help you accomplish this, Mocha lets you add `.only` after `it` and `describe` to isolate particular tests. That is, to run only the tests in a particular `describe` block, use: the syntax `describe.only()`. To isolate one or more `it` blocks, use `it.only()`. This is much like clicking a test to isolate it in Testem.

## Reading Mocha Output

Mocha output in the console is divided into three pieces.

First, the names of all of the active tests which are not pending will be printed out along with checkmarks, if they pass. If colorized output is enabled, the passing tests will be green and the non-passing tests will be red.

Second, once all of the tests and their status have been printed out, you'll get a summary: e.g. "5 passing, 2 failing."

Finally, Mocha will print out the Javascript error messages from the failing specs. Most often, these will include a reference to the line number in the test file indicating an assertion or expectation which has failed.

Importantly, the output of any `console.log()` statements, whether written in the test files or your own code, will appear in the _first_ section, as this is when the code actually executes. Mocha remembers error messages and only prints them during the third, final, part of its output.

It can sometimes be useful to clear the console output periodically when running tests to allow you to more easily find the beginning of the current run.
