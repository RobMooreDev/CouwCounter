import {Text, View} from "react-native";
import React from "react";
import {Container, Content} from "native-base";
import NavBar from "../Navigation/NavBar";

function JobList(props) {
    return (
        <Container>
            <NavBar
                navigation={props.navigation}
                title={'List Jobs'}
            />
            <Content>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>JobList!</Text>
        </View>
            </Content>
        </Container>
    );
}

export default JobList