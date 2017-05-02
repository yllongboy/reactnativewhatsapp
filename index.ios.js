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
  ListView,
  Image,
  View
} from 'react-native';

import Calls from './app/components/Calls'
import Contacts from './app/components/Contacts'
import Chats from './app/components/Chats'
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'


export default class reactwhatsapp extends Component {

  constructor(props) {
    super(props)
    this.state= {
      selected: 0,
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.leftHeaderContainer}>
            <Text style={styles.logoText}>WhatsApp</Text>
          </View>
          <View style={styles.rightHeaderContainer}>
            <Icon name="search" color='#fff' size={23} style={{ padding:5 }} />
            <Icon name={this._getIcon()} color='#fff' size={23} style={{ padding:5 }} />
            <Icon name="more-vert" color='#fff' size={23} style={{ padding:5 }} />
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
            <Calls tabLabel="CALLS" {...this.props} />
            <Chats tabLabel="CHATS" {...this.props} />
            <Contacts tabLabel="CONTACTS" {...this.props} />
          </ScrollableTabView>
        </View>
      </View>
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

  _onIconPress() {
    if(this.state.selected === 0) {
      this.props.navigator.push({id:'contactselection', type:'calls' })
    } else if (this.state.selected === 1) {
      this.props.navigator.push({id:'contactselection', type:'chats'})
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
  }
});

AppRegistry.registerComponent('reactwhatsapp', () => reactwhatsapp);
