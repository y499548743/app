import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Alert } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-picker';

class Account extends React.Component {
    constructor() {
        super()
        this.state = {
            checked: true,
            money: '',
            date: '',
            payList: [],
            receiptList: [],
            category: '请选择类别',
            remark: '',
            type: '支出',
            id: ''
        }
        this.selectPicker = this.selectPicker.bind(this)
        this.change = this.change.bind(this)
        this.handleChangeMoney = this.handleChangeMoney.bind(this);
        this.handleChangeRemark = this.handleChangeRemark.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.reset = this.reset.bind(this)
    }
    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
            'focus',
            () => {
                // this.storeData();
                this.getData()
            }
        );
    }
    // componentWillUnmount(){
    //     this.didFocusListener()
    // }
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
            console.log(this.state.payList, 123)
            console.log(this.state.receiptList, 234)
        } catch (e) {
            console.log('error:', e);
        }
    }
    change() {
        this.setState({ checked: !this.state.checked }, () => {
            console.log(this.state.checked, '---')
            if (this.state.checked) {
                this.setState({ type: '支出' })
            } else {
                this.setState({ type: '收入' })
            }
        })
        this.refs.money.clear()
        this.setState({ category: '请选择类别' })
        this.setState({ date: '' })
        this.refs.remark.clear()
    }
    handleChangeMoney(value) {
        this.setState({ money: value });
    }
    handleChangeRemark(value) {
        this.setState({ remark: value });
    }
    selectPicker() {
        let data = [];
        if (this.state.checked) {
            data = this.state.payList.map(item => item.name)
        } else {
            data = this.state.receiptList.map(item => item.name)
        }
        Picker.init({
            pickerData: data,
            selectedValue: [],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择类别',
            onPickerConfirm: data => {
                console.log('选择的值为：', data);
                this.setState({ category: data.toString() })
                console.log(this.state.category, 'category')
            },
            onPickerCancel: () => {
                console.log('取消');
            }
        });

        Picker.show();
    }
    async confirm() {
        let detailedData = []
        try {
            if (this.state.money !== '' && this.state.category !== '' && this.state.date !== '' && this.state.remark !== '') {
                const value = await AsyncStorage.getItem('detailed');
                if (value !== null) {
                    detailedData = JSON.parse(value);
                }
                detailedData.push({ type: this.state.type, money: this.state.money, category: this.state.category, date: this.state.date, remark: this.state.remark, id:parseInt(new Date(+new Date() + 8 * 3600 * 1000).toISOString().split(/-|T|:|Z/).join(""))})
                await AsyncStorage.setItem('detailed', JSON.stringify(detailedData));
                Alert.alert('提示', '添加收支明细成功');
                let de = await AsyncStorage.getItem('detailed');
                console.log(de, 'de')
            } else {
                Alert.alert('提示', '请确认明细信息已全部填写');
            }
        } catch (e) {
            console.log('error:', e);
        }
    }
    cancel() {
        this.refs.money.clear()
        this.setState({ category: '请选择类别' })
        this.setState({ date: '' })
        this.refs.remark.clear()
    }
    async reset() {
        try {
            await AsyncStorage.setItem('detailed', JSON.stringify([]));
        } catch (e) {
            console.log('err', e)
        }
    }
    render() {
        return (<>
            <View style={styles.headerTop}>
                <Text style={{ fontSize: 24, fontWeight: '700' }} onPress={this.reset}>记账</Text>
            </View>
            <View style={styles.headerBottom}>
                <Text style={this.state.checked ? styles.btnChecked : styles.btn} onPress={() => this.change()}>支出</Text>
                <Text style={this.state.checked ? styles.btn : styles.btnChecked} onPress={() => this.change()}>收入</Text>
            </View>
            <View style={styles.accountItem}>
                <Icon name="pay-circle-o1" type="antdesign" style={styles.icon} /><Text>金额</Text><TextInput placeholder="请输入金额" style={styles.input} keyboardType="numeric" onChangeText={this.handleChangeMoney} ref='money' />
            </View>
            <View style={styles.accountItem}>
                <Icon name="grid" type="feather" style={styles.icon} /><Text>类别</Text><Text onPress={this.selectPicker} style={this.state.category == "请选择类别" ? [styles.input, { textAlignVertical: 'center', color: '#969696' }] : [styles.input, { textAlignVertical: 'center' }]} >{this.state.category}</Text>
            </View>
            <View style={styles.accountItem}>
                <Icon name="calendar" type="antdesign" style={styles.icon} /><Text>日期</Text><DatePicker
                    style={styles.input}
                    date={this.state.date}
                    mode='date'
                    androidMode="spinner"
                    placeholder='请选择日期'
                    format='YYYY-MM-DD'
                    confirmBtnText='确定'
                    cancelBtnText='取消'
                    showIcon={false}
                    customStyles={{
                        dateInput: {
                            borderWidth: 0,
                            alignItems: 'flex-start',
                        },
                    }}
                    onDateChange={(date) => { this.setState({ date: date }); console.log(this.state.date, 'date') }}
                />
            </View>
            <View style={styles.accountItem}>
                <Icon name="edit" type="font-awesome" style={styles.icon} /><Text>说明</Text><TextInput placeholder="备注" style={styles.input} onChangeText={this.handleChangeRemark} ref='remark' />
            </View>
            <View style={styles.bottom}>
                <Text style={styles.confirm} onPress={this.confirm}>确定</Text><Text style={styles.cancel} onPress={this.cancel}>取消</Text>
            </View>
        </>)
    }

}

export default Account;

const styles = StyleSheet.create({
    headerTop: {
        flexDirection: 'row',
        backgroundColor: '#FFDA44',
        justifyContent: 'center',
        alignItems: 'center',
        height: 110,
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
    accountItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderBottomWidth: 1
    },
    icon: {
        paddingLeft: 20
    },
    input: {
        width: '100%',
        paddingLeft: 20,
        height: 40
    },
    pickerPlaceholder: {
        width: '100%',
        paddingLeft: 20,
        height: 40,
        color: '#97A2AB'
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30
    },
    confirm: {
        backgroundColor: '#FFDA44',
        color: '#fff',
        paddingTop: 10,
        paddingRight: 70,
        paddingBottom: 10,
        paddingLeft: 70,
        borderRadius: 5
    },
    cancel: {
        backgroundColor: '#CCCCCC',
        color: '#797979',
        paddingTop: 10,
        paddingRight: 70,
        paddingBottom: 10,
        paddingLeft: 70,
        borderRadius: 5
    }
})