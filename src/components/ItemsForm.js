import React from 'react';
import Button from 'material-ui/Button';
import { newItem,fetchTags } from '../actions/itemsActions'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IntegrationReactSelect from './MultiSelect'

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
  }
});

class ItemsForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
      this.props.fetchTags()
  }
  
  
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
        <TextField
          id="name"
          label="Συμπτώματα"
          className={classes.textField}
          onChange={this.handleInputChange}
          margin="normal"
          name="tag"
        />
          <IntegrationReactSelect
            options = {this.props.tags}
            
            name = "tag"
          />
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