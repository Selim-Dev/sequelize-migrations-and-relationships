// eslint-disable-next-line no-unused-vars
import React from 'react'
import axios from 'axios'
import GoogleButton from 'react-google-button'
import { useDispatch } from 'react-redux';
import { setAuthUser, setIsAuthenticated } from './features/authSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	// get user from backend from cookie
	const fetchAuthUser = async()=>{
		const url = "http://localhost:5000/api/v1/auth/user"
		const response = await axios.get(url,{
			withCredentials: true
		}).catch(()=>{
			console.log('not authenticated');
			dispatch(setIsAuthenticated(false))
			dispatch(setAuthUser(null))
			navigate('/login/error')
		})
		if(response && response.data){
			console.log('user', response.data)
			dispatch(setIsAuthenticated(true))
			dispatch(setAuthUser(response.data))
			console.log('role', response.data.role)
			if(!response?.data?.role){
				navigate('/role')
			}
			navigate('/dashboard')

		}
	}
	// redirect user to google login
	const redirectToGoogleSSo = async ()=>{
		let timer = null;
		const googleLoginUrl = "http://localhost:5000/api/v1/login/google"
		const newWindow = window.open(googleLoginUrl, "_blank","width=500,height=600","noopener,noreferrer")
		if(newWindow){
			timer = setInterval(()=>{
				if(newWindow.closed){
					// here we chaeck if he already authenticated
					console.log('yaaay authenticated')
					fetchAuthUser();
					if(timer) clearInterval(timer)
				}
			},500)
		}
	}

	return (
		<GoogleButton onClick={redirectToGoogleSSo}/>
	)
}

export default Login