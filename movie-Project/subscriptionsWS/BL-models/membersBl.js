const members = require('../mongoose-models/membersModel');
const membersDAL = require('../DALs/membersDAL');


// functions

const saveMembers = async () => {
    let transferdMembers = await membersDAL.getMembers();
    transferdMembers.map((member) => {
        let newMember = new members({
            name: member.name,
            email: member.email,
            city: member.address.city
        });
        newMember.save(err => {
            if (err) { console.log(err) } else {
                return (newMember);
            };
        });
    });
};
const deleteAll = async () => {
    members.deleteMany({});
};

const getAllMembers = () => {
    return new Promise((resolve, reject) => {
        members.find({}, (err, data) => {
            if (err) {
                reject(err);
            } else { resolve(data) }
        });
    });
};
const getMemberById = (id) => {
    return new Promise((resolve, reject) => {
        members.findById(id, (err, data) => {
            if (err) {
                reject(err);
            } else { resolve(data) }
        });
    });
};
const updateMember = (id, updatedMember) => {
    return new Promise((resolve, reject) => {
        members.findByIdAndUpdate(id, {
            name: updatedMember.name,
            email: updatedMember.email,
            city: updatedMember.city
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("updated");
            };
        });
    });
};
const createMember = (newMemberToAdd) => {
    return new Promise((resolve, reject) => {
        let newMember = new members({
            name: newMemberToAdd.name,
            email: newMemberToAdd.email,
            city: newMemberToAdd.city
        });
        newMember.save(err => {
            if (err) {
                reject(err);
            } else {
                resolve(newMember);
            };
        });
    });
};
const deleteMember = (id) => {
    return new Promise((resolve, reject) => {
        members.findByIdAndDelete(id, err => {
            if (err) {
                reject(err);
            } else {
                resolve("deleted");
            };
        });

    });
};


module.exports = { saveMembers, getAllMembers, getMemberById, updateMember, createMember, deleteMember, deleteAll }
