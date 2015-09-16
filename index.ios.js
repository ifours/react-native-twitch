'use strict';

var React = require('react-native'),
  Drawer = require('react-native-drawer');

var DrawerScene = require('./components_scene/DrawerScene'),
  CurrentStream = require('./components/CurrentStream'),
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

var openDrawerOffset = 75,
  isDrawer = false;

StatusBarIOS.setStyle('light-content');

var MainView = React.createClass({
  getInitialState: function() {
    return {
      currentStream: applicationStore.getCurrentStream(),
    };
  },

  componentDidMount: function() {
    applicationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    applicationStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ currentStream: applicationStore.getCurrentStream() });
  },

  renderCurrentStream: function() {
    if (!this.state.currentStream) {
      return null;
    }
    return (
      <CurrentStream stream={this.state.currentStream} navigator={this.refs.nav} />
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
              emitCurrentStream: this.emitCurrentStream,
            },
          }}
        />
        {this.renderCurrentStream()}
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
