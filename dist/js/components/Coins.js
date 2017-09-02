import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getData, getUserData, setUserData } from '../actions/actions';

import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import { where } from '../utils/index.js';

class Coins extends React.Component {
    static propTypes = {
        currentUser: PropTypes.object,
        userData: PropTypes.object,
        setUserData: PropTypes.func,
        getData: PropTypes.func,
        data: PropTypes.string,
        match: PropTypes.object
    };

    constructor (props) {
        super(props);

        this.state = {
            data: [],
            title: '',
            shouldRender: false
        };

        this.collections = this.props.match.url.split('/')[1];
        this.collection = this.props.match.params.collection;
    }

    componentDidMount () {
        this.fetchCoins();
    }

    shouldComponentUpdate (nextProps, nextState) {
        return true;
    }

    fetchCoins () {
        this.props.getData(this.props.data).then((response) => {
            this.setState({
                data: where({ collection: this.collection }, response.payload.coins),
                title: where({ collection: this.collection }, response.payload.collections)[0]['title'],
                shouldRender: true
            });
        });
    }

    isInputChecked (coinId) {
        if (this.props.userData !== null && this.props.userData[this.collections] && this.props.userData[this.collections][this.collection] && this.props.userData[this.collections][this.collection][coinId]) {
            return true;
        };

        return false;
    }

    isInputOnChecked (event, isInputChecked, coinId) {
        this.props.setUserData(this.props.currentUser, this.collections, this.collection, coinId, isInputChecked ? true : null);
    }

    render () {
        if (!this.state.shouldRender) return false;

        return (
            <List>
                <Subheader>{this.state.title}</Subheader>
                <Divider />
                {this.state.data.map((coin) => (
                    <div key={`${coin.id}`} className={'coins-item coins-item-' + this.collections}>
                        <ListItem
                            primaryText={`${coin.title}`}
                            className='coins-inner-item'
                            containerElement={<Link to={(`./${this.collection}/${coin.id}`).toLowerCase()} />}
                            leftAvatar={
                                <Avatar className='coins-item-avatar'>
                                    <img src={coin.icon} />
                                </Avatar>
                            }
                        />
                        <Checkbox
                            className='coins-item-checkbox'
                            disabled={this.props.currentUser === null}
                            checked={this.isInputChecked(coin.id)}
                            onCheck={(event, isInputChecked) => { this.isInputOnChecked(event, isInputChecked, coin.id); }}
                        />
                        <Divider />
                    </div>
                ))}
            </List>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ getData, getUserData, setUserData }, dispatch);
}

function mapStateToProps (state) {
    return { currentUser: state.currentUser, userData: state.userData };
}

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
