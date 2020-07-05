import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Echarts } from 'react-native-secharts';
import AsyncStorage from '@react-native-community/async-storage';
import Picker from 'react-native-picker';

class Chart extends React.Component {
    constructor() {
        super()
        this.state = {
            checked: true,
            year: 2020,
            month: 6,
            detailed: [],
            newDetailed: [],
            payChartData: [],
            receiptChartData: []
        }
        this.change = this.change.bind(this)
        this.selectPicker = this.selectPicker.bind(this)
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
    }
    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
            'focus',
            () => {
                this.getData()
            }
        );
    }
    getData = async () => {
        let selectedDate = '';
        let detailedData = [];
        let tempArr = [];
        let newArr = []
        try {
            const value = await AsyncStorage.getItem('detailed');
            detailedData = JSON.parse(value)
            this.setState({ detailed: detailedData })
            console.log(this.state.detailed)
            if (this.state.month < 10) {
                selectedDate = `${this.state.year}-0${this.state.month}`
            } else {
                selectedDate = `${this.state.year}-${this.state.month}`
            }
            let filterData = this.state.detailed.filter(item => item.date.substring(0, 7) == selectedDate)
            console.log(filterData)
            this.setState({ detailed: filterData })
            for (let i = 0; i < this.state.detailed.length; i++) {
                console.log(this.state.detailed[i])
                if (tempArr.indexOf(this.state.detailed[i].category) === -1) {
                    newArr.push({
                        category: this.state.detailed[i].category,
                        origin: [this.state.detailed[i]]
                    })
                    tempArr.push(this.state.detailed[i].category)
                } else {
                    for (let j = 0; j < newArr.length; j++) {
                        if (newArr[j].category == this.state.detailed[i].category) {
                            newArr[j].origin.push(this.state.detailed[i])
                            break
                        }
                    }
                }
            }
            console.log(newArr, 'new')
            this.setState({ newDetailed: newArr })
            let payNewDetailed = newArr.filter(item => item.origin[0].type == "支出")
            let payChartData = []
            for (let i = 0; i < payNewDetailed.length; i++) {
                payChartData.push({ name: payNewDetailed[i].category, value: eval(payNewDetailed[i].origin.map(item => item.money).join("+")) })
            }
            console.log(payNewDetailed, 3344455)
            console.log(payChartData, 'payChart')
            this.setState({ payChartData: payChartData })
            let receiptNewDetailed = newArr.filter(item => item.origin[0].type == "收入")
            let receiptChartData = []
            for (let i = 0; i < receiptNewDetailed.length; i++) {
                receiptChartData.push({ name: receiptNewDetailed[i].category, value: eval(receiptNewDetailed[i].origin.map(item => item.money).join("+")) })
            }
            console.log(receiptNewDetailed, 9999)
            console.log(receiptChartData, 'receiptChart')
            this.setState({ receiptChartData: receiptChartData })
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
                    for (let i = 0; i < this.state.detailed.length; i++) {
                        console.log(this.state.detailed[i])
                        if (tempArr.indexOf(this.state.detailed[i].category) === -1) {
                            newArr.push({
                                category: this.state.detailed[i].category,
                                origin: [this.state.detailed[i]]
                            })
                            tempArr.push(this.state.detailed[i].category)
                        } else {
                            for (let j = 0; j < newArr.length; j++) {
                                if (newArr[j].category == this.state.detailed[i].category) {
                                    newArr[j].origin.push(this.state.detailed[i])
                                    break
                                }
                            }
                        }
                    }
                    console.log(newArr, 'new')
                    this.setState({ newDetailed: newArr })
                    let payNewDetailed = newArr.filter(item => item.origin[0].type == "支出")
                    let payChartData = []
                    for (let i = 0; i < payNewDetailed.length; i++) {
                        payChartData.push({ name: payNewDetailed[i].category, value: eval(payNewDetailed[i].origin.map(item => item.money).join("+")) })
                    }
                    console.log(payNewDetailed, 3344455)
                    console.log(payChartData, 'payChart')
                    this.setState({ payChartData: payChartData })
                    let receiptNewDetailed = newArr.filter(item => item.origin[0].type == "收入")
                    let receiptChartData = []
                    for (let i = 0; i < receiptNewDetailed.length; i++) {
                        receiptChartData.push({ name: receiptNewDetailed[i].category, value: eval(receiptNewDetailed[i].origin.map(item => item.money).join("+")) })
                    }
                    console.log(receiptNewDetailed, 9999)
                    console.log(receiptChartData, 'receiptChart')
                    this.setState({ receiptChartData: receiptChartData })
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
        const option = {
            title: {},
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'horizontal',
                left: 'center',
                data: this.state.checked ? this.state.payChartData.map(item => item.name) : this.state.receiptChartData.map(item => item.name)
            },
            series: [
                {
                    name: '类别',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: this.state.checked ? this.state.payChartData : this.state.receiptChartData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return (<>
            <View style={styles.headerTop}>
                <Text style={{ fontSize: 24, fontWeight: '700' }} >分析报告</Text>
            </View>
            <View style={styles.headerBottom}>
                <Text style={this.state.checked ? styles.btnChecked : styles.btn} onPress={() => this.change()}>支出</Text>
                <Text style={this.state.checked ? styles.btn : styles.btnChecked} onPress={() => this.change()}>收入</Text>
            </View>
            <View style={styles.datePicker}>
                <Text>{this.state.year}年{this.state.month < 10 ? `0${this.state.month}` : this.state.month}月</Text><Icon name="arrow-drop-down" onPress={this.selectPicker} />
            </View>
            <View>
                <Echarts option={option} height={300}></Echarts>
            </View>
            <View style={styles.total}> 
                <Text style={styles.sum}>合计:{this.state.checked ? eval(this.state.payChartData.map(item => item.value).join('+')) : eval(this.state.receiptChartData.map(item => item.value).join('+'))}</Text>
            </View>
        </>)
    }
}

export default Chart;

const styles = StyleSheet.create({
    headerTop: {
        flexDirection: 'row',
        backgroundColor: '#FFDA44',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
    headerBottom: {
        flexDirection: 'row',
        backgroundColor: '#FFDA44',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    datePicker: {
        flexDirection: 'row',
        backgroundColor: '#FFDA44',
        justifyContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
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
    total:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sum:{
        backgroundColor:'#FFDA44',
        paddingLeft:50,
        paddingRight:50,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:5
    }
})