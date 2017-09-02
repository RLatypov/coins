import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Collection from './Collection';
import { getData } from '../actions/actions';

class Collections extends React.Component {
    static propTypes = {
        userData: PropTypes.object,
        data: PropTypes.string,
        match: PropTypes.object,
        getData: PropTypes.func
    };

    constructor (props) {
        super(props);

        this.state = {
            data: [],
            shouldRender: false,
            countCoins: 0
        };

        this.collections = this.props.match.url.split('/')[1];
    }

    componentDidMount () {
        this.fetchCollections();
    }

    fetchCollections () {
        this.props.getData(this.props.data).then((response) => {
            this.setState({
                data: response.payload.collections,
                shouldRender: true,
                countCoins: response.payload.collections.reduce((memo, num) => memo + num.count, 0)
            });
        });
    }

    countCoinsUser () {
        let countCoinsUser = 0;

        if (this.props.userData !== null && this.props.userData[this.collections]) {
            this.state.data.forEach((value, index) => {
                const collection = this.props.userData[this.collections][this.state.data[index]['collection']];
                if (collection) {
                    countCoinsUser += Object.keys(collection).length;
                }
            });
        };

        return countCoinsUser;
    }

    renderCollection () {
        return this.state.data.map((item) => {
            return (
                <Collection {...this.props} data={item} key={item.collection} />
            );
        });
    }

    render () {
        if (!this.state.shouldRender) return false;

        return (
            <List>
                <Subheader>Number of coins: {this.countCoinsUser()} / {this.state.countCoins}</Subheader>
                <Divider />
                {this.renderCollection()}
            </List>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ getData }, dispatch);
}

function mapStateToProps (state) {
    return { userData: state.userData };
}

export default connect(mapStateToProps, mapDispatchToProps)(Collections);
