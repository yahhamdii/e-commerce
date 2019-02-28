import gql from 'graphql-tag';

const ADD_ONE_ITEM = gql`
  mutation createCarte($data: CarteCreateInput!) {
    createCarte(data: $data) {
      totalprice
      quantity
    }
  }
`;
export default ADD_ONE_ITEM;
