import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

class Collection extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        userData: PropTypes.object,
        match: PropTypes.object
    };

    constructor (props) {
        super(props);

        this.collections = this.props.match.url.split('/')[1];
    }

    countCoinsUser () {
        let countCoinsUser = 0;

        if (this.props.userData !== null && this.props.userData[this.collections]) {
            const collection = this.props.userData[this.collections][this.props.data.collection];
            if (collection) {
                countCoinsUser = Object.keys(this.props.userData[this.collections][this.props.data.collection]).length;
            }
        }

        return countCoinsUser;
    }

    render () {
        return (
            <div>
                <ListItem
                    primaryText={this.props.data.title}
                    secondaryText={`${this.countCoinsUser()}/${this.props.data.count}`}
                    className='country'
                    containerElement={<Link to={`${location.pathname}/${this.props.data.collection}`} />}
                    leftAvatar={
                        <Avatar className='img-collection'>
                            <img src={`/images/flags/eu/${this.props.data.iso2}.svg`} />
                        </Avatar>
                    }
                />
                <Divider />
            </div>
        );
    }
}

export default Collection;
