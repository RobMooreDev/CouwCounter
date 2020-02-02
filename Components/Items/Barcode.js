import React, {useState} from "react";
import {StyleSheet, View} from 'react-native';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import {Button, Icon, Text} from 'native-base'
import database from "../../Database/database";

function Barcode(props) {
    const [color, setColor] = useState('');
    const parent = props.navigation.getParam('parent');
    const id = props.navigation.getParam('id');
    const oldColor = props.navigation.getParam('oldColor', '#fefefe');

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 45,
            backgroundColor: '#212021'
        },
        picker: {
            flex: 1,
            marginBottom: 40
        },
        buttonText: {
            color: contrastText(color),
        },
        button: {
            justifyContent: "center",
            backgroundColor: fromHsv(color)
        }
    });

    function contrastText(hex) {
        const threshold = 130;
        function cutHex(hex) {
            return (hex.charAt(0) === "#") ? hex.substring(1, 7) : hex
        }
        const R = parseInt((cutHex(hex)).substring(0, 2), 16);
        const G = parseInt((cutHex(hex)).substring(2, 4), 16);
        const B = parseInt((cutHex(hex)).substring(0, 2), 16);
        const brightness = ((R * 299) + (G * 587) + (B * 114)) / 1000;
        return (brightness > threshold) ? "#000000" : "#FFFFFF"
    }

    return (
        <View style={styles.container}>
            <Icon style={{textAlign:'right', color: '#f2f2f2'}} type='FontAwesome' name='times-circle' onPress={()=>{
                props.navigation.replace((parent === 'CategoryList') ? 'CategoryList' : 'CategoryAdd')
            }}/>
            <ColorPicker
                oldColor={oldColor}
                defaultColor={'lightblue'}
                onColorChange={(color)=>{
                    const newHex = fromHsv(color);
                    setColor(newHex);
                }}
                style={styles.picker}
            />
            <Button style={styles.button} color={color || oldColor} onPress={() => {
                database.updateColor(color, id);
                props.navigation.navigate({
                    routeName: `${parent}`,
                    params: {
                        newColor: fromHsv(color),
                        id: props.id
                    }
                })
            }}><Text style={styles.buttonText}>{(parent === 'CategoryList') ? 'Update Barcode' : 'Set Barcode'}</Text></Button>
        </View>
    );
}

export default Barcode;
