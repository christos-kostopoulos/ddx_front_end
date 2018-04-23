import React from 'react';
import CardSelection from './CardSelection';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});


const Home = (props) => {
    const { classes } = props;
    return (
        <div>
            <Grid item xs={6}>
                <CardSelection />
            </Grid>
        </div>
    )
}

export default Home;