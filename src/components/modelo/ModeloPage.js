import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as modeloActions from '../../actions/modeloActions';
import ModeloList from './ModeloList';

class ModeloPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.redirectToAddModeloPage = this.redirectToAddModeloPage.bind(this);
    }

    redirectToAddModeloPage() {
        console.log('hi');
        browserHistory.push('/modelo');
        //browserHistory.push('/modelo');
    }
    render() {
        
        return (
            <div>
                <h1>Modelos</h1>
                <input type="submit" value="Adicionar Modelo" className="btn btn-primary" onClick={this.redirectToAddModeloPage}/>

                <ModeloList modelos={this.props.modelos}/>
            </div>
        );
    }
}

ModeloPage.propTypes = {
    actions: PropTypes.object.isRequired,
    modelos: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        modelos: state.modelos
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(modeloActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModeloPage);