'use strict';

var React = require('react-native'),
  Drawer = require('./vendor/react-native-drawer');

var DrawerScene = require('./components_scene/DrawerScene'),
  Player = require('./components/Player'),
  GamesScene = require('./components_scene/GamesScene');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  NavigatorIOS,
  TouchableHighlight,
  StatusBarIOS,
} = React;

var applicationStore = require('./stores/applicationStore'),
  applicationActions = require('./actions/applicationActions');

var openDrawerOffset = 60,
  isDrawer = false;

StatusBarIOS.setStyle('light-content');

var MainView = React.createClass({
  getInitialState: function() {
    return {
      playerStream: applicationStore.getPlayerStream(),
    };
  },

  componentDidMount: function() {
    applicationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    applicationStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ playerStream: applicationStore.getPlayerStream() });
  },

  renderPlayer: function() {
    if (!this.state.playerStream) {
      return null;
    }
    return (
      <Player stream={this.state.playerStream} navigator={this.refs.nav} />
    );
  },

  render: function() {

    return (
      <View style={{ flex: 1 }}>
        <NavigatorIOS
          style={{flex: 1}}
          barTintColor='#6441A5'
          titleTextColor='#fff'
          tintColor='#fff'
          ref="nav"
          initialRoute={{
            component: GamesScene,
            title: 'Games',
            leftButtonIcon: require('image!tabnav_list'),
            onLeftButtonPress: () => {
              if (isDrawer) {
                this.props.closeDrawer();
              } else {
                this.props.openDrawer();
              }
            },
            passProps: {
              closeDrawer: this.props.closeDrawer,
            },
          }}
        />
        {this.renderPlayer()}
      </View>
    );
  }
});

var App = React.createClass({
  closeDrawer: function(){
    isDrawer = false;
    this.refs.drawer.close();
  },
  openDrawer: function(){
    isDrawer = true;
    this.refs.drawer.open();
  },
  render: function() {
    return (
      <Drawer
        ref="drawer"
        type="static"
        openDrawerOffset={openDrawerOffset}
        panOpenMask={.5}
        onOpen={() => isDrawer = true}
        onClose={() => isDrawer = false}
        content={<DrawerScene closeDrawer={this.closeDrawer}/>}
        >
          <MainView
            closeDrawer={this.closeDrawer}
            openDrawer={this.openDrawer}
          />
      </Drawer>
    );
  }
});

AppRegistry.registerComponent('twitch', () => App);
