const jsonfile = require('jsonfile')

// function 
exports.getAllPermissions = () => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./dataSources/permissions.json', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.permissions)
            }
        })
    })
}
exports.getUserPermissions = (id) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./dataSources/permissions.json', (err, data) => {
            if (err) {
                reject(err)
            } else {
                let obj = data.permissions.filter(obj => obj.id == id)
                resolve(obj)
            }
        })
    })
}
exports.updatePermissions = (id, updatedPermissions) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./dataSources/permissions.json', (err, data) => {
            if (err) {
                reject(err)
            } else {
                let newPermission = {
                    id: id,
                    permissions: updatedPermissions.permissions
                }
                let finalPermissions = data;
                let usersPermissions = finalPermissions.permissions.map(user => {
                    if (user.id == id) {
                        return newPermission
                    } else {
                        return user
                    }
                })
                finalPermissions.permissions = usersPermissions;

                jsonfile.writeFile('./dataSources/permissions.json', finalPermissions, (err) => {
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
exports.addPermissions = (newUserPermissions) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./dataSources/permissions.json', (err, data) => {
            if (err) {
                reject(err)
            } else {
                let newPermissions = {
                    id: newUserPermissions.id,
                    permissions: newUserPermissions.permissions
                }
                let permissions = data
                permissions.permissions.push(newPermissions)
                jsonfile.writeFile('./dataSources/permissions.json', permissions, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve("added permissions")
                    }
                })

            }
        })
    })
}
exports.deletePermissions = (id) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./dataSources/permissions.json', (err, data) => {
            if (err) {
                reject(err)
            } else {
                let finalPermissions = data
                let filterdPermissions = finalPermissions.permissions.filter(permission => permission.id != id)
                finalPermissions.permissions = filterdPermissions
                jsonfile.writeFile('./dataSources/permissions.json', finalPermissions, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve("permissions deleted")
                    }
                })
            }
        })
    })
}