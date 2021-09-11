const users = require('../models/usersModel')
const usersJsonDAL = require('../DAL/usersJsonDal')
const permissionsJsonDAL = require('../DAL/permissionsDal')
// functions
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        users.find({}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            };
        });
    });
};
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        users.findById(id, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            };
        });
    });
};
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        users.findByIdAndDelete(id, async (err) => {
            if (err) {
                reject(err);
            } else {
                await usersJsonDAL.deleteUser(id);
                await permissionsJsonDAL.deletePermissions(id);
                resolve("deleted");
            };
        });
    });
};
const updateUser = (id, updateUser) => {
    return new Promise((resolve, reject) => {
        if (updateUser.password.length == 0) {
            users.findByIdAndUpdate(id, {
                username: updateUser.username
            }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("updated user");
                };
            });
        }
        else {
            users.findByIdAndUpdate(id, {
                username: updateUser.username,
                password: updateUser.password
            }, async (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("updated user");
                };
            });
        };
    });
};
const addUser = (user) => {
    return new Promise((resolve, reject) => {
        let newUser = new users({
            username: user.username,
            password: ""
        });
        newUser.save((err, addedUser) => {
            if (err) {
                reject(err);
            } else {
                resolve(addedUser);
            };
        });
    });
};


module.exports = { getAllUsers, getUserById, deleteUser, updateUser, addUser }