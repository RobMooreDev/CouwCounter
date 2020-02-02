import React, {useState} from 'react';
import {Body, Button, Header, Icon, Left, Right, Title, View} from 'native-base';

export default function NavBar(props) {
    const [lock, setLock] = useState(true);
    const routeName = props.navigation.state.routeName;
    let lockIcon = (<Button transparent onPress={() => {
        props.setLock(!lock);
        setLock(!lock)
    }}>
        {lock ? <Icon name='lock'/> : <Icon name='unlock'/>}
    </Button>)
    let addIcon = (<Button transparent onPress={() => {
        props.navigation.navigate('CategoryAdd')
    }}>
      <Icon type='FontAwesome' name='plus'/>
    </Button>)
    let icons = (routeName == 'CategoryList') ? (<View><lockIcon/><addIcon/></View>) : null;
    return (

        <Header>
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
                {lockIcon}
                {addIcon}
                <Button transparent onPress={() => {
                    props.navigation.goBack(null);
                }}>
                    <Icon name='arrow-back'/>
                </Button>
            </Right>
        </Header>
    );
}