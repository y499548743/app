import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';
import AsyncStorage from '@react-native-community/async-storage';

class Component extends React.Component {
    constructor() {
        super()
        this.state = {
            year: 2020,
            month: 6,
            detailed: [],
            AfterDetailed:[],
            deleteBtn: [
                {
                    text: '删除',
                    backgroundColor: 'red',
                    onPress: async () => {
                        let selectedDate = ''
                        let detailedData = [];
                        let tempArr = [];
                        let newArr = []
                        let arr = [];
                        try {
                            const value = await AsyncStorage.getItem('detailed');
                            detailedData = JSON.parse(value)
                            this.setState({ detailed: detailedData })
                            // console.log(this.state.detailed)
                            // console.log(this.props.id);
                            arr = this.state.detailed.filter(item => item.id !== this.props.id)
                            // console.log(arr, '--new')
                            this.setState({ detailed: arr })
                            await AsyncStorage.setItem('detailed', JSON.stringify(this.state.detailed))
                            if (this.state.month < 10) {
                                selectedDate = `${this.state.year}-0${this.state.month}`
                            } else {
                                selectedDate = `${this.state.year}-${this.state.month}`
                            }
                            let filterData = this.state.detailed.filter(item => item.date.substring(0, 7) == selectedDate)
                            // console.log(filterData)
                            this.setState({ detailed: filterData })
                            let payData = this.state.detailed.filter(item => item.type == "支出")
                            let paysum = 0
                            let payMoneyData = payData.map(item => item.money)
                            for (let i = 0; i < payMoneyData.length; i++) {
                                paysum += Number(payMoneyData[i])
                            }
                            // console.log(paysum)
                            this.setState({ payMoney: paysum })
                            let receiptData = this.state.detailed.filter(item => item.type == "收入")
                            let receiptsum = 0
                            let receiptMoneyData = receiptData.map(item => item.money)
                            for (let i = 0; i < receiptMoneyData.length; i++) {
                                receiptsum += Number(receiptMoneyData[i])
                            }
                            // console.log(receiptsum)
                            this.setState({ receiptMoney: receiptsum })
                            for (let i = 0; i < this.state.detailed.length; i++) {
                                // console.log(this.state.detailed[i])
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
                            this.setState({ AfterDetailed: newArr })
                            this.props.fn(this.state.AfterDetailed)
                            // await AsyncStorage.setItem('AfterDetailed', JSON.stringify(this.state.AfterDetailed))
                            // const after= await AsyncStorage.getItem('AfterDetailed');
                            // console.log(JSON.parse(after),11111111111111111111111111111)
                        } catch (e) {
                            console.log('error:', e);
                        }
                    }
                }
            ]
        }
    }

    render() {
        return (<Swipeout right={this.state.deleteBtn}>
            <View style={styles.listBottom}>
                <Text>【{this.props.category}】{this.props.remark}</Text>
                <Text><Text style={this.props.type == "支出" ? '' : { color: '#DADEE1' }}>-</Text>{this.props.money}</Text>
            </View>
        </Swipeout>)
    }

}

export default Component;

const styles = StyleSheet.create({
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