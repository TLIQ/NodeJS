exports.getChat = (req, res, next) => {
    if (!req.session.login) {
        res.redirect('/auth/signin/')
    } else {
        res.render('chat', {});
    }
}