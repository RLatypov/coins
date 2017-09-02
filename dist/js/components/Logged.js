import React from 'react';
import PropTypes from 'prop-types';

import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

class Logged extends React.Component {
    static propTypes = {
        logoutUser: PropTypes.func,
        fetchUser: PropTypes.func,
        getUserData: PropTypes.func
    };

    logOut = () => {
        this.props.logoutUser()
            .then(() => {
                return this.props.fetchUser();
            })
            .then((response) => {
                return this.props.getUserData(response.payload);
            });
    }

    render () {
        return (
            <IconMenu
                iconStyle={{color: '#ffffff'}}
                iconButtonElement={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem onTouchTap={this.logOut} primaryText='Sign out' />
            </IconMenu>
        );
    }
}

export default Logged;
