import bcrypt from 'bcryptjs'
import db from "../models";

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
                    raw: true
                })
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password)
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


module.exports = {
    checkUserEmail,
    handleUserLogin
}