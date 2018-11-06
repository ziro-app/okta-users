const promisify = require('util').promisify
const appendFile = require('fs').appendFile
const unlink = require('fs').unlink
/* make filesystem functions support promises instead of callbacks */
const append = promisify(appendFile)
const remove = promisify(unlink)

const createFile = async (usersToSuspend) => {
	try {
		/* remove any existing file named 'usersToSuspend.js' */
		await remove('./functions/usersToSuspend.js')
		/* save the usersToSuspend object to 'usersToSuspend.js' */
		await append('./functions/usersToSuspend.js', JSON.stringify({ usersToSuspend }, null, 2))
		console.log('usersToSuspend.js file created successfully')
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.log('File does not exist. Remove action failed.')
			console.log('Creating new file...')
			try {
				await append('./functions/usersToSuspend.js', JSON.stringify({ usersToSuspend }, null, 2))
				console.log('usersToSuspend.js file created successfully')
			} catch (error) {
				console.log(error)
			}
		} else {
			console.log(error)
		}
	}
}

module.exports = createFile