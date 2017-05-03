'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  ListView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

const messages=[]
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})

class ChatBox extends Component {

  constructor(props) {
    super(props);
    this.state= {
      msgTxt: '',
      datasource: ds.cloneWithRows(messages),
    }
  }

  _onSendMsg() {
    messages.push({
      person: 1,
      msgTxt: this.state.msgTxt
    });

    this.setState({
      datasource: ds.cloneWithRows(messages.reverse()),
      msgTxt: ''
    })
  }

  render() {
    return (
      <MenuContext style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.leftHeaderContainer}>
              <Icon name="arrow-back" color='#fff' size={23} style={{ padding:5 }} onPress={() => this.props.navigator.pop()}/>
              <Image source={{uri:this.props.image}} style={styles.initStyle} resizeMode='contain' />
              <Text style={styles.nameText}>{this.props.name}</Text>
            </View>
            <View style={styles.rightHeaderContainer}>
            <TouchableOpacity onPress={() => {this.props.navigator.push({id:'callbox', image:this.props.image, name:this.props.name}) }}>
              <Icon name="call" color='#fff' size={23} style={{ padding:5 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="attach-file" color='#fff' size={23} style={{ padding:5 }} />
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
            <Image source={require('../images/chatbg.jpg')} >
              <ScrollView >
                <View style={styles.listItemContainer}>
                <ListView
                  initialListSize={5}
                  contentContainerStyle={{ justifyContent:'flex-end' }}
                  style={{ flex:1, }}
                  enableEmptySections={true}
                  dataSource={this.state.datasource}
                  renderRow={(msg) => { return this._renderEachMsg(msg) }} />
                  <Text style={{backgroundColor: 'rgba(0,0,0,0)'}}>{this.state.messages}</Text>
                </View>
              </ScrollView>
            </Image>
          </View>
          <View style={styles.footerContainer}>
            <View style={styles.inputContainer}>
              <TouchableOpacity>
                <Icon name="mood" color='#C5C6C7' size={27} style={{ padding:5, marginLeft:5 }} />
              </TouchableOpacity>
              <TextInput
                placeholder="Type a message..."
                placeholderTextColor="#EDEDED"
                selectionColor="white"
                onChangeText={(msgTxt) => this.setState({ msgTxt })}
                style={styles.input}
                autoCapitalize= "none"
                autoCorrect= {false}
                returnKeyType="next"
              >
              </TextInput>
            </View>
            <View style={styles.sendIconContainer}>
              <TouchableOpacity onPress={() => console.log('message entered')}>
                <Icon name="send" color='#fff' size={25} style={styles.icon} resizeMode='contain' />
              </TouchableOpacity>
            </View>
            </View>

        </View>
      </MenuContext>
    )
  }

  _renderEachMsg(msg) {
    return (
      <TouchableOpacity>
        <View style = {styles.listItemContainer}>
          <Text style={{fontWeight: 'bold'}}>{msg.msgTxt}</Text>
        </View>
      </TouchableOpacity>
    )
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
  nameText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingLeft: 7
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
  logoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "flex-start",
    marginLeft: 10
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginLeft: 10,
    borderRadius: 5
  },
  input: {
    flex: 1,
    height: 50,
    borderBottomColor: "blue",
    fontSize: 16,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  initStyle: {
    borderRadius: 16,
    width: 35,
    height: 35
  },
  icon: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  sendIconContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    margin: 5,
    width: 50,
    backgroundColor: '#075e54',
    height: 50,
    alignSelf: "center"
  }
})
module.exports = ChatBox
