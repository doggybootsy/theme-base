# Usage
Look at the usage file

# Using
1. You need npm installed
2. add your code to the theme-base folder
3. Run `npm i`
4. Go to `./script/manifest.js` and use at the following template inside the file (more detials look at lower in the readme.md)
5. Do `node .` and it will generate the files

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
Themes name
```js
module.exports = { 
    name: "Theme-base"
};
```
### description
Themes description
```js
module.exports = { 
    description: "The theme base I use"
};
```
### version
Themes version
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

`0: ` Is the raw file (This tool compiles `sass`/`scss` this can be a `css` file)
`1: ` Is the location for the `css` (And the location to compile the `sass`/`scss`)
```js
module.exports = { 
    theme: {
        0: "./src/index.scss",
        1: "./src/compiled.css"
    }
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