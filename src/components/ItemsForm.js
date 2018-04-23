import React from 'react';
import Button from 'material-ui/Button';
import { newItem,fetchTags } from '../actions/itemsActions'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { MenuItem } from 'material-ui/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const ITEM_HEIGHT = 48;

var suggestions = []

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  menu: {
    width: 200,
  },
  formContainer:{
    padding:24
  },
 formHeader:{
    padding:14
 },
 formHeaderText:{
    color:'rgba(0, 0, 0, 0.54)'
 },
  formFooter:{
    marginTop:14
  },
  root: {
    flexGrow: 1,
    height: 250,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a much better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },

});

class ItemsForm extends React.Component {

  state = {
    single: null,
    multi: null,
    tag: null,
  };

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
      this.props.fetchTags()
  }
  
  componentWillReceiveProps(nextProps) { 
    console.log(nextProps);
    if(nextProps){
      suggestions = nextProps.tags.tags.map(suggestion => ({
        value:suggestion.tag,
        label:suggestion.tag
      }))
    }
}

  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
  };
  
  handleSubmit(event) {
    event.preventDefault();
    const data = { risk_factors: this.state.risk_factors, laboratory: this.state.laboratory, tag: this.state.tag,illustration:this.state.illustration,medicine:this.state.medicine,tests:this.state.tests }
    console.log(this.state)
    this.props.newItem(data, this.state.name)

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <Paper >
      <div className={classes.formHeader}>
      <Typography variant="headline" align="center" className={classes.formHeaderText}>Φόρμα καταχώρησης νόσου</Typography>
      </div>
      <Divider />
      <div className={classes.formContainer}>
      <form className={classes.container} onSubmit={this.handleSubmit}>
      <TextField
          id="name"
          label="Νόσος"
          className={classes.textField}
          onChange={this.handleInputChange}
          margin="normal"
          name="name"
        />
        <TextField
          id="name"
          label="Παράγοντες Κινδύνου"
          className={classes.textField}
          onChange={this.handleInputChange}
          margin="normal"
          name="risk_factors"
        />
        <TextField
          id="name"
          label="Εργαστηριακά"
          className={classes.textField}
          onChange={this.handleInputChange}
          margin="normal"
          name="laboratory"
        />
        {/* <TextField
          id="name"
          label="Συμπτώματα"
          className={classes.textField}
          onChange={this.handleInputChange}
          margin="normal"
          name="tag"
        /> */}
         <div className={classes.root}>
        <TextField
          fullWidth
          value={this.state.tag}
          onChange={this.handleChange('tag')}
          placeholder="Select multiple countries"
          name="react-select-chip-label"
          label="Συμπτώματα"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputComponent: SelectWrapped,
            inputProps: {
              classes,
              multi: true,
              instanceId: 'react-select-chip-label',
              id: 'react-select-chip-label',
              simpleValue: true,
              options: suggestions,
            },
          }}
        />
      </div>
        <TextField
          id="name"
          label="Απεικονιστικά"
          className={classes.textField}
          onChange={this.handleInputChange}
          margin="normal"
          name="illustration"
        />
       <TextField
          id="name"
          label="Φάρμακα"
          className={classes.textField}
          onChange={this.handleInputChange}
          margin="normal"
          name="medicine"
        />
        <TextField
          id="name"
          label="Δοκιμασίες"
          className={classes.textField}
          onChange={this.handleInputChange}
          margin="normal"
          name="tests"
        />
        <div className={classes.formFooter}>
          <Button variant="raised" color="primary" type="submit">
            submit
          </Button>
        </div>
      </form>

    
      </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
      tags:state.items.tags
})
export default connect(mapStateToProps, { newItem, fetchTags })(withStyles(styles)(ItemsForm));


class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select.Creatable
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        const onDelete = event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}