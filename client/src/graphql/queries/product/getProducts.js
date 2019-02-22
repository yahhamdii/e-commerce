import gql from 'graphql-tag';

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      description
      image{
        id
        url
      }
      category{
        id
        libelle
      }
    }
  }
`;

export default GET_PRODUCTS;
