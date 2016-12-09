import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const ModeloListRow = ({modelo}) => {
    return (
        <tr>
            <td><Link to={'/modelo/' + modelo.id}>{modelo.id}</Link></td>            
            <td>{modelo.title}</td>
        </tr>
    );
};

ModeloListRow.PropTypes = {
    modelo: PropTypes.object.isRequired
};

export default ModeloListRow;