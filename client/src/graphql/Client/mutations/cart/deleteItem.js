import gql from 'graphql-tag';

const DELETE_ITEM = gql`
  mutation deleteCarte($id: ID!) {
    deleteCarte(where: { id: $id }) {
      
        totalprice
    
    }
  }
`;
export default DELETE_ITEM;
