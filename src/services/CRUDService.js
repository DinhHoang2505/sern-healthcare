import bcrypt from 'bcryptjs'
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);

const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPasswords(data.password)
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                password: hashPasswordFromBcrypt,
                gender: data.gender === '1' ? true : false,
                email: data.email,
                phoneNumber: data.phoneNumber,
                address: data.address,
                roleId: data.roleId,
            })
            resolve("Create new user successfully!!!")
        } catch (e) {
            reject(e);
        }

    })
}

const hashUserPasswords = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error);
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({ raw: true })
            resolve(users)
        } catch (error) {
            reject(error);
        }
    })
}

const getUserInfoById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user)
            } else {
                resolve(null)
            }
        } catch (error) {
            reject(error);
        }
    })
}

const updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUserInfo = await db.User.findOne({
                where: { id: data.id },
            })
            if (dataUserInfo) {
                dataUserInfo.firstName = data.firstName;
                dataUserInfo.lastName = data.lastName;
                dataUserInfo.address = data.address;
                await db.User.update({ ...dataUserInfo }, { where: { id: data.id } })
                let allUSers = await db.User.findAll()
                resolve(allUSers)
            } else {
                let allUSers = await db.User.findAll()
                resolve(allUSers)
            }
        } catch (error) {
            reject(error);
        }
    })
}

const deleteUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userDelete = await db.User.findOne({
                where: { id: userId },
            })

            if (userDelete) {
                await db.User.destroy({
                    where: { id: userId },
                })
                resolve()
            }
        } catch (error) {
            reject(error);
        }
    })
}

export default {
    createNewUser,
    hashUserPasswords,
    getAllUser,
    getUserInfoById,
    updateUserData,
    deleteUserInfoById
}