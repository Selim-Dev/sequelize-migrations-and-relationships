// eslint-disable-next-line no-unused-vars
import React from 'react'
import {  useSelector } from 'react-redux'
import { gql, useQuery } from '@apollo/client'

export const GET_BOOKS = gql`
query Books {
  books {
    title
    author
  }
}
`

const Dashboard = () => {
	const user = useSelector(state => state.auth.authUser);
	const {errors, data, loading} = useQuery(GET_BOOKS);
	
	if(loading) return <div>Loading...</div>
	if(errors) return <div>Error...</div>
	console.log("🚀 ~ file: Dashboard.jsx:18 ~ Dashboard ~ data:", data)
	return (
		<>
			<div>Welcome: {user?.fullName}</div>
		</>
	)
}

export default Dashboard