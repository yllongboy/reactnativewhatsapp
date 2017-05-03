/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  AsyncStorage,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  View
} from 'react-native';

import Calls from './components/Calls'
import Contacts from './components/Contacts'
import Chats from './components/Chats'
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

class HomeAndroid extends Component {

  constructor(props) {
    super(props);
    this.state= {
      selected: 0
    }
  }

  render() {
    return (
      <MenuContext style={{ flex: 1 }}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.leftHeaderContainer}>
              <Text style={styles.logoText}>WhatsApp</Text>
            </View>
            <View style={styles.rightHeaderContainer}>
              <Icon name="search" color='#fff' size={23} style={{ padding:5 }} />
              <Icon name={this._getIcon()}  color='#fff' size={23} style={{ padding:5 }} />
              <Menu onSelect={(value) => alert(`User selected the number ${value}`)}>
                <MenuTrigger>
                  <Icon name="more-vert" color='#fff' size={23} style={{ padding:5 }} />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption value={1}>
                    <Text>Refresh</Text>
                  </MenuOption>
                  <MenuOption value={2}>
                    <Text>Status</Text>
                  </MenuOption>
                  <MenuOption value={3}>
                    <Text>Settings</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <ScrollableTabView
              tabBarUnderlineColor="#fff"
              tabBarUnderlineStyle={{backgroundColor: "#fff"}}
              tabBarBackgroundColor ="#075e54"
              tabBarActiveTextColor="#fff"
              tabBarInactiveTextColor="#88b0ac"
              onChangeTab={(index) => this.handleChangeTab(index)}
              >
              <Calls tabLabel="CALLS"/>
              <Chats tabLabel="CHATS"/>
              <Contacts tabLabel="CONTACTS"/>
            </ScrollableTabView>
          </View>
        </View>
      </MenuContext>
    );
  }

  _getIcon() {
    if(this.state.selected === 0) {
      return "call"
    } else if (this.state.selected === 1) {
      return "chat"
    } else {
      return "person-add"
    }
  }

  handleChangeTab(index) {
    this.setState({selected: index.i});
  }

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    height: 24
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#075e54",
    alignItems:"center",
    paddingTop: 5,
    paddingRight: 5
  },
  leftHeaderContainer: {
    alignItems: "flex-start",
    flexDirection: "row"
  },
  rightHeaderContainer: {
    alignItems: "flex-end",
    flexDirection: "row"
  },
  contentContainer: {
    flex: 6,
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "flex-start",
    marginLeft: 10
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});

module.exports = HomeAndroid
