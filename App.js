import React, {useEffect, useState} from 'react';
import database from "./Database/database";
import {AppLoading} from "expo";
import * as Font from 'expo-font';
import Drawer from "./Components/Navigation/Drawer";

database.create();

async function fetchFonts() {
    await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
}

export default function App() {
    const [ready, isReady] = useState(false);
    useEffect(() => {
        fetchFonts().then(() => {
            isReady(true);
        });
    }, []);
    if (ready) {
        return (
            <Drawer/>
        );
    }
    return (
        <AppLoading/>
    )

}