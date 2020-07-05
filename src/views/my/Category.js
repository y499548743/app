import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class Category extends React.Component {
    constructor() {
        super();
        this.state = {
            // PayChecked:true,
            // ReceiptChecked:false,
            checked: true,
            payList: [
                // { name: '交通' },
                // { name: '服装' },
                // { name: '购物' },
                // { name: '餐饮' },
            ],
            receiptList: [
                // { name: '工资' },
                // { name: '兼职' },
                // { name: '理财' },
                // { name: '礼金' },
            ]
        };
        this.change = this.change.bind(this);
        this.toScreen = this.toScreen.bind(this);
        this.delete = this.delete.bind(this);
        
        // this.getData = this.getData.bind(this);
        // this.storeData = this.storeData.bind(this)
        // this.onPayPress = this.onPayPress.bind(this);
        // this.onReceiptPress= this.onReceiptPress.bind(this)
    }
    change() {
        this.setState({ checked: !this.state.checked })
    }
    toScreen(routeName) {
        this.props.navigation.navigate(routeName);
    }
    async delete(index) {
        try {
            if (this.state.checked) {
                let list = this.state.payList;
                list.splice(index, 1)
                this.setState({ payList: list });
                await AsyncStorage.setItem('payList', JSON.stringify(this.state.payList))
            } else {
                let list = this.state.receiptList;
                list.splice(index, 1)
                this.setState({ receiptList: list });
                await AsyncStorage.setItem('receiptList', JSON.stringify(this.state.receiptList))
            }
        } catch (e) {
            console.log('err', e)
        }
    }
    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
            'focus',
            () => {
                this.storeData();
                this.getData()
            }
        );
    }
    componentWillUnmount(){
        this.didFocusListener()
    }
    getData = async () => {
        let payData = [];
        let receiptData = [];
        try {
            const payValue = await AsyncStorage.getItem('payList');
            const receiptValue = await AsyncStorage.getItem('receiptList');
            console.log(payValue, 'payValue');
            console.log(receiptValue, 'receiptValue')
            payData = JSON.parse(payValue)
            receiptData = JSON.parse(receiptValue)
            this.setState({ payList: payData })
            this.setState({ receiptList: receiptData })
        } catch (e) {
            console.log('error:', e);
        }
    }
    storeData = async () => {
        try {
            await AsyncStorage.setItem('payList', this.state.payList)
            await AsyncStorage.setItem('receiptList', this.state.receiptList)
        } catch (e) {
            console.log('error:', e);
        }
    }

    // onPayPress(){
    //     this.setState ({PayChecked:!this.state.PayChecked})
    //     this.setState ({ReceiptChecked:!this.state.ReceiptChecked})
    // }
    // onReceiptPress(){
    //     this.setState ({ReceiptChecked:!this.state.ReceiptChecked})
    //     this.setState ({PayChecked:!this.state.PayChecked})
    // }
    render() {
        return (<>
            <View style={styles.headerTop}>
                <Icon name="left" type="antdesign" onPress={() => this.toScreen('MyInterface')} ></Icon><Text style={{ fontSize: 24, fontWeight: '700' }}  >类别设置</Text><Text>ㅤ</Text>
            </View>
            <View style={styles.headerBottom}>
                {/* <Text style={this.state.PayChecked? styles.btnChecked:styles.btn} onPayPress={this.onPayPress}>支出</Text>
                <Text style={this.state.ReceiptChecked ? styles.btnChecked:styles.btn} onPress={this.onReceiptPress}>收入</Text> */}
                <Text style={this.state.checked ? styles.btnChecked : styles.btn} onPress={this.change}>支出</Text>
                <Text style={this.state.checked ? styles.btn : styles.btnChecked} onPress={this.change}>收入</Text>
            </View>
            <ScrollView>
                <FlatList
                    data={this.state.checked ? this.state.payList : this.state.receiptList}
                    renderItem={({ item, index }) => {
                        return (<View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 40,
                            paddingLeft: 20
                        }}>
                            <Icon name="minuscircle" type="antdesign" color='red' onPress={() => this.delete(index)} />
                            <Text>ㅤ</Text>
                            <Text>{item.name}</Text>
                        </View>)
                    }}
                    ItemSeparatorComponent={() => <View style={styles.separator}></View>}
                />
            </ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40 }}>
                <Text onPress={this.state.checked ? () => this.toScreen('PayCategory') : () => this.toScreen('ReceiptCategory')}>+添加类别</Text>
            </View>
        </>);
    }

}

export default Category;
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
    headerBottom: {
        flexDirection: 'row',
        backgroundColor: '#FFDA44',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    btnChecked: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#666666',
        color: '#FFDA44',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#666666'
    },
    btn: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#FFDA44',
        color: '#666666',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#666666'
    },
    separator: {
        height: 2,
        backgroundColor: '#ccc'
    },

})