import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class ReceiptCategory extends React.Component {
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
        let receiptData = [];
        try {
            if (this.state.name !== '') {
                const value = await AsyncStorage.getItem('receiptList');
                if (value !== null) {
                    receiptData = JSON.parse(value);
                    console.log(value, 111111);
                }
                receiptData.push({ name: this.state.name })
                await AsyncStorage.setItem('receiptList', JSON.stringify(receiptData));
                console.log('receipt')
                Alert.alert('提示', '添加收入类别成功');
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
                <Icon name="left" type="antdesign" onPress={() => this.toScreen('Category')} ></Icon><Text style={{ fontSize: 24, fontWeight: '700' }}>添加收入类别</Text><Text>ㅤ</Text>
            </View>
            <View style={styles.input}>
                <Icon name="sort-variant" type="material-community"></Icon><TextInput placeholder="请输入类别" onChangeText={this.handleChangeText}></TextInput>
            </View>
            <Button title="确定" color="#FFDA44" onPress={() => this.addCategory()}></Button>
        </>)
    }

}

export default ReceiptCategory;

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