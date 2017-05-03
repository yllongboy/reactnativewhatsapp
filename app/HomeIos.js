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
  StatusBar,
  View
} from 'react-native';

import Calls from './components/Calls'
import Contacts from './components/Contacts'
import Chats from './components/Chats'
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import SearchBar from 'react-native-searchbar';


class HomeIos extends Component {

  constructor(props) {
    super(props);
    this.state= {
      selected: 0,
      results: []
    }
    this._handleResults = this._handleResults.bind(this);
    this._hideSearchBar = this._hideSearchBar.bind(this);
  }

  _handleResults(results) {
    this.setState({ results });
  }

  _showSearchBar() {
    this.setState({searchBarExist: true});
    this.searchBar.show();
  }

  _hideSearchBar() {
    this.setState({searchBarExist: false});
    this.searchBar.hide();
  }

  _renderHeader() {
    if(!this.state.searchBarExist) {
      return (
        <View style={styles.headerContainer}>
          <View style={styles.leftHeaderContainer}>
            <Text style={styles.logoText}>WhatsApp</Text>
          </View>
          <View style={styles.rightHeaderContainer}>
            <Icon name="search" color='#fff' size={23} style={{ padding:5 }} onPress={() => this._showSearchBar()}/>
            <Icon name={this._getIcon()} onPress={()=> this._onIconPress()} color='#fff' size={23} style={{ padding:5 }} />
            {this._renderMenuHeader()}
          </View>
        </View>
      )
    } else {
      return(
        <View style={{padding: 10}}>
        </View>
      )
    }
  }

  _renderMenuHeader() {
      return(
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
      )
  }
  render() {
    return (
      <MenuContext style={{ flex: 1 }}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
        <View style={styles.mainContainer}>
          {this._renderHeader()}
          <View style={styles.contentContainer}>
            <ScrollableTabView
              tabBarUnderlineColor="#fff"
              tabBarUnderlineStyle={{backgroundColor: "#fff"}}
              tabBarBackgroundColor ="#075e54"
              tabBarActiveTextColor="#fff"
              onScroll={(index) => this._hideSearchBar()}
              tabBarInactiveTextColor="#88b0ac"
              onChangeTab={(index) => this.handleChangeTab(index)}
              >
              <Calls tabLabel="CALLS" {...this.props} />
              <Chats tabLabel="CHATS" {...this.props} />
              <Contacts tabLabel="CONTACTS" {...this.props} />
            </ScrollableTabView>
          </View>
        </View>
        <SearchBar
          ref={(ref) => this.searchBar = ref}
          data={[]}
          handleResults={this._handleResults}
          placeholder="Search..."
          iconColor="#075e54"
          onBack={this._hideSearchBar}
        />
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

module.exports = HomeIos
