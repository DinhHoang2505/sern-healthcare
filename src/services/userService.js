import bcrypt from 'bcryptjs'
import db from "../models";

const salt = bcrypt.genSaltSync(10);

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email)
            if (isExist) {
                // user already exists
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email },
                })
                if (user) {
                    //compare password
                    let check = bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `OK`
                        delete user.password;
                        userData.userInfo = user;
                    } else {
                        userData.errCode = 2;
                        userData.errMessage = `Wrong password!`
                    }
                }

                resolve(userData);

            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in our system. Please try again!`
                resolve(userData)
            }

        } catch (error) {
            reject(error);
        }
    })
}

const checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { email } })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}

const getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === "All") {
                users = await db.User.findAll({
                    attributes: {
                        exclude:
                            [
                                "password",
                            ]
                    },
                })
            }

            if (userId && userId !== "All") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude:
                            [
                                "password",
                            ]
                    },
                })
            }
            resolve(users)
        } catch (error) {
            console.log(error);
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

const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmailExist = await checkUserEmail(data.email)
            if (checkEmailExist === true) {
                resolve({
                    errCode: 1,
                    message: "Email already existing",
                })
            } else {
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
                resolve({
                    errCode: 0.,
                    message: 'OK'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

const deleteUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                user.destroy()
                resolve()
            }
            
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    checkUserEmail,
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser
}