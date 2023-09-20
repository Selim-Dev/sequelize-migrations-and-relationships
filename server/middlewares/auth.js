exports.isUserAuthenticated = (req,res,next)=>{
	if(req.user){
		next();
	}else{
		return res.status(401).json('You must be logged in')
	}
}