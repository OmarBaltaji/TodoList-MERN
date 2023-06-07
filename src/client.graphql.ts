import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';


const httpLink = createHttpLink({
    uri: (process.env.REACT_APP_BASE_URL ?? 'http://localhost:5000') +  '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const access_token = Cookies.get('access_token');

    return {
      headers: {
        ...headers,
        authorization: access_token ? `Bearer ${access_token}` : "",
      }
    }
  });

export default new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
