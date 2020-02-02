import {Button, View} from "react-native";
import React from "react";

function Home(props) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button title={'Jobs'} onPress={() => {
                props.navigation.navigate({
                    routeName: 'JobList'
                })
            }}>
            </Button>
        </View>
    );
}


export default Home