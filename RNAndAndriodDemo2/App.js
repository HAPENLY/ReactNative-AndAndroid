/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/**
 * 作者:ZPengs on 18/3/5
 */
import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  NativeModules,
  ToastAndroid,
  DeviceEventEmitter
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  componentWillMount() {
    let result = NativeModules.commModule.Constant;
    console.log('原生端返回的常量值为：' + result);
  }
 /**
  * 接收原生调用
  */
 componentDidMount() {
     DeviceEventEmitter.addListener('nativeCallRn',(msg)=>{
          title = "React Native界面,收到数据：" + global.patchImgNames;
          ToastAndroid.show("发送成功", ToastAndroid.SHORT);
     })
 }
 /**
  * 调用原生代码
  */
  skipNativeCall() {
     let phone = '11111111111111111111';
     NativeModules.commModule.rnCallNative(phone);
  }
 /**
  * Callback 通信方式
  */
  callbackComm(msg) {
      NativeModules.commModule.rnCallNativeFromCallback(msg,(result) => {
           ToastAndroid.show("CallBack收到消息:" + result, ToastAndroid.SHORT);
      })
  }
  /**
   * Promise 通信方式
   */
  promiseComm(msg) {
      NativeModules.commModule.rnCallNativeFromPromise(msg).then(
          (result) =>{
              ToastAndroid.show("Promise收到消息:" + result, ToastAndroid.SHORT)
          }
      ).catch((error) =>{console.log(error)});
  }
render() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome} >

      </Text>
       <Text style={styles.welcome} onPress={this.skipNativeCall.bind(this)}>
        向 Native 发送信息 或者调用 Native 方法
       </Text>
       <Text style={styles.welcome} onPress={this.callbackComm.bind(this,'callback发送啦')}>
          Callback通信方式
       </Text>
       <Text style={styles.welcome} onPress={this.promiseComm.bind(this,'promise发送啦')}>
          Promise通信方式
       </Text>
     
    </View>
  );
}
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
},
welcome: {
  fontSize: 20,
  textAlign: 'center',
  margin: 10,
}
});
