/* @flow */
'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var SCREEN_WIDTH = Dimensions.get('window').width;
var { DRAWER_OFFSET } = require('../constants/applicationConstants');

var {
  StyleSheet,
  View,
  scrollViewew,
  Image,
  PixelRatio,
  TextInput,
  Text,
  ListView,
  TouchableHighlight,
} = React;

var DrawerScreen = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Logo />
        <Search />
        <MenuList {...this.props}/>
        <Actions />
      </View>
    );
  }
});

var Actions = React.createClass({
  render: function() {
    return (
      <View style={styles.actionsView}>
        <View style={styles.action}>
          <Text style={styles.actionText}>Log In</Text>
        </View>
        <View style={styles.action}>
          <Text style={styles.actionText}>Sign Up</Text>
        </View>
      </View>
    );
  },
});

var Search = React.createClass({
  render: function() {
    return (
      <View style={{ marginTop: -8 }}>
        <View style={styles.searchSeparator} />
        <View style={styles.searchView} >
          <Image
            style={{ width: 15, height: 15 }}
            source={{uri: 'http://www.clker.com/cliparts/9/T/2/h/X/7/search-icon-md.png'}} />
          <Text style={styles.searchText} >Search</Text>
        </View>
        <View style={styles.searchSeparator} />
      </View>
    );
  }
});

var Logo = React.createClass({
  render: function() {
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          style={styles.logoImg}
          source={{uri: 'http://twitchadvertising.tv/wp-content/uploads/2014/03/logo_white_twitch_effects.png'}}
        />
      </View>
    );
  }
});


var MenuList = React.createClass({
  getInitialState: function() {
    var getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };
    var getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[rowID];
    };

    var dataSource = new ListView.DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    var dataBlob = {};
    var sectionIDs = [];
    var rowIDs = [];
    var menuDataList = require('../mock_data/menu_data_list');

    for (var ii = 0; ii < menuDataList.length; ii++) {
      var sectionName = menuDataList[ii].section;
      sectionIDs.push(sectionName);

      dataBlob[sectionName] = sectionName;
      rowIDs[ii] = [];

      for (var jj = 0; jj < menuDataList[ii].items.length; jj++) {
        var rowData = menuDataList[ii].items[jj];
        rowIDs[ii].push(rowData.title);
        dataBlob[rowData.title] = rowData;
      }
    }

    var dataSource = dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);

    return { dataSource };
  },

  renderRow: function(rowData: string, sectionID: string, rowID: string): ReactElement {
    var activeView = rowID === 'Games' ? { backgroundColor: '#000' } : {},
      activeText = rowID === 'Games' ? { color: '#CCB3FD' } : { color: '#DBDBEA' },
      imageSrc, systemImageStyle = {};

    if (!rowData.img) {
      switch (rowData.systemImg) {
        case 'games':
          imageSrc = require('image!games');
          break;
        case 'channels':
          imageSrc = require('image!channels');
          break;
      }
    } else {
      imageSrc = {uri: rowData.img};
    }

    if (sectionID === 'Browse') {
      systemImageStyle.width = 30;
      systemImageStyle.height = 30;
    }

    return (
      <TouchableHighlight
        onPress={() => this.props.closeDrawer()}
      >
        <View>
          <View style={[styles.rowView, activeView]}>
              <Image
                style={[styles.rowImg, systemImageStyle]}
                source={ imageSrc }
                tintColor='#DBDBEA'
              />
              <Text style={[styles.rowText, activeText]}>
                {rowData.title}
              </Text> 
            
          </View>
          <View style={styles.rowSeparator} />
        </View>
      </TouchableHighlight>
    );
  },

  renderSectionHeader: function(sectionData: string, sectionID: string) {
    return (
      <View style={styles.sectionView}>
        <Text style={styles.sectionText}>
          {sectionData.toUpperCase()}
        </Text>
      </View>
    );
  },

  renderFooter: function() {
    return (
      <View style={{padding: 20, backgroundColor: '#19191F', paddingBottom: 50, alignItems: 'center'}}>
        <Image
          style={{height: 70, width: 70}}
          source={{uri: 'https://cdn1.iconfinder.com/data/icons/simple-icons/2048/twitch-2048-black.png'}}
        />
        <Text style={{fontSize: 15, color: '#DBDBEA'}}>
          Twitch App by Ilja Satchok
        </Text>
      </View>
    );
  },

  render: function() {
    return (
      <ListView
        style={styles.listView}
        contentContainerStyle={{marginTop: -22}}
        initialListSize={25}
        dataSource={this.state.dataSource}
        renderSectionHeader={this.renderSectionHeader}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
      />
    );
  }
});

var imgWidth = 22,
  imgHeight = 30;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#211F27',
    flex: 1,
    marginRight: DRAWER_OFFSET,
  },

  contentContainer: {

  },

  scrollView: {

  },

  listView: {
    // backgroundColor: 'red',
  },

  rowView: {
    backgroundColor: '#19191F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  rowImg: {
    width: imgWidth,
    height: imgHeight,
    marginHorizontal: 15,
  },

  rowText: {
    fontSize: 17,
  },

  sectionView: {
    padding: 2,
    paddingLeft: 10,
  },

  sectionText: {
    color: '#FCFCFC',
    fontSize: 15,
    fontWeight: '500',
  },

  logoImg: {
    width: SCREEN_WIDTH - DRAWER_OFFSET - 100,
    height: 100,
    marginTop: 15,
  },

  selectedRow: {
    backgroundColor: '#1A191F',
  },

  textRow: {
    color: '#DAD9E9',
  },

  searchView: {
    flexDirection: 'row',
    backgroundColor: '#19191F',
    padding: 6,
    margin: 10,
  },

  searchSeparator: {
    backgroundColor: '#19191F',
    height: 1 / PixelRatio.get(),
  },

  rowSeparator: {
    backgroundColor: '#211F27',
    height: 1 / PixelRatio.get(), 
  },

  searchText: {
    color: '#BFBFBF',
    paddingLeft: 5,
    // fontSize: 12,
    fontWeight: '600',
  },

  actionsView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(33,31,39,0.9)',
  },

  actionText: {
    color: '#CCB3FD',
    fontSize: 17,
  },

  action: {
    margin: 12,
  },
});

module.exports = DrawerScreen;
