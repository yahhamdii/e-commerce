import gql from 'graphql-tag';

const GET_PRODUCT = gql`
  query product($id: ID!){
  product(where: { id: $id }) {
      id
      name
      description
  }
}
`;

export default GET_PRODUCT;
