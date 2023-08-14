import * as usersDao from './users-dao.js';
// var currUser;

const AuthController = (app) => {

    const register = async (req, res) => {
        // const username = req.body.username;
        // const user = await usersDao.findUserByUsername(username);
        // if (user) {
        //     res.sendStatus(409);
        //     return;
        // }
        // const newUser = await usersDao.createUser(req.body);

        // req.session["currentUser"] = newUser;
        // // currUser = newUser;

        // res.json(newUser);
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) {
            res.sendStatus(403);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        req.session["currentUser"] = newUser;
        res.json(newUser);
    };

    const login = async (req, res) => {
        // const username = req.body.username;
        // const password = req.body.password;
        // const user = usersDao.findUserByCredentials(username, password);

        // if (user) {
        //     req.session["currentUser"] = user;
        //     // currUser = user;

        //     res.json(user);
        // } else {
        //     res.sendStatus(404);
        // }
        const username = req.body.username;
        const password = req.body.password;

        if (username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            if (user) {
                req.session["currentUser"] = user;
                res.json(user);
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    };

    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        // const currentUser = currUser;

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
        const uid = req.params.uid;
        const updates = req.body;
        const currentUser = req.session["currentUser"];
        // const currentUser = currUser;

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
    // app.put('/api/users/:uid', update);
};

export default AuthController