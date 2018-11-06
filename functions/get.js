const getUsersToSuspend = require('./getUsersToSuspend')
const createFile = require('./createFile')

const getUsersToSuspendAndSave = async () => {
	try {
		const usersToSuspend = await getUsersToSuspend()
		await createFile(usersToSuspend)
	} catch (error) {
		console.log(error)
	}
}

getUsersToSuspendAndSave()