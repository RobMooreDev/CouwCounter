import {Button, Text, View} from "react-native";
import React from "react";

function SelectCategory(props) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Select category</Text>
            <Button title={'Select'} onPress={() => {
                props.navigation.navigate('ItemAdd', {
                    id: 43
                })
            }}/>
        </View>
    );
}

export default SelectCategory