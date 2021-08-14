const manifest = require('./manifest');
const fs = require('fs');
const licenses = require('./licenses')
// log command
const log = (t, c) => {
	console[t](`\n${c}\n`)
}
// test for sass
try {require('sass')}catch (error) {log(`error`,`You didnt run \`npm i\``);process.exit()}
// Compile 
if (manifest.theme[0].endsWith('.scss') || manifest.theme[0].endsWith('.sass')) {
	// Stop script if the css file is a sass fole
	if (manifest.theme[1].endsWith('.scss') || manifest.theme[1].endsWith('.sass')) {
		log(`error`,`Your css file is a ${manifest.theme[0].split('.').pop()} file and not a css file`)
		process.exit()
	} else {
		if (fs.existsSync(manifest.theme[0])) {
			const compiled = require('sass').renderSync({
				file: manifest.theme[0],
				sourceMap: true,
				outFile: manifest.theme[1]
			}).css.toString()
			fs.writeFile(manifest.theme[1], compiled, function(err) {
				if (err) return log(`error`,err)
			});
		} 
		// Stop script if the file doesnt exist
		else {
			log(`error`,`${manifest.theme[0]} does not exist`)
			process.exit()
		}
	}
} else {
	if (manifest.theme[0].endsWith('.css')) return
    else {
		// Stop script if its not a css or sass file
		log(`warn`,`Since your raw file is a ${manifest.theme[0].split('.').pop()} file it cant be compiled\nIn the future it may be able to get compiled`)
		process.exit()
    }
}
// Root builder
function BuildRoot(spr) {
	const VersionWarning = (spr) => {
		if (manifest.Has_Version_warning === true) return `    /* Do not touch */\n    ${spr}--version-${manifest.version.replaceAll('.', '-')}: none;`
		else return ''
	}
	const root = manifest.root === undefined ? '' : Object.keys(manifest.root).map(e => `    --${e}: ${manifest.root[e]};`).join(`\n`)
	const root_ = `${spr}:root{${root == '' ? '' : `\n${spr}${root}`}${VersionWarning() == '' ? '' : `\n${spr}${VersionWarning(spr)}`}\n${spr}}`
	if (root_ == ':root{\n}') return ''
	else return root_
}
// So code doesnt repeat
const meta = {
	author: Object.keys(manifest.author).map(e => manifest.author[e]).join(' & '),
	id: Object.keys(manifest.author_id).map(e => manifest.author_id[e]).join(' & '),
	import: `@import url('${manifest.website}${manifest.source.split('/')[4]}/${manifest.theme[1].replace('./', '')}');`
};
// file templates
const theme = {
	BetterDiscord: {
		0: `./support/${manifest.name}.theme.css`,
		1: `/**\n * @name ${manifest.name}\n * @author  ${meta.author} \n * @authorId ${meta.id} \n * @version ${manifest.version} \n * @description ${manifest.description} \n * @source ${manifest.source} \n * @website ${manifest.website}\n */\n\n${meta.import}${BuildRoot('') === `` ? `` : `\n\n`}${BuildRoot('')}`
	},
	Stylus: {
		0: `./support/index.user.css`,
		1: `@-moz-document domain("discord.com") {\n    /* ==UserStyle==\n    @name           ${manifest.name} \n    @namespace      ${manifest.source}\n    @version        ${manifest.version}\n    @description    ${manifest.description}\n    @author         ${meta.author} \n    ==/UserStyle== */\n\n    ${meta.import}${BuildRoot('') === `` ? `` : `\n\n`}${BuildRoot('    ')}\n}`
	},
	Powercord: {
		0: `./powercord_manifest.json`,
		1: `{\n    "name": "${manifest.name}",\n    "description": "${manifest.description}",   \n    "version": "${manifest.version}",   \n    "author": "${meta.author}",   \n    "theme": "${manifest.theme[1]}",   \n    "license": "${manifest.license}"\n}`
	},
	Visality: {
		0: `./manifest.json`,
		1: `{\n    "name": "${manifest.name}",\n    "description": "${manifest.description}",   \n    "version": "${manifest.version}",   \n    "author": "${meta.author}",   \n    "theme": "${manifest.theme[1]}",   \n    "license": "${manifest.license}"\n}`
	}
};
// Place for bd and stylus
if (!fs.existsSync(`./support`)) fs.mkdirSync(`./support`);
Object.keys(theme).forEach(e => {
	fs.writeFile(theme[e][0], theme[e][1], function(err) {
		if (err) return log(`error`,err)
	});
})
// Generate license
if (!licenses[manifest.license.toLowerCase()]) {
	log(`error`,`${manifest.license} is not a valid license or its not added yet, all the licenses added are ${Object.keys(licenses).map(file => file).join(', ')}`)
}
else {
	fs.writeFile(`./LICENSE`, licenses[manifest.license.toLowerCase()].replace('[Username]', meta.author).replace('[yyyy]', new Date().getFullYear()), function(err) {
		if (err) return log(`error`,err)
	})
}