// --- imports --- //
import React, { Fragment, useState } from 'react';
import update from 'immutability-helper';
import { useSnackbar } from 'notistack';

// --- Materail Ui Imports --- //
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Details from '../Details';
import { Button } from '@material-ui/core';

// --- Styling --- //
const useStyles = makeStyles(theme => ({
  card: {
    width: '100%'
  },
  cardMedia: {
    height: 140
  },
  cardActions: {
    padding: 16
  }
}));

function Product(props) {
  const classes = useStyles();
  // const { enqueueSnackbar } = useSnackbar();
  const initState = () => ({
    id: props.id,
    services: props.services.map(service => ({
      id: service.id,
      selected: false
    })),
    funding: 0,
    showDetails: false
  });
  // Defines product state
  const [state, setState] = useState(initState());

  /**
   * Selected a product service when checkbox is clicked.
   * @param {string} id guid of service id to be selected/deselected
   */
  const selectService = id => {
    // find service id
    const index = state.services.findIndex(s => s.id === id);

    // check that service was found
    if (index !== -1) {
      // update product with select/deselect service
      setState(
        update(state, {
          services: {
            [index]: {
              selected: { $set: !state.services[index].selected }
            }
          }
        })
      );
    }
  };

  /**
   * Closes product details dialog
   */
  const closeDetails = () => {
    setState(initState());
  };

  /**
   * Open product details dialog
   */
  const openDetails = () => {
    setState(update(state, { showDetails: { $set: true } }));

    // setShowDetails(true);
  };

  /**
   * Product confirmation logic for products
   *  -- adds item to cart
   *  -- resets the product state
   *     -- closes dialog
   */
  const onConfirm = () => {
    // Show the snackbar notification
    // enqueueSnackbar(`Account added!`, {
    //   variant: 'success',
    //   anchorOrigin: {
    //     vertical: 'top',
    //     horizontal: 'right'
    //   },
    //   autoHideDuration: 2000
    // });

    // Add product and select service to shopping cart
    props.addToCart(state);

    // Reset product state after adding
    setState(initState());
  };

  return (
    <React.Fragment>
      {/* Product card */}
      <Card className={classes.card} {...props.cardProps}>
        <CardActionArea onClick={() => openDetails()}>
          <CardMedia
            image={`/static/images/${props.media.image}`}
            title={props.media.type}
            className={classes.cardMedia}
          />
          <CardContent {...props.contentProps}>
            <Box height="50px" width="100%">
              <Typography variant="h5" component="h2">
                {props.name}
              </Typography>
            </Box>
            <Typography variant="overline" component="p">
              {props.type}
            </Typography>
            <Box
              height="100px"
              maxHeight="100px"
              width="100%"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              <Typography variant="body2" component="p">
                {props.description}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => openDetails()}
          >
            Add
          </Button>
        </CardActions>
      </Card>

      {/* Product detail dialog */}
      <Details
        name={props.name}
        description={props.description}
        show={state.showDetails}
        onClose={() => closeDetails()}
        onConfirm={() => onConfirm()}
      >
        {/* Services of product */}
        {props.services.length != 0 ? (
          <Fragment>
            <Typography>Services</Typography>
            <List>
              {props.services.map(service => {
                // let service = props.catalog.services.find(
                //   s => s.id === serviceId
                // );
                return (
                  <ListItem key={service.id}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        color="primary"
                        checked={
                          state.services.find(s => s.id === service.id).selected
                        }
                        onChange={() => selectService(service.id)}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={service.name}
                      secondary={service.description}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Fragment>
        ) : (
          ''
        )}

        {/* Documents of product */}
        {props.documents.length > 0 ? (
          <Fragment>
            <Typography variant="body2" component="p">
              Documents
            </Typography>
            {props.documents.map(document => {
              return (
                <ListItem key={document.id}>
                  <ListItemText
                    primary={
                      <Link target="_blank" href={document.url}>
                        {document.name}
                      </Link>
                    }
                  />
                </ListItem>
              );
            })}
          </Fragment>
        ) : (
          ''
        )}
      </Details>
    </React.Fragment>
  );
}

// --- Exports --- //
export default Product;
