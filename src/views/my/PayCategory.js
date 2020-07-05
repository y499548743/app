import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class PayCategory extends React.Component {
    constructor() {
        super();
        this.state = {
            name: ''
        };
        this.toScreen = this.toScreen.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.addCategory = this.addCategory.bind(this)
    }
    toScreen(routeName) {
        this.props.navigation.navigate(routeName);
    }
    handleChangeText(value) {
        this.setState({ name: value });
    }
    async addCategory() {
        let payData = [];
        try {
            if (this.state.name !== '') {
                const value = await AsyncStorage.getItem('payList');
                if (value !== null) {
                    payData = JSON.parse(value);
                    console.log(value, 111111);
                }
                payData.push({ name: this.state.name })
                await AsyncStorage.setItem('payList', JSON.stringify(payData));
                console.log('pay')
                Alert.alert('提示', '添加支出类别成功');
            }else{
                Alert.alert('提示', '不能为空');
            }
        } catch (e) {
            console.log('error:', e);
        }
    }

    render() {
        return (<>
            <View style={styles.headerTop}>
                <Icon name="left" type="antdesign" onPress={() => this.toScreen('Category')} ></Icon><Text style={{ fontSize: 24, fontWeight: '700' }}>添加支出类别</Text><Text>ㅤ</Text>
            </View>
            <View style={styles.input}>
                <Icon name="sort-variant" type="material-community"></Icon><TextInput placeholder="请输入类别" onChangeText={this.handleChangeText}></TextInput>
            </View>
            <Button title="确定" color="#FFDA44" onPress={() => this.addCategory()}></Button>
        </>)
    }

}

export default PayCategory;

const styles = StyleSheet.create({
    headerTop: {
        flexDirection: 'row',
        backgroundColor: '#FFDA44',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 110,
        paddingLeft: 10,
        paddingRight: 30
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#666666',
        paddingLeft: 10,
        marginBottom: 10
    }
})