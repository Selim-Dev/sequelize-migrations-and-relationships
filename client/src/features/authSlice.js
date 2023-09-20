import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		authUser: null,
		isAuthenticated: false
	},
	reducers: {
		setAuthUser: (state, action) => {
			state.authUser = action.payload;
		},
		setIsAuthenticated(state,action){
			state.isAuthenticated = action.payload;
		}
	}
});

export const { setAuthUser ,setIsAuthenticated} = authSlice.actions;




export default authSlice.reducer;