import React, {useState} from "react";
import {StyleSheet, View} from 'react-native';
import {ColorPicker} from 'react-native-color-picker';



function CategoryAdd() {
    const [color, setColor] = useState('');
    return (
        <View style={styles.container}>
            <ColorPicker
                oldColor='purple'
                color={color}
                onColorChange={color => setColor(color)}
                onColorSelected={color => alert(`Color selected: ${color}`)}
                onOldColorSelected={color => alert(`Old color selected: ${color}`)}
                style={{flex: 1}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 45, backgroundColor: '#212021'}
})




export default CategoryAdd;
