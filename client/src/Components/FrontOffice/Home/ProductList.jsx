import React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import {
  withStyles, Card, CardActionArea, CardActions,
  CardContent, CardMedia, Button, Typography, Tooltip,
} from '@material-ui/core';
import uuidv1 from 'uuid';
import styles from './HomeStyle';
import ADD_ONE_ITEM from '../../../graphql/Client/mutations/cart/addItem';
import GET_CART from '../../../graphql/Client/queries/cart/getCart';

const ProductList = ({ classes, product }) => (
  <Card className={classes.card}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image={product.image[0].url}
        title={product.name}
      >
        {
          !localStorage.getItem('uuidorder') && (
            localStorage.setItem('uuidorder', uuidv1())
          )
        }
        <Tooltip title="Ajouter au panier" placement="top-end">
          <Mutation mutation={ADD_ONE_ITEM} refetchQueries={[{ query: GET_CART, variables: { commande: localStorage.getItem('uuidorder') } }]}>
            {(createCarte) => (
              <Button
                size="small"
                disabled={product.stock[0].stockuc <= 0}
                className={classes.addShoppingCart}
                onClick={(e) => {
                  e.preventDefault();
                  createCarte({
                    variables: {
                      data: {
                        unitprice: product.tarif[0].prixpvc,
                        totalprice: product.tarif[0].prixpvc,
                        quantity: 1,
                        produit: { connect: { id: product.id } },
                        commande: localStorage.getItem('uuidorder'),
                      },
                    },
                  });
                }
                }
              >
                <i className="material-icons"> add_shopping_cart </i>
              </Button>
            )}
          </Mutation>
        </Tooltip>
      </CardMedia>
    </CardActionArea>
    <CardContent className={classes.info}>
      <Typography gutterBottom variant="h5" component="h2">
        { product.name }
      </Typography>
      <Typography component="small">
        { `${product.tarif[0].prixpvc} dt` }
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary">
        <Link to={`/product/${product.id}`}>Détails</Link>
      </Button>
    </CardActions>
  </Card>
);

export default withStyles(styles)(ProductList);
