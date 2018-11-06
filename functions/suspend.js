const suspendUsers = require('./suspendUsers')
const readFile = require('./readFile')

const suspend = async () => {
	try {
		const { usersToSuspend } = await readFile('./functions/usersToSuspend.js')
		if (usersToSuspend) {
			await suspendUsers(usersToSuspend)
		} else {
			console.log('Error on execution, usersToSuspend is', usersToSuspend)
		}
	} catch (error) {
		console.log(error)
	}
}

suspend()