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
      tarif{
        prixht
        prixpvc
      }
      stock{
        stockuc
      }
    }
  }
`;

export default GET_PRODUCTS;
