# Using
1. You need npm installed
2. Make a folder for your theme and insert the script folder inside of it
3. Delete the `package.json`
3. Run `npm init` inside your themes folder and fill out everything
4. Go to `./script/manifest.js` and use at the following template inside the file (more detials look at lower in the readme.md)

# manifest.js
### Base template
```js
module.exports = { 
    name: "Theme-base",
    description: "The theme base I use",
    version: "1.0.0",
    author: ["Doggybootsy"],
    author_id: ["515780151791976453"],
    theme: "./src/compiled.css",
    license: "License",
    source: "https://github.com/doggybootsy/Theme-base",
    website: "https://doggybootsy.github.io/",
    tags: ["Basic"],
    root: {
        background: "red"
    }
};
```
### name
The Github repo name
```js
module.exports = { 
    name: "Theme-base"
};
```
### description
```js
module.exports = { 
    description: "The theme base I use"
};
```
### version
```js
module.exports = { 
    description: "1.0.0"
};
```
### author
You can add as many in the brackets 
```js
module.exports = { 
    author: ["Doggybootsy"]
};
```
### author_id
You can add as many in the brackets

This is just your discord id
```js
module.exports = { 
    author_id: ["515780151791976453"],
};
```
### theme
This is the path to the theme folder

`./` Is needed at the beginning
```js
module.exports = { 
    theme: "./src/compiled.css",
};
```
### license
```js
module.exports = { 
    license: "License Name"
};
```
### source
The github url
```js
module.exports = { 
    source: "https://github.com/doggybootsy/Theme-base"
};
```
### website
Your base github.io
```js
module.exports = { 
    website: "https://doggybootsy.github.io/"
};
```
### tags
Nothing much, used for gm
```js
module.exports = { 
    tags: [
        "Basic"
    ],
};
```
### Has_Version_warning
Adds a quick version warning into the root
```js
module.exports = { 
    Has_Version_warning: false,
};
```
### Root
Basic css root variables

Dont add `--` at the beginning its automatically given
```js
module.exports = { 
    root: {
        background: "red"
    }
};
```
### Dont add `module.exports` in each thing


# Whats the point?
It's mostly for theme developers for `Powercord`/`Vizality` so they can write/edit one file and instantly provide support for `BetterDiscord` `Powercord` `Vizality` `Stylus` using a single command