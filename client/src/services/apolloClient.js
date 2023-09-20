
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createHttpLink } from '@apollo/client/link/http'

const link = createHttpLink({
	uri: 'http://localhost:5000/graphql',
	credentials: 'include'
})

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link
});
	
export default client