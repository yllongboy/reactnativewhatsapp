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

class CallBox extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.leftHeaderContainer}>
              <View style={styles.whatsappVCallWrapper}>
                <Icon name="phone" color='#80D9CF' size={15} />
                <Text style={styles.callingText}>WHATSAPP VOICE CALL</Text>
              </View>
              <Text style={styles.nameText}>{this.props.name === undefined ? 'Anonymous' : this.props.name}</Text>
              <Text style={[styles.callingText, {marginTop: 5}]}>CALLING</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Image source={{uri:this.props.image}} style={{flex: 1, backgroundColor: 'gray'}}>
              <View style={{flex: 1}}/>
              <TouchableOpacity onPress={() => this.props.navigator.pop()}>
              <View style={styles.callIconContainer}>
                <Icon name="call-end" color='white' size={35} style={styles.icon} resizeMode='contain' />
              </View>
              </TouchableOpacity>
            </Image>
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity>
              <Icon name="volume-up" color='white' size={25} resizeMode='contain' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigator.push({id:'chatbox', image:this.props.image, name:this.props.name})}>
              <Icon name="chat-bubble" color='white' size={25} resizeMode='contain' />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="mic-off" color='white' size={25} resizeMode='contain' />
            </TouchableOpacity>
          </View>

        </View>
      </View>
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
    flexDirection: "column"
  },
  rightHeaderContainer: {
    alignItems: "flex-end",
    flexDirection: "row"
  },
  contentContainer: {
    flex: 6,
  },
  whatsappVCallWrapper: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 20,
    paddingLeft: 15
  },
  nameText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'normal',
    alignSelf: 'flex-start',
    paddingLeft: 15
  },
  callingText: {
    color: '#80D9CF',
    fontSize: 12,
    fontWeight: 'normal',
    alignSelf: 'flex-start',
    paddingLeft: 15
  },
  footerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#075e54",
    borderColor: "black",
    alignItems:"center",
    paddingRight: 50,
    paddingLeft: 50
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "flex-start",
    marginLeft: 10
  },
  icon: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  callIconContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginBottom: 20,
    width: 60,
    backgroundColor: '#FF032D',
    height: 60,
    alignSelf: "center"
  }
})
module.exports = CallBox
