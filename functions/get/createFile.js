const promisify = require('util').promisify
const appendFile = require('fs').appendFile
const unlink = require('fs').unlink
/* make filesystem functions support promises instead of callbacks */
const append = promisify(appendFile)
const remove = promisify(unlink)

const createFile = async (users) => {
	try {
		/* remove any existing file named 'users.js' */
		await remove('./functions/users.js')
		/* save the users object to 'users.js' */
		await append('./functions/users.js', JSON.stringify({ users }, null, 2))
		console.log('users.js file created successfully')
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.log('File does not exist. Remove action failed.')
			console.log('Creating new file...')
			try {
				/* save contents to file */
				await append('./functions/users.js', JSON.stringify({ users }, null, 2))
				console.log('users.js file created successfully')
			} catch (error) {
				console.log(error)
			}
		} else {
			console.log(error)
		}
	}
}

module.exports = createFile