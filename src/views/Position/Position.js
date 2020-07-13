import React, {Component, useState} from 'react';

import {Query} from 'react-apollo';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {withRouter} from 'react-router'
import {AddPosition} from './components'
import {PositionTable} from './components'
import {
    Card,
    Divider
} from '@material-ui/core';

import './position.css'
import {SearchInput} from "../../components";
import {PositionToolbar} from "./components"

const getNumPosition_Query = gql`
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
    const {loading, error, data} = useQuery(getNumPosition_Query, {
        pollInterval: 500,
        fetchPolicy: "no-cache",
        }
    )


    if (loading) return <p>Loading ...</p>;
    return (
        <div>


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
                        ]} key={data.getNumPosition.PositionId} data={data.getNumPosition}
                        />
                    </div>
                </Card>
            </div>


        </div>
    );

}

export default withRouter(Position);
export {getNumPosition_Query}
