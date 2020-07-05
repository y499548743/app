import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            account: '',
            password: ''
        }
        this.handleAccount = this.handleAccount.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.login = this.login.bind(this)
    }

    handleAccount(value) {
        this.setState({ account: value });
    }
    handlePassword(value) {
        this.setState({ password: value });
    }
    async login() {
        try {
            if (this.state.account == "yyy" && this.state.password == "123") {
                this.props.navigation.navigate('MyInterface');
                await AsyncStorage.setItem('account', this.state.account);
            } else {
                Alert.alert('提示', '密码或账号错误')
            }
        } catch (e) {
            console.log('err', e)
        }

    }
    render() {
        return (<>
            <View style={{ height: 150 }}></View>
            <View style={styles.input}>
                <Text>账号</Text><TextInput placeholder="请输入账号" onChangeText={this.handleAccount}></TextInput>
            </View>
            <View style={styles.input}>
                <Text>密码</Text><TextInput placeholder="请输入密码" secureTextEntry onChangeText={this.handlePassword}></TextInput>
            </View>
            <View style={styles.login}>
                <Text onPress={this.login}>登录</Text>
            </View>
            <View style={styles.bottom}>
                <Text>找回密码</Text><Text>注册</Text>
            </View>
        </>);
    }

}

export default Login;

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderBottomWidth: 1
    },
    login: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FFDA44',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 50,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    }
})