import React from 'react';
import { Query, compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { List, Button } from '@material-ui/core';
import styles from './CartStyle';
import GET_CART from '../../../graphql/Client/queries/cart/getCart';
import CHANGE_CART_STATUS from '../../../graphql/Client/mutations/cart/changeCartStatus';
import CartItem from './CartItem';

const Cart = ({ classes, history, changeCartStatus }) => (
  <Query query={GET_CART}>
    {
      ({ data: { cartes }, loading }) => {
        if (loading) return <h1> Chargement... </h1>;
        console.log('xxxxxxxx', cartes);
        return (
          <div className={classes.cartContent}>
            <div className={classes.cartHeader}>
              <i className={`material-icons ${classes.iconShoppingCart}`}> shopping_cart </i>
              <span className={classes.totalQuantity}>{cartes[1].quantity}</span>
            </div>
            {

              cartes[1].quantity > 0 ? (
                <List className={classes.cartList}>
                  {
                    cartes.map((item) => <CartItem item={item} />)
                  }
                </List>
              ) : (
                <div className={classes.emptyCart}> Panier vide </div>
              )
            }
            <div className={classes.cartFooter}>
              <div className={classes.cartFooterTotal}>
                <div className={classes.sub}>TOTAL TTC:</div>
                <div className={classes.subPrice}>{`${cartes[0].totalprice} DT`}</div>
              </div>
              <Button
                disabled={cartes[1].produit.length === 0}
                className={classes.validateBtn}
                onClick={(e) => {
                  e.preventDefault();
                  history.push('/print');
                  changeCartStatus({ variables: { open: true } });
                }}
              >
                  Valider
              </Button>
            </div>
          </div>
        );
      }
    }
  </Query>
);
export default compose(
  graphql(CHANGE_CART_STATUS, { name: 'changeCartStatus' })
)(withStyles(styles)(withRouter(Cart)));
