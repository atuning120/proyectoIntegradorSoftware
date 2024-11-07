import { ApolloClient, InMemoryCache } from '@apollo/client';

// Cliente para ms-usuario
const userClient = new ApolloClient({
  uri: 'http://localhost:3002/usuario', 
  cache: new InMemoryCache(),
});

// Cliente para ms-producto
const productClient = new ApolloClient({
  uri: 'http://localhost:3002/producto',
  cache: new InMemoryCache(),
});

// Cliente para ms-carrito
const cartClient = new ApolloClient({
  uri: 'http://localhost:3002/carrito',
  cache: new InMemoryCache(),
});

export { userClient, cartClient, productClient };