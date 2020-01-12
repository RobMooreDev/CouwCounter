import React from 'react';
import * as FileSystem from 'expo-file-system';
import Drawer from "./Components/Navigation/Drawer";

let createTable = () => {
    FileSystem.readAsStringAsync(FileSystem.documentDirectory + '/sql/couw.db').then(({string}) => {
        console.log(string);
    })
        .catch(error => {
            console.error(error);
        });
};

export default function App() {
    createTable();
    return (
        <Drawer/>
    );
}


