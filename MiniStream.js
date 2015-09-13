var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  StyleSheet,
  View,
  ScrollView,
  Image,
  PixelRatio,
  Text,
  Animated,
  TouchableHighlight,
} = React;

var MiniStream = React.createClass({
  _onPressStream: function(stream) {
    this.props.navigator.push({
      title: stream.name,
      component: StreamScreen,
      passProps: {stream, emitCurrentStream: this.props.emitCurrentStream},
    });
  },

  render: function() {
    return (
      <View>
        <View style={styles.separator} />
        <TouchableHighlight
          onPress={() => this._onPressStream(this.props.stream) }
          underlayColor='#f1f1f1'
        >
          <View
            style={[styles.streamView, styles.miniStreamView]}
          >
            <Image
              style={[styles.streamImg, styles.miniStreamImg]}
              source={{uri: this.props.stream.uri}}
              resizeMode="contain"
            />
            <View style={{marginLeft: 10, flex: 1}}>
              <Text
                style={[styles.streamTitleText, {fontSize: 18}]}
                numberOfLines={1}
              >
                {this.props.stream.name}
              </Text>
              <Text style={{color: '#694BA6', fontWeight: '400'}} numberOfLines={1}>
                Views: <Text style={{color: '#6749A4', fontWeight: 'bold'}}>{this.props.stream.views}</Text>
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = require('./stream_styles');

module.exports = MiniStream;
