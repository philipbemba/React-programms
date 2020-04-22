// --- Imports --- //
import React, { Fragment } from 'react';

// --- Material Ui Imports --- //
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

// --- State Imports --- //
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  // TODO: Implement new member state to properties
  return {
    ownProps,
    member_number: '',
    joints: [],
    accounts: []
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ownProps
  };
};

// --- Styles --- //
const AppStoreImage = '/static/images/apple-appstore-download-badge.svg';
const HeroImage = '/static/images/forest-product-background.svg';
const useStyles = makeStyles(theme => ({
  hero: {
    backgroundImage: `url(${HeroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: theme.palette.white.main
  },
  google_play: {
    width: '150px'
  },
  app_store: {
    width: '125',
    margin: '8px'
  }
}));

const Section = props => {
  const { children, ...rest } = props;
  return (
    <Box my={4} textAlign="center" {...rest}>
      {children}
    </Box>
  );
};

function Success(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <Section
        className={classes.hero}
        minHeight="25vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={0}
        mb={8}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Northwest Community Credit Union!
        </Typography>
      </Section>

      <Container maxWidth="md">
        <Section>
          <Typography variant="h4">Your Member Number</Typography>
          <Typography variant="h6" gutterBottom>
            {props.member_number}
          </Typography>
        </Section>

        <Section>
          {props.joints.length !== 0 ? (
            <Fragment>
              <Typography variant="h4" gutterBottom>
                Joint Member Number(s)
              </Typography>

              {props.joints.map(joint => {
                return (
                  <Box mb={4}>
                    <Typography variant="h6">
                      {joint.first_name} {joint.middle_name} {joint.last_name}
                    </Typography>
                    <Typography variant="overline">
                      {joint.member_number}
                    </Typography>
                  </Box>
                );
              })}
            </Fragment>
          ) : (
            ''
          )}
        </Section>

        <Section>
          {props.accounts.length !== 0 ? (
            <Fragment>
              <Typography variant="h4" gutterBottom>
                Account Numbers
              </Typography>

              {props.accounts.map(account => {
                return (
                  <Box mb={4}>
                    <Typography variant="h6">
                      {account.account_number}
                    </Typography>
                    <Typography variant="overline">
                      {account.name} - {account.type}
                    </Typography>
                  </Box>
                );
              })}
            </Fragment>
          ) : (
            ''
          )}
        </Section>

        <Section>
          <Typography variant="h4" color="primary" gutterBottom>
            Optimize Your Membership with these next steps
          </Typography>
        </Section>

        <Section>
          <Typography variant="h6" gutterBottom>
            Sign up for eBanking for easy banking
          </Typography>
          <Grid container spacing={4}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Box width="100%" textAlign="right">
                <a
                  href="https://play.google.com/store/apps/details?id=com.q2e.northwest5056android.nwebanking.uwnmobile&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
                  target="_blank"
                >
                  <img
                    className={classes.google_play}
                    alt="Get it on Google Play"
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  />
                </a>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Box width="100%" textAlign="left">
                <a
                  href="https://apps.apple.com/us/app/northwest-community-ebanking/id624536083"
                  target="_blank"
                >
                  <img
                    className={classes.app_store}
                    alt="Download on the App Store"
                    src={AppStoreImage}
                  />
                </a>
              </Box>
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Typography variant="h6" gutterBottom>
            Download our Card Valet App to manage your cards
          </Typography>
          <Grid container spacing={4}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Box width="100%" textAlign="right">
                <a
                  href="https://play.google.com/store/apps/details?id=com.fiservcardvalet.mobile.android&hl=en&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
                  target="blank"
                >
                  <img
                    className={classes.google_play}
                    alt="Get it on Google Play"
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  />
                </a>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Box width="100%" textAlign="left">
                <a
                  href="https://apps.apple.com/us/app/cardvalet/id849898083"
                  target="_blank"
                >
                  <img
                    className={classes.app_store}
                    alt="Download on the App Store"
                    src={AppStoreImage}
                  />
                </a>
              </Box>
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Typography variant="h6" gutterBottom>
            Sign up for Member Benefits Apps to get local business discounts
          </Typography>
          <Grid container spacing={4}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Box width="100%" textAlign="right">
                <a
                  href="https://play.google.com/store/apps/details?id=com.nwcu.Community&showAllReviews=true&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
                  target="_blank"
                >
                  <img
                    className={classes.google_play}
                    alt="Get it on Google Play"
                    src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
                  />
                </a>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Box width="100%" textAlign="left">
                <a
                  href="https://play.google.com/store/apps/details?id=com.nwcu.Community&showAllReviews=true&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
                  target="_blank"
                >
                  <img
                    className={classes.app_store}
                    alt="Download on the App Store"
                    src={AppStoreImage}
                  />
                </a>
              </Box>
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Typography variant="overline">
            Google Play and the Google Play logo are trademarks of Google LLC.
          </Typography>
        </Section>
      </Container>
    </Fragment>
  );
}

// --- Store Connection --- //
const StatefulSuccess = connect(
  mapStateToProps,
  mapDispatchToProps
)(Success);

// --- Exports --- //
export default StatefulSuccess;
