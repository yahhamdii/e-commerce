import React from 'react';
import PropTypes from 'prop-types';
import {
  compose, graphql, Query, Mutation,
} from 'react-apollo';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import {
  withStyles, AppBar, Toolbar, IconButton, Typography,
  Badge, Link,
} from '@material-ui/core';
import Mouse from '@material-ui/icons/Mouse';
import styles from './navbarStyle';
import GET_CART from '../../../graphql/Client/queries/cart/getCart';
import CHANGE_CART_STATUS from '../../../graphql/Client/mutations/cart/changeCartStatus';
import GET_NETWORK_STATUS from '../../../graphql/Client/queries/user/getNetworkStatus';
import UPDATE_NETWORK_STATUS from '../../../graphql/Client/mutations/user/udpdateNetworkState';
import NoconnectedMenu from './NoConnectedMenu';
import ConnectedMenu from './ConnectedMenu';
import DrawerMenu from './DrawerMenu';
import TopBar from './TopBanner';
import FloatCart from '../../FrontOffice/Cart/FloatCart';

const Navbar = ({ classes, networkStatus: { networkStatus } }) => (
  <div>
    <TopBar />
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        {networkStatus.role === 'admin' && (
          <DrawerMenu />
        )}
        <Link component={RouterLink} style={{ textDecoration: 'none' }} color="inherit" variant="h1" to="/">
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            <Mouse />
            {networkStatus.role === 'admin' && <small>Admin</small>}
          </Typography>
        </Link>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          {!networkStatus.isConnected && (
            <>
            </>
          )}
        </div>
        <Query query={GET_CART} variables={{ commande: localStorage.getItem('uuidorder') }}>
          {
            ({ data: { cartes } }) => (
              <Mutation mutation={CHANGE_CART_STATUS} variables={{ open: false }}>
                {
                  (changeCartStatus) => (
                    <IconButton
                      color="inherit"
                      onClick={(e) => {
                        e.preventDefault();
                        changeCartStatus();
                      }}
                    >
                      <Badge badgeContent={cartes.length} color="secondary">
                        <i className="material-icons"> shopping_cart</i>
                      </Badge>
                    </IconButton>
                  )
                }
              </Mutation>
            )
          }
        </Query>
        {networkStatus.isConnected ? (
          <ConnectedMenu />
        ) : (
          <NoconnectedMenu />
        )}
      </Toolbar>
      <FloatCart />
    </AppBar>
  </div>
);

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  graphql(UPDATE_NETWORK_STATUS, { name: 'updateNeworkStatus' }),
  graphql(
    GET_NETWORK_STATUS, {
      props: ({ data: networkStatus }) => ({
        networkStatus,
      }),
    }
  )
)(withStyles(styles)(withRouter(Navbar)));
