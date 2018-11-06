const getInactiveUsers = require('./functions/getInactiveUsers')

const getInactiveUsersAndSuspend = async () => {
	try {
		const inactive = await getInactiveUsers()
		console.log(inactive)
	} catch (error) {
		console.log(error)
	}
}

getInactiveUsersAndSuspend()