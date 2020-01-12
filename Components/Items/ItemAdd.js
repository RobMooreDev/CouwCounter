import React from "react";
import {Button, Text, View} from "react-native";

function ItemAdd(props) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>ItemAdd!</Text>
            <Button title={'Add Category'} onPress={() => {
                props.navigation.navigate('SelectCategory');
            }}/>
        </View>
    );
}

export default ItemAdd