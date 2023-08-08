import * as usersDao from './users-dao.js';
// var currUser;

const AuthController = (app) => {
    const register = async (req, res) => {
        const username = req.body.username;
        const user = await usersDao.findUserByUsername(username);
        if (user) {
            res.sendStatus(409);
            return;
        }
        const newUser = await usersDao.createUser(req.body);

        console.log('req body')
        console.log(req.body)
        console.log('new user')
        console.log(newUser)
        console.log('reg session')
        console.log(req.session.id)

        req.session["currentUser"] = newUser;
        // currUser = newUser;

        console.log('current user')
        console.log(req.session["currentUser"])

        res.json(newUser);
    };
    const login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = usersDao.findUserByCredentials(username, password);

        if (user) {
            req.session["currentUser"] = user;
            // currUser = user;

            console.log('user')
            console.log(user)

            console.log('current user')
            console.log(req.session['currentUser'])

            res.json(user);
        } else {
            res.sendStatus(404);
        }
    };
    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        // const currentUser = currUser;

        console.log('profile session')
        console.log(req.session.id)

        console.log('current user profile')
        console.log(currentUser)

        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        res.json(currentUser);
    };
    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    const update = (req, res) => {
        console.log('update')
        const uid = req.params.uid;
        console.log(uid)
        const updates = req.body;
        const currentUser = req.session["currentUser"];
        // const currentUser = currUser;
        console.log(currentUser)
        if (currentUser) {
            if (currentUser._id !== uid) {
                res.sendStatus(409);
                return;
            }
            const updatedUser = usersDao.updateUserDao(uid, updates);
            req.session["currentUser"] = updatedUser;
            // currUser = updatedUser;
            res.json(updatedUser);
        } else {
            usersDao.updateUserNoAuth(uid, updates);
            res.sendStatus(200);
        }
    };
    app.post('/api/users/register', register);
    app.post('/api/users/login', login);
    app.post('/api/users/profile', profile);
    app.post('/api/users/logout', logout);
    app.put('/api/users/:uid', update);
};

export default AuthController