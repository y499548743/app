import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import Dropdownmenu from 'react-native-dropdownmenus';
import AsyncStorage from '@react-native-community/async-storage';
import Picker from 'react-native-picker';
import Swipeout from 'react-native-swipeout';
import Component from '../../components/Component';

class Detailed extends React.Component {
    constructor() {
        super()
        this.state = {
            year: 2020,
            month: 6,
            detailed: [],
            newDetailed: [],
            AfterDetailed: [],
            payMoney: '',
            receiptMoney: '',
            deleteBtn: [
                {
                    text: '删除',
                    backgroundColor: 'red'
                }
            ]
        }
        this.selectPicker = this.selectPicker.bind(this)
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
        let selectedDate = ''
        let detailedData = [];
        let tempArr = [];
        let newArr = [];
        let afterData = []
        try {
            const after = await AsyncStorage.getItem('AfterDetailed');
            const value = await AsyncStorage.getItem('detailed');
            detailedData = JSON.parse(value)
            afterData = JSON.parse(after)
            this.setState({ detailed: detailedData })
            this.setState({ AfterDetailed: afterData })
            console.log(this.state.detailed)
            console.log(this.state.AfterDetailed, 'after')
            if (this.state.month < 10) {
                selectedDate = `${this.state.year}-0${this.state.month}`
            } else {
                selectedDate = `${this.state.year}-${this.state.month}`
            }
            let filterData = this.state.detailed.filter(item => item.date.substring(0, 7) == selectedDate)
            console.log(filterData)
            this.setState({ detailed: filterData })
            let payData = this.state.detailed.filter(item => item.type == "支出")
            let paysum = 0
            let payMoneyData = payData.map(item => item.money)
            for (let i = 0; i < payMoneyData.length; i++) {
                paysum += Number(payMoneyData[i])
            }
            console.log(paysum)
            this.setState({ payMoney: paysum })
            let receiptData = this.state.detailed.filter(item => item.type == "收入")
            let receiptsum = 0
            let receiptMoneyData = receiptData.map(item => item.money)
            for (let i = 0; i < receiptMoneyData.length; i++) {
                receiptsum += Number(receiptMoneyData[i])
            }
            console.log(receiptsum)
            this.setState({ receiptMoney: receiptsum })
            for (let i = 0; i < this.state.detailed.length; i++) {
                console.log(this.state.detailed[i])
                if (tempArr.indexOf(this.state.detailed[i].date) === -1) {
                    newArr.push({
                        date: this.state.detailed[i].date,
                        origin: [this.state.detailed[i]]
                    })
                    tempArr.push(this.state.detailed[i].date)
                } else {
                    for (let j = 0; j < newArr.length; j++) {
                        if (newArr[j].date == this.state.detailed[i].date) {
                            newArr[j].origin.push(this.state.detailed[i])
                            break
                        }
                    }
                }
            }
            console.log(newArr, 'new')
            this.setState({ newDetailed: newArr })
        } catch (e) {
            console.log('error:', e);
        }
    }

