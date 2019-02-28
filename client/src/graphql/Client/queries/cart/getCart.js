import gql from 'graphql-tag';

const GET_CARTS = gql`
  query($commande: String) {
    cartes(where: { commande: $commande }){
    id
    quantity
    totalprice
      produit {
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
  }
`;

export default GET_CARTS;
