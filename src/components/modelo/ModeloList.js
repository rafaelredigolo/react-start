import React, {PropTypes} from 'react';
import ModeloListRow from './ModeloListRow';

const ModeloList = ({modelos}) => {   
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>id</th>
                    <th>nome</th>
                </tr>
            </thead>
            <tbody>                
                {modelos.map(modelo =>                         
                    <ModeloListRow key={modelo.id} modelo={modelo} />
                )}
            </tbody>
        </table>
    );
};

ModeloList.PropTypes = {
    modelos: PropTypes.array.isRequired
};

export default ModeloList;