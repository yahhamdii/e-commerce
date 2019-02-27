import gql from 'graphql-tag';

const UPDATE_CARTE = gql`
  mutation updateCarte($data: CarteUpdateInput!, $id: ID!) {
    updateCarte(data: $data, where: { id: $id }) {
      unitprice
      totalprice
      quantity
    }
  }
`;
export default UPDATE_CARTE;
