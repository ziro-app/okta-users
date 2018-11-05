require('dotenv').config()
const get = require('axios').get

const getUsers = async () => {
	try {
		let users = []
		let after = ''
		while (true) {
			/* get the link (containing the 'after' parameter) and get the users list (data) */
			const { headers: { link }, data } = await get(
				`${process.env.OKTA_API_URL}?after=${after}`,
				{ headers: { 'Authorization': `${process.env.OKTA_API_KEY}` }
			})
			/* reduce the number of fields returned by each user object */
			users.push(...data.map( user => {
				const { id, lastLogin, profile } = user
				const { firstName, lastName, login } = profile
				return { id, firstName, lastName, login, lastLogin }
			}))
			console.log(`${users.length} users fetched`)
			/* get the after parameter to allow pagination and list database fully */
			if (link)
				after = link.split('?after=').pop().split('&limit=').shift()
			/* if there is no more pagination left, break the loop */
			if (!link.includes('rel="next"'))
				break
		}
		console.log(users)
		console.log('end')
	} catch (error) {
		console.log(error)
	}
}

getUsers()