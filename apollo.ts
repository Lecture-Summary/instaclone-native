import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const isLoggedInVar = makeVar(false)
export const tokenVar = makeVar('')

const TOKEN = 'token'

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token)
  isLoggedInVar(true)
  tokenVar(token)
}

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN)
  isLoggedInVar(false)
  tokenVar('')
}

const httpLink = createHttpLink({
  uri: 'http://e2c2a3688868.ngrok.io/graphql',
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: tokenVar(),
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
