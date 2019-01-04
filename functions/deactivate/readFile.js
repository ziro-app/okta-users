const promisify = require('util').promisify
const readFileContents = require('fs').readFile
/* make filesystem functions support promises instead of callbacks */
const read = promisify(readFileContents)

const readFile = async (file) => {
	try { return JSON.parse(await read(file)) }
	catch (error) { console.log(error) }
}

module.exports = readFile