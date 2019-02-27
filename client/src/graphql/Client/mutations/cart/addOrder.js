import gql from 'graphql-tag';

const ADD_ORDER = gql`
  mutation createOrder($data: OrderCreateInput!) {
    createOrder(data: $data) {
      id
    }
  }
`;
export default ADD_ORDER;
