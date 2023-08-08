import { updateUser } from "./users-controller.js";

let users = [];

export const findAllUsers = () => users;

export const findUserById = (uid) => {
    const index = users.findIndex((u) => u._id === uid);
    if (index !== -1) return users[index];
    return null;
};

export const findUserByUsername = (username) => {
    const index = users.findIndex((u) => u.username === username);
    if (index !== -1) return users[index];
    return null;
};

export const findUserByCredentials = (username, password) => {
    const index = users.findIndex((u) => u.username === username && u.password === password);
    if (index !== -1) return users[index];
    return null;
};

export const createUser = (user) => {
    const newUser = {
        firstName: '',
        lastName: '',
        ...user
    }
    newUser._id = (new Date()).getTime() + '';
    // const newUser = user;
    // newUser._id = (new Date()).getTime() + '';
    // newUser.firstName = '';
    // newUser.lastName = '';
    users.push(newUser);
    console.log('users')
    console.log(users);
    return newUser;
};

export const updateUserDao = (uid, updates) => {
    const index = users.findIndex((u) => u._id === uid);
    users[index] = { ...users[index], ...updates };
    console.log(users)
    return users[index];
};

export const updateUserNoAuth = (uid, updates) => {
    updateUser(uid, updates);
};

export const deleteUser = (uid) => {
    const index = users.findIndex((u) => u._id === uid);
    users.splice(index, 1);
    return { status: 'ok' }
};