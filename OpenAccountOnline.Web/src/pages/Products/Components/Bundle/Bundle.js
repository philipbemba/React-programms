// --- Imports --- //
import React, { useState } from 'react';

// --- Material Ui Imports --- //
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';

// --- Custom Component --- //
import Details from '../Details';
import { ListItem, ListItemText, List } from '@material-ui/core';

// --- Card overrides --- //
export const BundleCard = withStyles({
  root: {
    position: 'relative'
  }
})(Card);

export const BundleActionArea = withStyles({
  root: {
    position: 'relative'
  }
})(CardActionArea);

export const BundleActions = withStyles({
  root: {
    position: 'relative',
    backgroundColor: 'transparent'
  }
})(CardActions);

export const BundleContent = withStyles({
  root: {
    position: 'relative',
    backgroundColor: 'transparent'
  }
})(CardContent);

export const BundleMedia = withStyles({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '100%'
  }
})(CardMedia);

// --- Styling --- //
const useStyles = makeStyles(theme => ({
  card: {
    width: '100%'
  },
  bundleMedia: {
    height: '100%'
  },
  productAction: {
    padding: 16
  },
  hideProductAction: {
    display: 'none'
  }
}));

function Bundle(props) {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      <BundleCard className={classes.card} {...props.cardProps}>
        <BundleActionArea onClick={() => setShow(true)}>
          <BundleMedia
            image={props.mediaImage}
            title={props.mediaTitle}
            className={classes.bundleMedia}
          />
          <BundleContent {...props.contentProps}>
            <Box height="75px" width="100%">
              <Typography variant="h5" component="h2">
                {props.title}
              </Typography>
            </Box>
            <Box height="25px" width="100%">
              <Typography variant="overline" component="p">
                {props.category}
              </Typography>
            </Box>
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
          </BundleContent>
        </BundleActionArea>
      </BundleCard>
      <Details
        name={props.title}
        description={props.description}
        show={show}
        onClose={() => setShow(false)}
        onAdd={() => {
          props.onAdd();
          setShow(false);
        }}
      >
        <List>
          {props.offers.map(offer => {
            return (
              <ListItem key={offer.id}>
                <ListItemText
                  primary={offer.name}
                  secondary={offer.description}
                />
              </ListItem>
            );
          })}
        </List>
      </Details>
    </React.Fragment>
  );
}

// --- Exports --- //
export default Bundle;
