import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modeloActions from '../../actions/modeloActions';
import ModeloForm from './ModeloForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageModeloPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modelo: Object.assign({}, this.props.modelo),
            errors: {},
            saving: false
        };

        this.saveModelo = this.saveModelo.bind(this);
        this.updateModeloState = this.updateModeloState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.modelo.id != nextProps.modelo.id) {
            this.setState({modelo: Object.assign({}, nextProps.modelo)});
        }
    }

    updateModeloState(event) {
        const field = event.target.name;
        let modelo = this.state.modelo;
        modelo[field] = event.target.value;
        return this.setState({modelo: modelo});
    }

    modeloFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if(this.state.modelo.title.length < 5) {
            errors.title = 'Titulo deve ser maior que 5 caracteres';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    saveModelo(event) {
        event.preventDefault();

        if(!this.modeloFormIsValid()) {
            return;
        }

        this.setState({saving: true});
        this.props.actions.saveModelo(this.state.modelo)
            .then(() => this.redirect())
            .catch((error) => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    redirect() {
        this.setState({saving: false});
        toastr.success('Modelo salvo!');
        this.context.router.push('/modelos');
    }


    render() {
        return (
            <ModeloForm
                modelo={this.state.modelo}
                onChange={this.updateModeloState}
                onSave={this.saveModelo}
                errors={this.state.errors}
                allAuthors={this.props.authors}
                saving={this.state.saving}
            />
        );
    }
}

ManageModeloPage.propTypes = {
    modelo: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

ManageModeloPage.contextTypes = {
    router: PropTypes.object
};

function getModeloById(modelos, id) {
    const modelo = modelos.filter(modelo => modelo.id == id);
    if (modelo) return modelo[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const modeloId = ownProps.params.id;
    let modelo = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

    if(modeloId && state.modelos.length > 0) {
        modelo = getModeloById(state.modelos, modeloId);
    }

    return {
        modelo: modelo,
        authors: authorsFormattedForDropdown(state.authors)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(modeloActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageModeloPage);