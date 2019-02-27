import React from 'react';
import { Mutation } from 'react-apollo';
import {
  ListItem, ListItemText, Grid, Button, CardMedia, withStyles, Typography,
} from '@material-ui/core';
import styles from './CartStyle';
import DELETE_ITEM from '../../../graphql/Client/mutations/cart/deleteItem';
import ADD_ONE_ITEM from '../../../graphql/Client/mutations/cart/addItem';
import UPDATE_CARTE from '../../../graphql/Client/mutations/cart/updateCarte';

const CartItem = ({ classes, item }) => console.log('vvvvvvvv', item) || (
 
  <ListItem key={item.produit.id}>
    <Grid container spacing={24} className={classes.item}>
      <Grid item xs={3}>
        <CardMedia
          className={classes.media}
          image={item.produit.image}
          title={item.produit.name}
        />
        <ListItemText primary={<Typography className={classes.itemText} variant="h6">{item.produit.name}</Typography>} />
      </Grid>
      <Grid className={classes.info} item xs={5}>

        <Mutation mutation={UPDATE_CARTE} variables={{ id: item.produit.id }}>
          {(minusOneItem) => (
            <Button
              onClick={(e) => {
                e.preventDefault();
                minusOneItem();
              }}
              className={classes.cartBtn}
            >
            -
            </Button>
          )}
        </Mutation>

        <div className={classes.infoText}>
          <ListItemText
            className={classes.listItemText}
            primary={<Typography className={classes.itemText} variant="small">{`Quantité: ${item.quantity}`}</Typography>}
            secondary={<Typography className={classes.itemTextSecodary} variant="small">{`Prix unitaire: ${item.produit.tarif[0].prixpvc}`}</Typography>}
          />
        </div>

        <Mutation mutation={ADD_ONE_ITEM} variables={{ data: item.produit }}>
          {(addOneItem) => (
            <Button
              onClick={(e) => {
                e.preventDefault();
                addOneItem();
              }}
              className={classes.cartBtn}
            >
            +
            </Button>
          )}
        </Mutation>

      </Grid>
      <Grid item xs={3}>
        <ListItemText
          className={classes.total}
          primary={<Typography className={classes.itemText} variant="strong">{`${item.produit.tarif[0].prixpvc * item.quantity} DT`}</Typography>}
        />
      </Grid>
      <Grid item xs={1}>

        <Mutation mutation={DELETE_ITEM} variables={{ data: item }}>
          { (deleteItem) => (
            <Button
              className={classes.cartBtn}
              onClick={(e) => {
                e.preventDefault();
                deleteItem();
              }}
            > X
            </Button>
          )}
        </Mutation>

      </Grid>
    </Grid>
  </ListItem>
);

export default withStyles(styles)(CartItem);
