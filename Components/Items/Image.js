import React, { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, Button} from 'react-native';
import { Camera } from 'expo-camera';
import {fromHsv} from "react-native-color-picker";

export default function Image(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type}  ref={ref => {
                this.camera = ref;
            }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Switch Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}
                        onPress={async () => {
                            if(this.camera) {
                                let photo = await this.camera.takePictureAsync()
                                props.navigation.navigate({
                                    routeName: `ItemAdd`,
                                    params: {
                                        image: photo.uri
                                    }
                                })
                            }
                        }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Take Photo</Text>
                        <Button title={'Clear image'} onPress={() => {
                            props.navigation.navigate({
                                routeName: 'ItemAdd',
                                params: {
                                    image: ''
                                }
                            })
                        }} />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}