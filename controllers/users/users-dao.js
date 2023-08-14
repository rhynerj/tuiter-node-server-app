// import { updateUser } from "./users-controller.js";
import usersModel from "./users-model.js";

// let users = [];

export const findAllUsers = () =>
    // users;
    usersModel.find();

export const findUserById = (id) =>
    // const index = users.findIndex((u) => u._id === uid);
    // if (index !== -1) return users[index];
    // return null;
    usersModel.findById(id);

export const findUserByUsername = (username) =>
    // const index = users.findIndex((u) => u.username === username);
    // if (index !== -1) return users[index];
    // return null;
    usersModel.findOne({ username });

export const findUserByCredentials = (username, password) =>
    // const index = users.findIndex((u) => u.username === username && u.password === password);
    // if (index !== -1) return users[index];
    // return null;
    usersModel.findOne({ username, password });

export const createUser = (user) =>
    // const newUser = {
    //     firstName: '',
    //     lastName: '',
    //     ...user
    // }
    // newUser._id = (new Date()).getTime() + '';
    // // const newUser = user;
    // // newUser._id = (new Date()).getTime() + '';
    // // newUser.firstName = '';
    // // newUser.lastName = '';
    // users.push(newUser);
    // return newUser;
    usersModel.create(user);

// export const updateUserDao = (uid, updates) => {
//     const index = users.findIndex((u) => u._id === uid);
//     users[index] = { ...users[index], ...updates };
//     return users[index];
// };

// export const updateUserNoAuth = (uid, updates) => {
//     updateUser(uid, updates);
// };

export const updateUser = (id, user) =>
    usersModel.updateOne({ _id: id }, { $set: user });

export const deleteUser = (id) =>
    // const index = users.findIndex((u) => u._id === uid);
    // users.splice(index, 1);
    // return { status: 'ok' }
    usersModel.deleteOne({ _id: id });