import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { List, Button } from '@material-ui/core';
import styles from './CartStyle';
import GET_CART from '../../../graphql/Client/queries/cart/getCart';
import CartItem from './CartItem';

const Cart = ({ classes, history, changeCartStatus }) => (
  <Query query={GET_CART} variables={{ commande: localStorage.getItem('uuidorder') }}>
    {
      ({ data: { cartes }, loading }) => {
        if (loading) return <h1> Chargement... </h1>;
        return (
          <div className={classes.cartContent}>
            <div className={classes.cartHeader}>
              <i className={`material-icons ${classes.iconShoppingCart}`}> shopping_cart </i>
              <span className={classes.totalQuantity}>{cartes.length}</span>
            </div>
            {

              cartes.length > 0 ? (
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
                <div className={classes.subPrice}>{`${cartes.totalprice} DT`}</div>
              </div>
              <Button
                disabled={cartes.length === 0}
                className={classes.validateBtn}
                onClick={(e) => {
                  e.preventDefault();
                  history.push('/print');
                  changeCartStatus({ variables: { open: true } });
                }}
                Valider
              />
            </div>
          </div>
        );
      }
    }
  </Query>
);
export default withStyles(styles)(withRouter(Cart));
