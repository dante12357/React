import React, {Component,useState} from 'react';
import UserTable from './components/UserTable/UserTable'

import './userList.css'
import UserToolbar from './components/UserToolbar';
import {Query} from 'react-apollo';
import {useQuery} from  '@apollo/react-hooks'
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


// const lowerCaseQuery = state.query.toLowerCase();


// const classes = useStyles()

const UserList = () =>{

    const {loading, data, error } = useQuery(User_Query, {
        pollInterval: 500,
        fetchPolicy: "no-cache"
    })

    const [state, setState] = useState({
        query: "",
        columnToQuery: "name"
    });

    if (loading) return <div></div>
    if (error) return <div>Error</div>

                    return (
                        <div className="userList">

                            <UserToolbar
                                onChange={e => setState({query: e.target.value})}
                                value={state.query}
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
                                    x['name'].toLowerCase().includes(state.query.toLowerCase()))
                                }
                                />
                            </div>
                        </div>

        );

}

export default UserList;
export {User_Query}
