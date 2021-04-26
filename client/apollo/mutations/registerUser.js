import gql from 'graphql-tag'

const REGISTER_USER_MUTATION = gql`
  mutation registerUser {
    register(email: $email, password: $password, birthday: $birthday) {
      id
      email
      birthday
      token
      tokenExpired
    }
  }
`

export default REGISTER_USER_MUTATION
