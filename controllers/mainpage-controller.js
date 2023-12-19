
exports.gethomePage = (req, res, next) => {
    res.sendFile('signup.html',{ root: 'views'});
}

exports.geterrorPage = (req, res, next) => {
    res.sendFile('notFound.html', {root: 'views'});
}