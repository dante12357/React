import React, {Component} from 'react';
import './user.css'
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
// const [state, setState] = useState({
//     query: "",
//     columnToQuery: "name"
// });
// const lowerCaseQuery = state.query.toLowerCase();
import PropTypes from 'prop-types';


// const classes = useStyles()

const User = props => {
    const {match: {params: {id}}} = props;


    const User_Query = gql`{
        user(id:${id}){
            id,
            name,
            lastName,
            email,
            dateEmployment
        }

    }`

    return (
        <div className="user">
            <Query query={User_Query}>
                {({loading, error, data}) => {

                    if (loading) return <div></div>
                    if (error) return <div>Error</div>
                    return (
                        <div>
                            <h2>
                                {data.user.id}
                            </h2>
                            <h2>
                                {data.user.name}
                            </h2>
                            <h2>
                                {data.user.lastName}
                            </h2>
                        </div>

                    )
                }
                }
            </Query>
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
