import React from 'react';
import PropTypes from 'prop-types';
// import Helmet from 'react-helmet';
import { where } from '../utils/index.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getData } from '../actions/actions';

class Coin extends React.Component {
    static propTypes = {
        data: PropTypes.string,
        match: PropTypes.object,
        getData: PropTypes.func
    };

    constructor (props) {
        super(props);

        this.state = {
            data: [],
            shouldRender: false
        };
    }

    componentDidMount () {
        this.props.getData(this.props.data).then((response) => {
            this.setState({
                data: response.payload.coins,
                shouldRender: true
            });
        });
    }

    prepareData () {
        return where({ id: this.props.match.params.id }, this.state.data);
    }

    render () {
        if (!this.state.shouldRender) return false;

        const data = this.prepareData()[0];

        return (
            <div>
                {/* <Helmet
                    title={data.title}
                    meta={[
                        {'name': 'description', 'content': 'Description inserted by helmet'}
                    ]}
                /> */}
                <h1>{data['title']}</h1>
                <div><img className='img-coin' alt={data['title']} src={data['img-optimized']} /></div>
                <div dangerouslySetInnerHTML={{__html: data['description']}} />
            </div>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ getData }, dispatch);
}

function mapStateToProps (state) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Coin);
