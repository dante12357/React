import React, {useState} from 'react';
import UserTable from './components/UserTable/UserTable'

import './userList.css'
import UserTableToolbar from './components/UserTableToolbar';
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag';


const User_Query = gql`
    {
        allUsers{
            id,
            name,
            last_name,
            email,
            phone,
            position_id,
            position,
            avatar_url
        }
    }
`;


// const lowerCaseQuery = state.query.toLowerCase();


// const classes = useStyles()

const UserList = () => {

    const {loading, data, error} = useQuery(User_Query, {
        // pollInterval: 500,
        fetchPolicy: "network-only"
    })

    const [state, setState] = useState({
        query: "",
        columnToQuery: "name"
    });

    if (loading) return <div>loading</div>
    if (error) return <div>Error</div>

    return (
        <div className="userList">

            <UserTableToolbar
                onChange={e => setState({query: e.target.value})}
                value={state.query}
            />

            <div className="tableContent">
                <UserTable header={[
                    {
                        name: 'Name',
                        prop: 'name'
                    },
                    {
                        name: 'Phone',
                        prop: 'number'
                    },
                    {
                        name: 'Email',
                        prop: 'email'
                    },
                    {
                        name: 'Position',
                        prop: 'position'
                    }
                ]} key={data.allUsers.id} data={data.allUsers.filter(x =>
                    x['name'].toLowerCase().includes(state.query.toLowerCase()) && " " || x['last_name'].toLowerCase().includes(state.query.toLowerCase()))
                }
                />
            </div>
        </div>
    );

}

export default UserList;
export {User_Query}
