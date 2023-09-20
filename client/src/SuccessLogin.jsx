import React from 'react'
import { useEffect } from 'react'

const SuccessLogin = () => {
	useEffect(()=>{
		setTimeout(()=>{
			window.close()
		},1000)
	},[])
	return (
		<>
			<div>please choose role</div>
			<select>
				<option value="developer">developer</option>
				<option value="designer">designer</option>
			</select>
		</>
	)
}

export default SuccessLogin