import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, getUserData, loginUser, logoutUser, registerUser, resetPasswordEmail } from '../actions/actions';

import Login from './Login';
import Logged from './Logged';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';

class Header extends React.Component {
    static propTypes = {
        fetchUser: PropTypes.func,
        getUserData: PropTypes.func,
        currentUser: PropTypes.object,
        history: PropTypes.object
    };

    constructor (props) {
        super(props);

        this.state = {
            openLogin: false
        };
    }

  handleToggle = () => this.setState({openLogin: !this.state.openLogin})

  handleClose = () => this.setState({openLogin: false})

  handleRedirect = (url) => {
      this.handleClose();
      this.props.history.push(url);
  }

  componentDidMount () {
      this.props.fetchUser()
          .then(response => {
              if (response.payload !== null) {
                  return this.props.getUserData(response.payload);
              }
          });
  }

  render () {
      return (
          <header>
              <Drawer
                  docked={false}
                  open={this.state.openLogin}
                  width={280}
                  onRequestChange={(openLogin) => this.setState({openLogin})}
              >
                  <Menu>
                      <MenuItem onTouchTap={() => this.handleRedirect('/euro-regular')} primaryText='Euro regular' />
                      <MenuItem onTouchTap={() => this.handleRedirect('/euro-commemorative')} primaryText='Euro commemorative' />
                  </Menu>
              </Drawer>
              <AppBar
                  title='Collection of coins'
                  onTitleTouchTap={() => this.props.history.push('/')}
                  showMenuIconButton
                  onLeftIconButtonTouchTap={this.handleToggle}
                  iconElementRight={this.props.currentUser && this.props.currentUser.uid ? <Logged {...this.props} /> : <Login {...this.props} />}
              />
          </header>
      );
  }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({fetchUser, getUserData, loginUser, logoutUser, registerUser, resetPasswordEmail}, dispatch);
}

function mapStateToProps (state) {
    return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
