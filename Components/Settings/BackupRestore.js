import {Button, View} from "react-native";
import React from "react";
import database from "../../Database/database";

function BackupRestore() {
    return (
        <View>
            <Button title='Backup' onPress={() => {
                database.backup().then((response)=> {
                    alert(`${response ? 'Database successfully backed up.' : 'Database backup has failed.' }`);
                    })
            }}/>
            <Button title='Restore' onPress={() => {
                database.restore().then((response)=> {
                    if (response) {
                        alert(`${response ? 'Database has been successfully restored.' : 'Database restore has failed.' }`);
                    }
                })
            }}/>
            <Button title='Reset' onPress={() => {
                database.reset().then((response)=> {
                    if (response) {
                        alert(`${response ? 'Database has been successfully reset.' : 'Database reset has failed.' }`);
                    }
                })
            }}/>
        </View>
    );
}

export default BackupRestore