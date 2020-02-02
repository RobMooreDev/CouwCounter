import {Text, View} from "react-native";
import React from "react";
import {Container, Content} from "native-base";
import NavBar from "../Navigation/NavBar";

function JobAdd(props) {
    return (
        <Container>
            <NavBar
                navigation={props.navigation}
                title={'Add Job'}
            />
            <Content>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>JobAdd!</Text>
        </View>
            </Content>
        </Container>
    );
}

export default JobAdd