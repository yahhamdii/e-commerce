import React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import {
  withStyles, Card, CardActionArea, CardActions,
  CardContent, CardMedia, Button, Typography, Tooltip,
} from '@material-ui/core';
import styles from './HomeStyle';
import ADD_ONE_ITEM from '../../../graphql/Client/mutations/cart/addItem';


const ProductList = ({ classes, product }) => (
  <Card className={classes.card}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image={product.image[0].url}
        title={product.name}
      >
        <Tooltip title="Ajouter au panier" placement="top-end">
          <Mutation mutation={ADD_ONE_ITEM}>
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
