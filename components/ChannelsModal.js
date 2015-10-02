/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Modal,
  Text,
} = React;

var ChannelsModal = React.createClass({
  render: function() {
    return (
      <Modal
        animated={true}
        transparent={false}
        visible={this.props.modalVisible}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text
              onPress={ this.props.closeModal }
              style={styles.modalButton}  >
              Close
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#211F27',
  },
  modalButton: {
    color: '#fff',
  },
});


module.exports = ChannelsModal;