    selectPicker() {
        let year = []
        for (let i = 1990; i <= 2040; i++) {
            year.push(i);
        }
        let data = [
            year,
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        ];
        Picker.init({
            pickerData: data,
            selectedValue: [2020, 6],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择日期',
            onPickerConfirm: async (data) => {
                let detailedData = [];
                let selectedDate = '';
                let tempArr = [];
                let newArr = []
                console.log('选择的值为：', data);
                try {
                    const value = await AsyncStorage.getItem('detailed');
                    detailedData = JSON.parse(value)
                    this.setState({ detailed: detailedData })
                    this.setState({ year: data[0].toString() })
                    this.setState({ month: data[1].toString() })
                    if (data[1].toString() < 10) {
                        selectedDate = `${this.state.year}-0${this.state.month}`
                    } else {
                        selectedDate = `${this.state.year}-${this.state.month}`
                    }
                    console.log(selectedDate)
                    let filterData = this.state.detailed.filter(item => item.date.substring(0, 7) == selectedDate)
                    console.log(filterData)
                    this.setState({ detailed: filterData })
                    let payData = this.state.detailed.filter(item => item.type == "支出")
                    let paysum = 0
                    let payMoneyData = payData.map(item => item.money)
                    for (let i = 0; i < payMoneyData.length; i++) {
                        paysum += Number(payMoneyData[i])
                    }
                    console.log(paysum)
                    this.setState({ payMoney: paysum })
                    let receiptData = this.state.detailed.filter(item => item.type == "收入")
                    let receiptsum = 0
                    let receiptMoneyData = receiptData.map(item => item.money)
                    for (let i = 0; i < receiptMoneyData.length; i++) {
                        receiptsum += Number(receiptMoneyData[i])
                    }
                    console.log(receiptsum)
                    this.setState({ receiptMoney: receiptsum })
                    for (let i = 0; i < this.state.detailed.length; i++) {
                        console.log(this.state.detailed[i])
                        if (tempArr.indexOf(this.state.detailed[i].date) === -1) {
                            newArr.push({
                                date: this.state.detailed[i].date,
                                origin: [this.state.detailed[i]]
                            })
                            tempArr.push(this.state.detailed[i].date)
                        } else {
                            for (let j = 0; j < newArr.length; j++) {
                                if (newArr[j].date == this.state.detailed[i].date) {
                                    newArr[j].origin.push(this.state.detailed[i])
                                    break
                                }
                            }
                        }
                    }
                    console.log(newArr, 'new')
                    this.setState({ newDetailed: newArr })
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
    fn(val) {
        this.setState({
            newDetailed: val
        });
    }

    render() {
        return (<>
            <View style={styles.headerTop}>
                <Text style={{ fontSize: 24, fontWeight: '700' }} >个人记账</Text>
            </View>
            <View style={styles.headerMid}>
                <Text style={styles.tag}>{this.state.year}</Text><Text style={styles.tag}> 收入</Text><Text style={styles.tag}> 支出</Text>
            </View>
            <View style={styles.headerBottom}>
                <View style={[styles.month, { width: '33%', justifyContent: 'center' }]} ><Text style={{ fontSize: 24, marginBottom: 10 }} >{this.state.month}</Text><Text>月</Text><Icon name="arrow-drop-down" onPress={this.selectPicker} /></View><Text style={{ width: '33%', textAlign: 'center' }}>{this.state.receiptMoney}</Text><Text style={{ width: '33%', textAlign: 'center' }}>{this.state.payMoney}</Text>
            </View>
            <ScrollView>
                <FlatList
                    // data={ this.state.newDetailed.length>this.state.AfterDetailed.length&&this.state.AfterDetailed.length!==0?this.state.AfterDetailed:this.state.newDetailed}
                    data={this.state.newDetailed}
                    // data={this.state.AfterDetailed}
                    renderItem={({ item }) => {
                        return (<>
                            <View style={styles.listTop}>
                                <Text style={styles.tag}>{item.date}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>收入 : {eval(item.origin.filter(item => item.type == "收入").map(item => item.money).join("+")) == null ? 0 : eval(item.origin.filter(item => item.type == "收入").map(item => item.money).join("+"))}</Text>
                                    <Text>ㅤ</Text>
                                    <Text>支出 : {eval(item.origin.filter(item => item.type == "支出").map(item => item.money).join("+")) == null ? 0 : eval(item.origin.filter(item => item.type == "支出").map(item => item.money).join("+"))}</Text>
                                </View>
                            </View>

                            {item.origin.map((item, index) => <Component key={item.id} id={item.id} category={item.category} remark={item.remark} type={item.type} money={item.money} date={item.date} fn={this.fn.bind(this)}/>)}
                        </>)
                    }}
                />
            </ScrollView>
        </>)
    }

}

export default Detailed;

const styles = StyleSheet.create({
    headerTop: {
        flexDirection: 'row',
        backgroundColor: '#FFDA44',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
    headerMid: {
        flexDirection: 'row',
        backgroundColor: '#FFDA44',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 30,
    },
    headerBottom: {
        flexDirection: 'row',
        backgroundColor: '#FFDA44',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
    },
    tag: {
        color: "#A6A18E",

    },
    month: {
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'solid',
    },
    separator: {
        height: 2,
        backgroundColor: '#ccc'
    },
    listTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: '#ccc'
    },
    listBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: '#ccc'
    }
})