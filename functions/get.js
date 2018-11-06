const getUsersToSuspend = require('./getUsersToSuspend')
const createFile = require('./createFile')

const getUsersToSuspendAndSave = async () => {
	try {
		const usersToSuspend = await getUsersToSuspend()
		if (usersToSuspend) {
			console.log(`potentially ${usersToSuspend.length} users to suspend`)
			await createFile(usersToSuspend)
		} else {
			console.log('Error on execution, usersToSuspend is', usersToSuspend)
		}
	} catch (error) {
		console.log(error)
	}
}

getUsersToSuspendAndSave()