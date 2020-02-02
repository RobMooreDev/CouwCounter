import {Text, View} from "react-native";
import React from "react";
import {Container, Content} from "native-base";
import NavBar from "../Navigation/NavBar";

function Tools(props) {
    return (
        <Container>
            <NavBar
                navigation={props.navigation}
                title={'Tools'}
            />
            <Content>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Tools</Text>
        </View>
            </Content>
        </Container>
    );
}

export default Tools