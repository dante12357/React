import React, {Component} from 'react';
import './user.css'
import {Query} from 'react-apollo';
import {useQuery} from "@apollo/react-hooks";
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {UserToolbar} from "./components";

// import UserToolbar from './components'
const User_Query = gql`
    query ($id : Int!){
        user(id: $id){
            id,
            name,
            last_name,
            email,
            phone,
            birthday,
            date_employment,
            probation,
        },
        userSalary(id: $id){
            id,
            salary,
            review_period,
            active_from
        }
    }`

// const classes = useStyles()
// const [state, setState] = useState({
//     query: "",
//     columnToQuery: "name"
// });
// const lowerCaseQuery = state.query.toLowerCase();
const User = props => {
    const {match: {params: {id}}} = props;

    const {data, loading, error} = useQuery(User_Query, {
        variables: {id: +id},
    })

    if (loading) return <div>loading</div>
    if (error) return <div>Error</div>
    return (
        <div className="user">
            <h3>{data.user.name} {data.user.last_name}</h3>

            <UserToolbar
                data={data}
            />

        </div>
    );

}
User.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.number
        })
    }),
};
export default User;
