require('dotenv').config()
const post = require('axios').post

const suspendUsers = async (usersToSuspend) => {
	try {
		let results = []
		/* suspend users, one by one. Save the result of each operation in an array */
		for (let index = 0; index < usersToSuspend.length; index++) {
			const result = await post(
				`${process.env.OKTA_API_URL}/${usersToSuspend[index].id}/lifecycle/suspend`,
				{},
				{ headers: { 'Authorization': `${process.env.OKTA_API_KEY}` }
			})
			/* an empty object {} indicates success */
			console.log(result.data)
			results.push(result.data)
		}
		console.log(results)
	} catch (error) {
		console.log(error)
	}
}

module.exports = suspendUsers