import gql from 'graphql-tag';

const GET_PRODUCT = gql`
  query product($id: ID!){
  product(where: { id: $id }) {
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

export default GET_PRODUCT;
