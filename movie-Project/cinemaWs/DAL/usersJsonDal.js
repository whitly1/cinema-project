
const jsonfile = require('jsonfile');
// functions
// get all users
exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./dataSources/users.json', (err, obj) => {
            if (err) {
                reject(err)
            } else {
                resolve(obj.users)
            }
        })
    })
}

// get specific user

exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./dataSources/users.json', (err, obj) => {
            if (err) {
                reject(err)
            } else {
                let user = obj.users.filter(user => user.id == id);
                resolve(user)
            }
        })
    })

}

// update user

exports.updateUser = (userId, updatedUser) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./dataSources/users.json', (err, obj) => {
            if (err) {
                reject(err)
            } else {
                let newUser = {
                    id: userId,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    createdData: updatedUser.createdData,
                    sessionTimeOut: updatedUser.sessionTimeOut
                }
                let finalUsers = obj
                let updatedUsers = finalUsers.users.map(user => {
                    if (user.id == userId) {
                        return newUser
                    } else {
                        return user
                    }
                })
                finalUsers.users = updatedUsers
                jsonfile.writeFile('./dataSources/users.json', finalUsers, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve("updated")
                    }
                })
            }
        })
    })
}

// add user

exports.addUser = (newUser) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./dataSources/users.json', (err, obj) => {
            if (err) {
                reject(err)
            } else {
                let user = {
                    id: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    createdData: newUser.createdData,
                    sessionTimeOut: newUser.sessionTimeOut
                }
                let finalUsers = obj
                finalUsers.users.push(user)
                jsonfile.writeFile('./dataSources/users.json', finalUsers, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve("added new user")
                    }
                })
            }
        })
    })
}

// delete user

exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./dataSources/users.json', (err, obj) => {
            if (err) {
                reject(err)
            } else {
                let finalUsers = obj
                let filterdUsers = finalUsers.users.filter(user => user.id != id)
                finalUsers.users = filterdUsers
                jsonfile.writeFile('./dataSources/users.json', finalUsers, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve("deleted user")
                    }
                })
            }
        })
    })
}