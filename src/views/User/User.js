import React, {Component} from 'react';


// const [state, setState] = useState({
//     query: "",
//     columnToQuery: "name"
// });
// const lowerCaseQuery = state.query.toLowerCase();


// const classes = useStyles()
class User extends Component {

  state = {
    query: '',
    columnToQuery: 'name'
  };

  render() {
    const id = this.props.match.params.id;

    return (
      <div>
      <h2>id: {id}</h2>
      </div>
    );
  }
}

export default User;
