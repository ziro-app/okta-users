require('dotenv').config()
const get = require('axios').get

const getInactiveUsers = async () => {
	try {
		let users = []
		let after = ''
		while (true) {
			/* get the 'after' parameter from link and the users list from data */
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
			/* get the 'after' parameter to allow pagination and access the whole database */
			if (link)
				after = link.split('?after=').pop().split('&limit=').shift()
			/* if there is no more pages left, break the loop */
			if (!link.includes('rel="next"'))
				break
		}
		console.log('finished fetching users')
		/* return the users that didn't login over the past 5 months */
		return users.filter( ({ lastLogin }) => lastLogin < '2018-06-01' )
	} catch (error) {
		console.log(error)
	}
}

module.exports = getInactiveUsers