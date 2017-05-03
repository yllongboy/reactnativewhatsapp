'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  View
} from 'react-native'

import { fetch } from 'fetch';
import { WHATSAPP_CONTACTS_API } from '../data/data';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})


class ContactSelection extends Component {

  constructor(props) {
    super(props)
    this.state = {
      peopleDataSource: ds.cloneWithRows([]),
      loaded: false
    }
  }

  _nextScreen(person) {
    if(this.props.type === 'chats') {
      this.props.navigator.push({id:'chatbox', image:person.image, name:person.first_name})
    } else if (this.props.type === 'calls') {
      this.props.navigator.push({id:'callbox', image:person.image, name:person.first_name})
    }
  }

  render() {
    if(this.state.loaded) {
      return (

        <MenuContext style={{ flex: 1 }}>
          <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.leftHeaderContainer}>
                <Icon name="arrow-back" color='#fff' size={23} style={{ padding:5 }} onPress={() => this.props.navigator.pop()}/>
                <Text style={styles.nameText}>Select Contacts</Text>
              </View>
              <View style={styles.rightHeaderContainer}>
              <TouchableOpacity>
                <Icon name="search" color='#fff' size={23} style={{ padding:5 }} />
              </TouchableOpacity>
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
              <ListView
                initialListSize={5}
                enableEmptySections={true}
                dataSource={this.state.peopleDataSource}
                renderRow={(person) => { return this._renderPersonRow(person) }} />
            </View>
          </View>
        </MenuContext>
      )
    } else {
      return (<Text>Retrieving Contacts...</Text>)
    }
  }

  _renderPersonRow(person) {
    return (
      <TouchableOpacity onPress={() => this._nextScreen(person)}>
        <View style = {styles.listItemContainer}>
          <View style= {styles.iconContainer}>
            <Image source={{uri:person.image}} style={styles.initStyle} resizeMode='contain' />
          </View>
          <View style = {styles.callerDetailsContainer}>
            <View style={styles.callerDetailsContainerWrap}>
              <View style={styles.nameContainer}>
                <Text style={{fontWeight: 'bold'}}>{person.first_name}</Text>
              </View>
              <View style={styles.dateContainer}>
                <Text style={{fontSize: 11}}>{person.mobile ? 'MOBILE' : 'WORK'}</Text>
              </View>
            </View>
            <View style={styles.messageContainer}>
              <Text numberOfLines={1} style={{flex: 1, fontSize: 12, color: '#777' }}>{person.message}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  componentDidMount() {
    fetch(WHATSAPP_CONTACTS_API)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          peopleDataSource: ds.cloneWithRows(data),
          loaded: true
        })
        console.log('Response from API:', data);
      });
  }

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
  nameText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingLeft: 7
  },
  contentContainer: {
    flex: 6,
  },
  footerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: "black",
    alignItems:"center",
    paddingRight: 5
  },
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-start"
  },
  callerDetailsContainer: {
    flex: 4,
    justifyContent: "center",
    borderBottomColor: "rgba(92,94,94,0.5)",
    borderBottomWidth: 0.25
  },
  callerDetailsContainerWrap: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row"
  },
  nameContainer: {
    alignItems: "flex-start",
    flex: 1
  },
  dateContainer: {
    alignItems: "flex-end"
  },
  messageContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  initStyle: {
    borderRadius: 30,
    width: 60,
    height: 60
  }
})
module.exports = ContactSelection
