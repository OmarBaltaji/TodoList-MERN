import { ApolloClient, InMemoryCache } from '@apollo/client';

export default new ApolloClient({
    uri: (process.env.REACT_APP_BASE_URL ?? 'http://localhost:5000') +  '/graphql',
    cache: new InMemoryCache(),
});
