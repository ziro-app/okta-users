const deactivateUsers = require('./deactivateUsers')
const readFile = require('./readFile')

const deactivate = async () => {
	try {
		const { users } = await readFile('./functions/users.js')
		if (users) {
			await deactivateUsers(users)
		} else {
			console.log('Error on execution, users is', users)
		}
	} catch (error) {
		console.log(error)
	}
}

deactivate()