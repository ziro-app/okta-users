const promisify = require('util').promisify
const appendFile = require('fs').appendFile
const unlink = require('fs').unlink

const append = promisify(appendFile)
const remove = promisify(unlink)

const createInactivesFile = async (inactives) => {
	try {
		/* remove any existing file named 'inactives.js' */
		await remove('inactives.js')
		/* save the inactives object to 'inactives.js' */
		await append('inactives.js', JSON.stringify({ inactives }, null, 2))
		console.log('inactives.js file created successfully')
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.log('File does not exist. Remove action failed.')
			console.log('Creating new file...')
			try {
				await append('inactives.js', JSON.stringify({ inactives }, null, 2))
				console.log('inactives.js file created successfully')
			} catch (error) {
				console.log(error)
			}
		} else {
			console.log(error)
		}
	}
}

module.exports = createInactivesFile