import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ListItem,Icon } from 'react-native-elements';

class DiscoveryInterface extends React.Component{
    constructor(){
        super()
        this.toScreen = this.toScreen.bind(this);
    }
    toScreen(routeName) {
        this.props.navigation.navigate(routeName);
    }
    render(){
        return (<>
        <View style={styles.headerTop}>
           <Text style={{ fontSize: 24, fontWeight: '700' }} >发现</Text> 
        </View>
        <ListItem title="账单" chevron bottomDivider  onPress={() => this.toScreen('AnnualAccount')}/>
        <View>
            <ListItem title="常用功能" style={{marginTop:20}}/>
            <View style={styles.icon}>
                <Icon name="attach-money"  color='#FFDA44' />
                <Icon name="directions-car" color='#FFDA44' />
                <Icon name="baidu" type="entypo" color='#FFDA44'/>
                <Icon name="home" type="octicons" color='#FFDA44' />
            </View>
            <View style={styles.text}>
                <Text style={{width:'25%',textAlign:'center'}}>二手交易</Text>
                <Text style={{width:'25%',textAlign:'center'}}>二手车</Text>
                <Text style={{width:'25%',textAlign:'center'}}>宠物</Text>
                <Text style={{width:'25%',textAlign:'center'}}>家政</Text>
            </View>
        </View>
    </>)
    }
}

export default DiscoveryInterface;

const styles = StyleSheet.create({
    headerTop: {
        flexDirection: 'row',
        backgroundColor: '#FFDA44',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
    icon:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor:'#fff',
        paddingBottom:10
    },
    text:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'#fff',
        paddingBottom:10
    }
})