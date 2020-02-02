import {StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {Body, Icon, Input, Left, List, ListItem, Right, View} from "native-base";
import {withNavigation} from "react-navigation";
import database from "../../Database/database";

function ItemList(props) {
    const [model, setModel] = useState(props.model);
    const [brand, setBrand] = useState(props.brand);
    const [description, setDescription] = useState(props.description);
    const [barcode, setBarcode] = useState(props.brand);
    const [image, setImage] = useState(props.model);
    const [price, setPrice] = useState(props.brand);
    const [category, setCategory] = useState(props.model);
    const locked = props.locked;
    const styles = StyleSheet.create({
        name: {
            height: 25,
            fontSize: 20
        },
        description: {
            height: 20,
            fontSize: 14
        },
        colorBox:{
            width: 40,
            height: 40,
            backgroundColor: color
        },
        listItem: {
            padding: 0,
            marginTop: 0
        }
    });
    return (
        <List >
            <ListItem button style={styles.listItem} thumbnail>
                <Left>
                    <TouchableOpacity activeOpacity={locked ? 1 : 0.3} onPress={() => {
                        if (!props.locked) {
                            props.navigation.navigate({
                                routeName: 'SelectColor',
                                params: {
                                    parent: 'CategoryList',
                                    id: props.id,
                                    oldColor: `${color}`
                                }
                            });
                        }
                    }}>
                        <View style={styles.colorBox} />
                    </TouchableOpacity></Left>
                <Body>

                    <Input style={styles.name} returnKeyLabel={'go'} disabled={props.locked} value={name}
                           onSubmitEditing={(e) => {
                               database.editCategory(id, name, description, color);
                               props.refresh()
                           }
                           }
                           onChangeText={value => setName(value)}
                    />
                    <Input style={styles.description} disabled={props.locked} value={description}
                           onChangeText={value => setDescription(value)}
                    />
                </Body>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </ListItem>
        </List>
    )
}


export default withNavigation(ItemList);