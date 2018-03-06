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
    View,
    DeviceEventEmitter,
    NativeModules,
    ToastAndroid,
    Platform
} from 'react-native';
/**
 * 作者:ZPengs on 18/3/5
 */
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = { };
export default class App extends Component<Props> {
    
    constructor(props){  
        super(props);  
      
        this.state = {
          pwdCode:'',
        
        };  

        // this.getCallBackTime = this.getCallBackTime.bind(this);
        // this.getDeviceEventEmitterTime = this.getDeviceEventEmitterTime.bind(this);
        // this.getPromiseTime = this.getPromiseTime.bind(this);
       }  
  componentWillMount() {
    DeviceEventEmitter.addListener('EventName', function (msg) {

        console.log(msg);

        ToastAndroid.show("DeviceEventEmitter收到消息:" + "\n" + msg.key, ToastAndroid.SHORT)

    });
}

render() {
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}
                  onPress={()=>{
                    this.getDeviceEventEmitterTime()
                  }}
            >
                RCTDeviceEventEmitter获取时间
            </Text>
            <Text style={styles.welcome}
                  onPress={()=>{
                    this.getCallBackTime();
                  }}
            >
                CallBack获取时间
            </Text>
            <Text style={styles.welcome}
                  onPress={()=>{
                      this.getPromiseTime();
                  }}
            >
                Promise获取时间
            </Text>
        </View>
    );
}

getDeviceEventEmitterTime() {
    NativeModules.TransMissonMoudle.getTime();
}

getCallBackTime() {
    NativeModules.TransMissonMoudle.callBackTime("ZPengs",
        (msg) => {
            console.log(msg);
            ToastAndroid.show("CallBack收到消息:" + "\n" + msg, ToastAndroid.SHORT)

        }
    );

}

getPromiseTime() {
    NativeModules.TransMissonMoudle.sendPromiseTime("ZPengs").then(msg=> {
        console.log("年龄:" + msg.age + "/n" + "时间:" + msg.time);
        ToastAndroid.show("Promise收到消息:" + "\n" + "年龄:" + msg.age + "时间:" + msg.time, ToastAndroid.SHORT)

        this.setState({
            age: msg.age,
            time: msg.time,
        })
    }).catch(error=> {
        console.log(error);
    });
}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
},
welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
},
instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
},
});
