const validateUser = (req, res, next) => {
    // Gets complete current url
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // Extract the userid out of the url
    const desiredUser = fullUrl.split("/")?.pop();
    // If the user in the url is the same as the one in session, then call the next middleware
    if(desiredUser === req.session.user_id.toString()){
        next();
    }else{
        res.redirect('/');
    }
    };
    
    module.exports = validateUser;