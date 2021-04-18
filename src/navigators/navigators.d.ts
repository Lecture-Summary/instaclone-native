export type LoggedOutNavParamList = {
  Welcome: undefined
  LogIn: { username?: string; password?: string }
  CreateAccount: undefined
}

export type LoggedInNavParamList = {
  Feed: undefined
}
