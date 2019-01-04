const deleteUsers = require('./deleteUsers')
const readFile = require('./readFile')

const remove = async () => {
	try {
		const { users } = await readFile('./functions/users.js')
		if (users) {
			await deleteUsers(users)
		} else {
			console.log('Error on execution, users is', users)
		}
	} catch (error) {
		console.log(error)
	}
}

remove()