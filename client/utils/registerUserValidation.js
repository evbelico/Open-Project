export const registerUserInputValidation = (
  email,
  password,
  passwordConf,
  birthdate
) => {
  let result = ['', -1]

  if (
    email !== '' &&
    password !== '' &&
    passwordConf !== '' &&
    birthdate !== ''
  ) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
      password
    )
    if (emailRegex === false) {
      result = ['Email must be valid', -1]
    }
    if (passwordRegex === false) {
      return
    }
  } else {
    result = ['Empty fields.', 0]
  }
  return result
}
