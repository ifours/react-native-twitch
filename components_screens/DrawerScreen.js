/* @flow */
'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var SCREEN_WIDTH = Dimensions.get('window').width;
var openDrawerOffset = 75;

var {
  StyleSheet,
  View,
  scrollViewew,
  Image,
  Text,
  ListView,
  TouchableHighlight,
} = React;

var DrawerScreen = React.createClass({
  render: function() {
    var logo = (
      <View style={{alignItems: 'center'}}>
        <Image
          style={styles.logoImg}
          source={{uri: 'http://twitchadvertising.tv/wp-content/uploads/2014/03/logo_white_twitch_effects.png'}}
        />
      </View>
    );

    return (
      <View style={styles.container}>
        {logo}
        <MenuList {...this.props}/>
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
    var activeView = rowID === 'Games' ? { backgroundColor: '#000' } : {};
    var activeText = rowID === 'Games' ? { color: '#CCB3FD' } : { color: '#DBDBEA' };

    return (
      <TouchableHighlight
        onPress={() => this.props.closeDrawer()}
      >
        <View style={[styles.rowView, activeView]}>
          <Image
            style={styles.rowImg}
            source={{uri: rowData.img}}
            tintColor='#DBDBEA'
          />
          <Text style={[styles.rowText, activeText]}>
            {rowData.title}
          </Text>
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
        contentContainerStyle={{marginTop: -20}}
        initialListSize={25}
        dataSource={this.state.dataSource}
        renderSectionHeader={this.renderSectionHeader}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
      />
    );
  }
});

var ratio = (196 / 140),
  imgWidth = 30,
  imgHeight = ratio * imgWidth;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#211F27',
    flex: 1,
    marginRight: openDrawerOffset,
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
    fontSize: 20,
  },

  sectionView: {
    padding: 10,
  },

  sectionText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  logoImg: {
    width: SCREEN_WIDTH - openDrawerOffset - 100,
    height: 100,
    marginTop: 20,
    marginBottom: 20,
  },

  selectedRow: {
    backgroundColor: '#1A191F',
  },

  textRow: {
    color: '#DAD9E9',
  }
});

var menuDataList = [
  {
    section: 'Watch',
    items: [
      { img: 'http://xstream.net/sites/default/files/Icon_game_console.png', title: 'Games' },
      { img: 'http://www.3visiondistribution.com/uploads/images/tv-icon.png', title: 'Channels' },
    ],
  },
  {
    section: 'Promoted games',
    items: [
      { img: 'http://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-140x196.jpg', title: 'League of Legends' },
      { img: 'http://static-cdn.jtvnw.net/ttv-boxart/Hearthstone:%20Heroes%20of%20Warcraft-140x196.jpg', title: 'Hearthstone' },
      { img: 'http://static-cdn.jtvnw.net/ttv-boxart/Dota%202-140x196.jpg', title: 'Dota 2' },
      { img: 'http://static-cdn.jtvnw.net/ttv-boxart/Counter-Strike:%20Global%20Offensive-140x196.jpg', title: 'Counter-Strike' },
      { img: 'http://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-140x196.jpg', title: 'StarCraft 2' },
      { img: 'http://static-cdn.jtvnw.net/ttv-boxart/Heroes%20of%20the%20Storm-140x196.jpg', title: 'Heroes of the Storm' },
    ]
  },
  {
    section: 'Promoted channels',
    items: [
      { img: 'http://static-cdn.jtvnw.net/jtv_user_pictures/riotgames-profile_image-4be3ad99629ac9ba-300x300.jpeg', title: 'Riot Games' },
      { img: 'http://static-cdn.jtvnw.net/jtv_user_pictures/emstarcraft-profile_image-340ca92c394d06e5-300x300.jpeg', title: 'FinestKO' },
      { img: 'http://static-cdn.jtvnw.net/jtv_user_pictures/disstream-profile_image-49cb71b9ba541dcf-300x300.png', title: 'Ellhime' },
      { img: 'http://static-cdn.jtvnw.net/jtv_user_pictures/riotgames-profile_image-4be3ad99629ac9ba-300x300.jpeg', title: 'WolfsGoRawr' },
      { img: 'http://static-cdn.jtvnw.net/jtv_user_pictures/emstarcraft-profile_image-340ca92c394d06e5-300x300.jpeg', title: 'DethridgeCraft' },
      { img: 'http://static-cdn.jtvnw.net/jtv_user_pictures/disstream-profile_image-49cb71b9ba541dcf-300x300.png', title: 'CohhCarnage' },
    ]
  }
]


module.exports = DrawerScreen;
