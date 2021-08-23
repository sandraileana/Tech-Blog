const validatePostAccess = (req, res, next) => {
    // Get current url
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // Gets url part that has the userid and the postid
    // /id=<id>&post=<id>
    const desiredAccess = fullUrl.split("/")?.pop();
    // Get text between the strings "id=" and "&"
    const userID = desiredAccess.match(/(?<=id=)(.*)(?=&)/)[0];
    // If the user in the url and the one in session are the same, proceed to next middleware
    if(userID === req.session.user_id.toString()){
        next();
    }else{
        res.redirect('/');
    }
    };
    
    module.exports = validatePostAccess;