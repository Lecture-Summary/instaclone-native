import { ApolloClient, InMemoryCache, makeVar, split } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import {
  getMainDefinition,
  offsetLimitPagination,
} from '@apollo/client/utilities'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from '@apollo/client/link/ws'

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

const uploadHttpLink = createUploadLink({
  uri: 'http://fd1cac6e8a8a.ngrok.io/graphql',
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: () => ({
      Authorization: tokenVar(),
    }),
  },
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: tokenVar(),
    },
  }
})

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors)
  }
  if (networkError) {
    console.log('Network Error', networkError)
  }
})

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        //하단 상단 같은 동작의 코드
        seeFeed: offsetLimitPagination(),
        // seeFeed: {
        //   keyArgs: false,
        //   merge(existing = [], incoming = []) {
        //     return [...existing, ...incoming]
        //   },
        // },
      },
    },
  },
})

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLinks
)

const client = new ApolloClient({
  link: splitLink,
  cache,
})

export default client
