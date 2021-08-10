const manifest = require('./manifest');
const fs = require('fs');
function VersionWarning(spr) {
	if (manifest.Has_Version_warning === true) {
		return `    /* Do not touch */\n    ${spr}--version-${manifest.version.replaceAll('.', '-')}: none;`
	} else {
		return ''
	}
}
function Root() {
	return manifest.root === undefined ? '' : Object.keys(manifest.root).map(e => `    --${e}: ${manifest.root[e]};`).join(`\n`)
}
function BuildRoot(spr) {
	const root_ = `${spr}:root{${Root() == '' ? '' : `\n`}${spr}${Root()}${VersionWarning() == '' ? '' : `\n`}${spr}${VersionWarning(spr)}\n${spr}}`
	if (root_ == ':root{\n}') 
		return ''
	else
		return root_
}
const meta = {
	author: Object.keys(manifest.author).map(e => manifest.author[e]).join(' & '),
	id: Object.keys(manifest.author_id).map(e => manifest.author_id[e]).join(' & '),
	import: `@import url('${manifest.website}${manifest.name}/${manifest.theme.replace('./', '')}');`
};
const theme = {
	BetterDiscord: {
		0: `./support/${manifest.name}.theme.css`,
		1: `/**\n * @name ${manifest.name}\n * @author  ${meta.author} \n * @authorId ${meta.id} \n * @version ${manifest.version} \n * @description ${manifest.description} \n * @source ${manifest.source} \n * @website ${manifest.website}\n */\n\n${meta.import}${BuildRoot('') === `` ? `` : `\n\n`}${BuildRoot('')}`
	},
	Stylus: {
		0: `./support/index.user.css`,
		1: `@-moz-document domain("discord.com") {\n    /* ==UserStyle==\n    @name           ${meta.author} \n    @namespace      ${manifest.source}\n    @version        ${manifest.version}\n    @description    ${manifest.description}\n    @author         ${Object.keys(manifest.author).map(e => manifest.author[e]).join(' ')} \n    ==/UserStyle== */\n\n    ${meta.import}${BuildRoot('') === `` ? `` : `\n\n`}${BuildRoot('    ')}\n}`
	},
	Powercord: {
		0: `./powercord_manifest.json`,
		1: `{\n    "name": "${manifest.name}",\n    "description": "${manifest.description}",   \n    "version": "${manifest.version}",   \n    "author": "${meta.author}",   \n    "theme": "${manifest.theme}",   \n    "license": "${manifest.license}"\n}`
	},
	Visality: {
		0: `./manifest.json`,
		1: `{\n    "name": "${manifest.name}",\n    "description": "${manifest.description}",   \n    "version": "${manifest.version}",   \n    "author": "${meta.author}",   \n    "theme": "${manifest.theme}",   \n    "license": "${manifest.license}"\n}`
	}
};
if (!fs.existsSync(`./support`)) fs.mkdirSync(`./support`);
Object.keys(theme).forEach(e => {
	fs.writeFile(theme[e][0], theme[e][1], function(err) {
		if (err) return console.log(err)
	});
})