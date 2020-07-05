import React from 'react';
import { ScrollView, View, Text ,StyleSheet,Switch} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class MyInterface extends React.Component {
    constructor() {
        super();
        this.state = {
            account:"未登录",
            login:false,
        };
        this.toScreen = this.toScreen.bind(this);
        this.exit=this.exit.bind(this)
    }
    componentDidMount(){
        this.didFocusListener = this.props.navigation.addListener(
            'focus',
            () => {
                this.getAccount();
            }
        );
    }
    componentWillUnmount(){
        this.didFocusListener()
    }
    getAccount= async () =>{
        let user='';
        try{
            const user=await AsyncStorage.getItem('account');
            if(user!=='未登录'){
                this.setState({ account: user })
                this.setState({login:true})
                console.log(this.state.account,'acc')
            }
        }catch(e){
            console.log('err',e)
        }
    }
    toScreen(routeName){
        this.props.navigation.navigate(routeName);
    }
    exit(){
        this.setState({ account: '未登录' })
        this.setState({login:false})
    }
    render() {
        return (<>
            <View style={styles.headerTop}>
                <Icon name="pay-circle1" color="#BDBDBD" type="antdesign" ></Icon><Text onPress={this.state.login?this.toScreen('MyInterface'):()=>this.toScreen('Login')}>{this.state.account}</Text>
            </View>
            <View style={styles.headerBottom}>
                <Text>已连续打卡</Text>
                <Text>已记录天数</Text>
                <Text>总笔数</Text>
            </View>
            <ListItem title="徽章" chevron bottomDivider leftIcon={{ name: 'badge', type: 'simple-line-icon' }} />
            <ListItem title="类别设置" chevron bottomDivider leftIcon={{ name: 'command', type: 'feather' }} onPress={()=>this.toScreen('Category')} />
            <ListItem title="定时提醒" chevron bottomDivider leftIcon={{ name: 'clockcircleo', type: 'antdesign' }} />
            <ListItem title="声音开关"  bottomDivider leftIcon={{ name: 'sound', type: 'antdesign' }}  switch/>
            <ListItem title="明细详情"  bottomDivider leftIcon={{ name: 'profile', type: 'antdesign' }} switch/>
            <ListItem title="升级至专业版" chevron bottomDivider leftIcon={{ name: 'diamond', type: 'font-awesome' }} />
            <ListItem title="推荐给好友" chevron bottomDivider leftIcon={{ name: 'export', type: 'antdesign' }} />
            <View style={this.state.login?styles.exit:styles.hide}>
                <Text onPress={()=>{this.exit()}}>退出登录</Text>
            </View>
        </>);
    }
}


export default MyInterface;

const styles=StyleSheet.create({
    headerTop:{
        flexDirection:'row',
        backgroundColor:'#FFDA44',
        justifyContent: 'center',
        alignItems:'center',
        height:120,
    },
    headerBottom:{
        flexDirection:'row',
        backgroundColor:'#FFDA44',
        justifyContent: 'space-around',
        alignItems:'center',
        height:40
    },
    exit:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#fff',
        height:50,
        marginTop:80
    },
    hide:{
        display:'none'
    }
})