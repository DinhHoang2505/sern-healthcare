import bcrypt from 'bcryptjs'
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
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

export default {
    createNewUser,
    hashUserPasswords
}