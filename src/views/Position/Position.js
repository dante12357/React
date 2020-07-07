import React, {Component} from 'react';

import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from 'react-router'
import {AddPosition} from './components'
import {PositionTable} from './components'
import {Card,
    Divider} from '@material-ui/core';

import './position.css'

const position_Query = gql`
    {
        allPositions{
            id,
            position,
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

        return (
            <div>

                <Query query={position_Query}>
                    {({loading, error, data}) => {
                        if (loading) return <div></div>
                        if (error) return <div>Error</div>
                        return (
                            <div className="Position">
                                <Card>
                                <AddPosition/>
                                <Divider/>
                                <div className="tableContent">
                                    <PositionTable header={[

                                        {
                                            name: 'Должность',
                                            prop: 'position'
                                        },
                                        {
                                            name: 'Количество сотрудников с должностью ',
                                            prop: 'name'
                                        },
                                        {
                                            name: 'Удалить должность',
                                            prop: 'delete'
                                        },
                                    ]} key={data.allPositions.id} data={data.allPositions}
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
