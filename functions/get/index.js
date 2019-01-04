const getUsers = require('./getUsers')
const createFile = require('./createFile')

const getUsersAndSaveToFile = async () => {
	try {
		const users = await getUsers()
		if (users) {
			console.log(`potentially ${users.length} users to suspend/deactivate/delete`)
			await createFile(users)
		} else {
			console.log('Error on execution, users is', users)
		}
	} catch (error) {
		console.log(error)
	}
}

getUsersAndSaveToFile()