import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Picker from 'react-native-picker';
import AsyncStorage from '@react-native-community/async-storage';
class AnnualAccount extends React.Component {
    constructor() {
        super()
        this.state = {
            year: 2020,
            pay: '',
            receipt: '',
            detailed: [],
            newDetailed: []
        }
        this.toScreen = this.toScreen.bind(this);
        this.selectPicker = this.selectPicker.bind(this)
    }
    toScreen(routeName) {
        this.props.navigation.navigate(routeName);
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
    getData = async () => {
        let detailedData = [];
        let tempArr = [];
        let newArr = [];
        let payMoney = 0;
        let receiptMoney = 0;
        try {
            const value = await AsyncStorage.getItem('detailed');
            detailedData = JSON.parse(value)
            this.setState({ detailed: detailedData })
            console.log(this.state.detailed)
            let filterData = this.state.detailed.filter(item => item.date.substring(0, 4) == this.state.year)
            console.log(filterData)
            this.setState({ detailed: filterData })
            for (let i = 0; i < this.state.detailed.length; i++) {
                console.log(this.state.detailed[i])
                if (tempArr.indexOf(this.state.detailed[i].date.substring(0, 7)) === -1) {
                    newArr.push({
                        date: this.state.detailed[i].date.substring(0, 7),
                        month: this.state.detailed[i].date.substring(5, 7),
                        origin: [this.state.detailed[i]]
                    })
                    tempArr.push(this.state.detailed[i].date.substring(0, 7))
                } else {
                    for (let j = 0; j < newArr.length; j++) {
                        if (newArr[j].date == this.state.detailed[i].date.substring(0, 7)) {
                            newArr[j].origin.push(this.state.detailed[i])
                            break
                        }
                    }
                }
            }
            console.log(newArr, 'new')
            this.setState({ newDetailed: newArr })
            for (let k = 0; k < this.state.newDetailed.length; k++) {
                payMoney += eval(this.state.newDetailed[k].origin.filter(item => item.type == "支出").map(item => item.money).join("+"))
                receiptMoney += eval(this.state.newDetailed[k].origin.filter(item => item.type == "收入").map(item => item.money).join("+"))
            }
            if (isNaN(receiptMoney)) {
                receiptMoney = 0;
            }
            if (isNaN(payMoney)) {
                payMoney = 0;
            }
            console.log(payMoney, 'payMoney')
            console.log(receiptMoney, 'receiptMoney')
            this.setState({ pay: payMoney })
            this.setState({ receipt: receiptMoney })
        } catch (e) {
            console.log('error:', e);
        }
    }

    selectPicker() {
        let year = []
        for (let i = 1990; i <= 2040; i++) {
            year.push(i);
        }
        let data = [year]
        Picker.init({
            pickerData: data,
            selectedValue: [2020, 6],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择年',
            onPickerConfirm: async (data) => {
                let detailedData = [];
                let tempArr = [];
                let newArr = [];
                let payMoney = 0;
                let receiptMoney = 0;
                console.log('选择的值为：', data);
                try {
                    const value = await AsyncStorage.getItem('detailed');
                    detailedData = JSON.parse(value)
                    this.setState({ detailed: detailedData })
                    this.setState({ year: data.toString() })
                    let filterData = this.state.detailed.filter(item => item.date.substring(0, 4) == data.toString())
                    console.log(filterData)
                    this.setState({ detailed: filterData })
                    for (let i = 0; i < this.state.detailed.length; i++) {
                        console.log(this.state.detailed[i])
                        if (tempArr.indexOf(this.state.detailed[i].date.substring(0, 7)) === -1) {
                            newArr.push({
                                date: this.state.detailed[i].date.substring(0, 7),
                                month: this.state.detailed[i].date.substring(5, 7),
                                origin: [this.state.detailed[i]]
                            })
                            tempArr.push(this.state.detailed[i].date.substring(0, 7))
                        } else {
                            for (let j = 0; j < newArr.length; j++) {
                                if (newArr[j].date == this.state.detailed[i].date.substring(0, 7)) {
                                    newArr[j].origin.push(this.state.detailed[i])
                                    break
                                }
                            }
                        }
                    }
                    console.log(newArr, 'new')
                    this.setState({ newDetailed: newArr })
                    for (let k = 0; k < this.state.newDetailed.length; k++) {
                        payMoney += eval(this.state.newDetailed[k].origin.filter(item => item.type == "支出").map(item => item.money).join("+"));
                        receiptMoney += eval(this.state.newDetailed[k].origin.filter(item => item.type == "收入").map(item => item.money).join("+"));
                    }
                    if (isNaN(receiptMoney)) {
                        receiptMoney = 0;
                    }
                    if (isNaN(payMoney)) {
                        payMoney = 0;
                    }
                    console.log(payMoney, 'payMoney')
                    console.log(receiptMoney, 'receiptMoney')
                    this.setState({ pay: payMoney })
                    this.setState({ receipt: receiptMoney })
                } catch (e) {
                    console.log('err', e)
                }

            },
            onPickerCancel: () => {
                console.log('取消');
            }
        });

        Picker.show();
    }
    render() {
        return (<>
            <View style={styles.headerTop}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}><Icon name="left" type="antdesign" onPress={() => this.toScreen('DiscoveryInterface')} /><Text>返回</Text></View>
                <Text style={{ fontSize: 24, fontWeight: '700' }}  >账单</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}><Text>{this.state.year}年</Text><Icon name="arrow-drop-down" onPress={this.selectPicker} /></View>
            </View>
            <View style={styles.headerMid}>
                <Text style={{ textAlign: 'center', color: '#666666', paddingBottom: 10 }}>结余</Text>
                <Text style={{ textAlign: 'center', fontSize: 24 }}>{this.state.receipt - this.state.pay}</Text>
            </View>
            <View style={styles.headerBottom}>
                <Text>收入:{this.state.receipt}</Text>
                <Text>|</Text>
                <Text>支出:{this.state.pay}</Text>
            </View>
            <View style={styles.title}>
                <Text>月份</Text>
                <Text>收入</Text>
                <Text>支出</Text>
                <Text>结余</Text>
            </View>
            <ScrollView>
                <FlatList
                    data={this.state.newDetailed}
                    renderItem={({ item }) => {
                        return (<>
                            <View style={styles.list}>
                                <Text style={{ width: '25%', textAlign: 'center' }}>{item.month.substring(0, 1) == 0 ? item.month.substring(1, 2) : item.month}月</Text>
                                <Text style={{ width: '25%', textAlign: 'center' }}>{eval(item.origin.filter(item => item.type == "收入").map(item => item.money).join("+")) == null ? 0 : eval(item.origin.filter(item => item.type == "收入").map(item => item.money).join("+"))}</Text>
                                <Text style={{ width: '25%', textAlign: 'center' }}>{eval(item.origin.filter(item => item.type == "支出").map(item => item.money).join("+")) == null ? 0 : eval(item.origin.filter(item => item.type == "支出").map(item => item.money).join("+"))}</Text>
                                {/* <Text style={{ width: '25%', textAlign: 'center' }}>{eval(item.origin.filter(item => item.type == "收入").map(item => item.money).join("+"))==null?0:eval(item.origin.filter(item => item.type == "收入").map(item => item.money).join("+")) - eval(item.origin.filter(item => item.type == "支出").map(item => item.money).join("+"))?0:eval(item.origin.filter(item => item.type == "支出").map(item => item.money).join("+"))}</Text> */}
                                <Text style={{ width: '25%', textAlign: 'center' }}>{eval(item.origin.filter(item => item.type == "收入").map(item => item.money).join("+")) - eval(item.origin.filter(item => item.type == "支出").map(item => item.money).join("+"))}</Text>
                            </View>
                        </>)
                    }}
                />
            </ScrollView>
        </>)
    }
}

export default AnnualAccount;

const styles = StyleSheet.create({
    headerTop: {
        flexDirection: 'row',
        backgroundColor: '#FFDA44',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
        paddingLeft: 10,
        paddingRight: 10
    },
    headerMid: {
        backgroundColor: '#FFDA44',
    },
    headerBottom: {
        flexDirection: 'row',
        backgroundColor: '#FFDA44',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingBottom: 10,
        borderStyle: 'solid',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        height: 40
    }
})