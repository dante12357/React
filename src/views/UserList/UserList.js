import React, {Component} from 'react';
import UserTable from './components/UserTable/UserTable'

import './userList.css'
import UserToolbar from './components/UserToolbar';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router'


const User_Query = gql`
    {
        allUsers{
            id,
            name,
            lastName,
            email,
            phone,
            position_id,
            position,
            avatarUrl
        }
    }
`;

// const [state, setState] = useState({
//     query: "",
//     columnToQuery: "name"
// });
// const lowerCaseQuery = state.query.toLowerCase();


// const classes = useStyles()
class UserList extends Component {

    state = {
        query: '',
        columnToQuery: 'name'
    };

    render() {
        return (

            <Query query={User_Query}>
                {({loading, error, data}) => {
                    if (loading) return <div></div>
                    if (error) return <div>Error</div>
                    return (
                        <div className="userList">

                            <UserToolbar
                                onChange={e => this.setState({query: e.target.value})}
                                value={this.state.query}
                            />

                            <div className="tableContent">
                                <UserTable header={[
                                    {
                                        name: 'Имя',
                                        prop: 'name'
                                    },
                                    {
                                        name: 'Номер телефона',
                                        prop: 'number'
                                    },
                                    {
                                        name: 'Email',
                                        prop: 'email'
                                    },
                                    {
                                        name: 'Должность',
                                        prop: 'position'
                                    }
                                ]} key={data.allUsers.id} data={data.allUsers.filter(x =>
                                    x['name'].toLowerCase().includes(this.state.query.toLowerCase()))
                                }
                                />
                            </div>
                        </div>
                    )
                }}
            </Query>
        );
    }
}

export default UserList;
export {User_Query}
