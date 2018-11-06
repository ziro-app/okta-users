const getInactiveUsers = require('./functions/getInactiveUsers')
const createInactivesFile = require('./functions/createInactivesFile')

const getInactiveUsersAndSuspend = async () => {
	try {
		const inactives = await getInactiveUsers()
		await createInactivesFile(inactives)
	} catch (error) {
		console.log(error)
	}
}

getInactiveUsersAndSuspend()