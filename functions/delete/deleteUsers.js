require('dotenv').config()
const post = require('axios').post

const deleteUsers = async (users) => {
	try {
		let results = []
		/* delete users, one by one. Save the result of each operation in an array */
		for (let index = 0; index < users.length; index++) {
			const { data } = await post(
				`${process.env.OKTA_API_URL}/${users[index].id}`,
				{},
				{ headers: { 'Authorization': `${process.env.OKTA_API_KEY}` }
			})
			/* an empty object {} indicates success */
			console.log(data)
			results.push(data)
		}
		console.log(results)
	} catch (error) {
		console.log(error)
	}
}

module.exports = deleteUsers