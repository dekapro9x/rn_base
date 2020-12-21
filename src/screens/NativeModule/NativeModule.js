/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// We are importing the native Java module here
import {NativeModules} from 'react-native';
var HelloWorld = NativeModules.HelloWorld;

type Props = {};
export default class App extends Component<Props> {
  // async function to call the Java native method
  async sayHiFromJava() {
    console.log('?????');
    HelloWorld.sayHi(
      (err) => {
        console.log(err);
      },
      (msg) => {
        console.log(msg);
      },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.sayHiFromJava}>
          <Text>Invoke native Java code</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
