import {StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {Body, Icon, Text, Left, List, ListItem, Right, View} from "native-base";
import {withNavigation} from "react-navigation";
import database from "../../Database/database";

function ItemList(props) {
    const [id, setID] = useState(props.id);
    const [model, setModel] = useState(props.model);
    const [brand, setBrand] = useState(props.brand);
    const [description, setDescription] = useState(props.description);
    const [barcode, setBarcode] = useState(props.barcode);
    const [image, setImage] = useState(props.image);
    const [price, setPrice] = useState(props.price);
    const [category, setCategory] = useState(props.category);
    const locked = props.locked;
    const styles = StyleSheet.create({

        listItem: {
            padding: 0,
            marginTop: 0
        }
    });
    return (
        <List >
            <ListItem button style={styles.listItem} thumbnail>
                <Left>

                 </Left>
                <Body>
                    <Text>{id}</Text>
                    <Text>{model}</Text>
                    <Text>{brand}</Text>
                    <Text>{description}</Text>
                    <Text>{barcode}</Text>
                    <Text>{image}</Text>
                    <Text>{price}</Text>
                    <Text>{category}</Text>
                </Body>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </ListItem>
        </List>
    )
}


export default withNavigation(ItemList);