import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});



const ItemDetail = (props) => {
    const { classes, currentItem, currentTags, handleDeleteButton, handleUpdatebutton } = props
    return (
        
        <div>
            <div> { currentItem.name }</div>
            <div>{ currentItem.risk_factors }</div>
            <div> { currentTags.map(tag => tag.tag) }</div>

            <Button
                variant="raised"
                color="secondary"
                className={classes.button}
                onClick={handleDeleteButton}
            >
                Delete
            </Button>
            <Button
                variant="raised"
                color="primary"
                className={classes.button}
                onClick={handleUpdatebutton}
            >
                Update
            </Button>
        </div>
    )
}

export default withStyles(styles)(ItemDetail)