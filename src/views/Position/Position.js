import React, {Component, useState} from 'react';

import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from 'react-router'
import {AddPosition} from './components'
import {PositionTable} from './components'
import {Card,
    Divider} from '@material-ui/core';

import './position.css'
import {SearchInput} from "../../components";
import {PositionToolbar} from "./components"
const position_Query = gql`
    {
#        allPositions{
#            PositionId,
#            position,
#        },
        getNumPosition{
            PositionId
            position
            positionCount
        }
    }
`;

// const [state, setState] = useState({
//     query: "",
//     columnToQuery: "name"
// });
// const lowerCaseQuery = state.query.toLowerCase();


// const classes = useStyles()
const Position = props => {

    const {} = props;
    const [state, setState] = useState({
        query: ''
    }
    );
        return (
            <div>

                <Query query={position_Query}>
                    {({loading, error, data}) => {
                        if (loading) return <div></div>
                        if (error) return <div>Error</div>
                        return (
                            <div className="Position">
                                <Card>
                                    <PositionToolbar
                                        onChange={e => setState({query: e.target.value})}
                                        value={state.query}
                                    />

                                <Divider/>
                                <div className="tableContent">
                                    <PositionTable header={[

                                        {
                                            name: 'Должность',
                                            prop: 'position'
                                        },
                                        {
                                            name: 'Количество сотрудников с должностью ',
                                            prop: 'positionCount'
                                        },
                                        {
                                            name: 'Удалить должность',
                                            prop: 'delete'
                                        },
                                    ]} key={data.getNumPosition.PositionId} data={  data.getNumPosition }
                                    />
                                </div>
                                </Card>
                            </div>

                        )
                    }}
                </Query>
            </div>
        );

}

export default withRouter(Position);
export {position_Query}
