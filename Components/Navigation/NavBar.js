import React, {useState} from 'react';
import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';
import {StatusBar, StyleSheet} from 'react-native';
export default function NavBar(props) {
    const [lock, setLock] = useState(true);
    const routeName = props.navigation.state.routeName;
    const styles = StyleSheet.create({
        barcode: {
            color: props.barcode ? 'lightgreen' : 'white'
        },
        image: {
            color: props.image ? 'lightgreen' : 'white'
        }
    });
    const lockIcon = <Button transparent onPress={() => {
        props.setLock(!lock);
        setLock(!lock)
    }}>
        {lock ? <Icon name='lock'/> : <Icon name='unlock'/>}
    </Button>;
    const addIcon = <Button transparent onPress={() => {
        const routeSwitch = (routeName) => ({
            "CategoryList": "CategoryAdd",
            "ItemList": "ItemAdd",
            "JobList": "JobAdd"
        })[routeName];
        props.navigation.navigate(routeSwitch(routeName));
    }}>
        <Icon type='FontAwesome' name='plus'/>
    </Button>;
    let icons;

    if(`${routeName}`.includes('List')){
        icons = <>
            {lockIcon}
            {addIcon}
        </>;
    }
    if(`${routeName}`.includes('ItemAdd')){
        icons = <>
            <Button transparent onPress={()=>{
                props.navigation.navigate({
                    routeName: 'Image'
                })
            }}>
                <Icon name={'image'} style={styles.image}></Icon>
            </Button>
            <Button transparent onPress={()=>{
                props.navigation.navigate({
                    routeName: 'Barcode'
                })
            }}>
                <Icon name={'barcode'} style={styles.barcode}></Icon>
            </Button>
        </>;
    }
    return (
        <Header style={{marginTop: StatusBar.currentHeight}}>
            <Left>
                <Button transparent onPress={() => {
                    props.navigation.toggleDrawer();
                }}>
                    <Icon name='menu'/>
                </Button>
            </Left>
            <Body>
                <Title>{props.title}</Title>
            </Body>
            <Right>
                {icons}

                <Button transparent onPress={() => {
                    props.navigation.goBack(null);
                }}>
                    <Icon name='arrow-back'/>
                </Button>
            </Right>
        </Header>
    );
}

