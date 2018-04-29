import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});



const ItemDetail = (props) => {
    const { classes, currentItem, currentTags, handleDeleteButton } = props
    return (
        <div>
            <div> {currentItem.name}</div>
            <div> {currentTags.map(tag => tag.tag)}</div>
            <Button 
            variant="raised" 
            color="secondary" 
            className={classes.button}
            onClick={handleDeleteButton}
            >
                Delete
      </Button>
        </div>
    )
}

export default withStyles(styles)(ItemDetail)