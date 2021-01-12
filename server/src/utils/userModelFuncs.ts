// @ts-check

import { regexp } from "sequelize/types/lib/operators";

type UserFuncsPayload = {
    message: string,
    returnValue: number
}

// const passwordRegex: function (params:type) {
    
// }

const passwordFormat = async (password: string) : Promise<UserFuncsPayload> =>  {
    // const passwordRegex: function name(params:type) {
        
    // } = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!password) {
        return {
            message: 'hello', returnValue: -1
        }
    }
    // if (passwordRegex.test(password))
}