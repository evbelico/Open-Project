// @ts-check

import { regexp } from "sequelize/types/lib/operators";

type UserFuncsPayload = {
    message: string,
    returnValue: number
}

// const passwordRegex: function (params:type) {
    
// }

export const checkPasswordFormat = async (password: string) : Promise<UserFuncsPayload> =>  {
        
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (passwordRegex.test(password)) {
        return {
            message: `It works ! Password: ${password}`, returnValue: 1
        }
    } else {
        return {
            message: `IT FAILS ! Password : ${password}`, returnValue: -1
        }
    }
}