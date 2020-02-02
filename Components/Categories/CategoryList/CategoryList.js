import {StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {Body, Icon, Input, Left, List, ListItem, Right, View} from "native-base";
import {withNavigation} from "react-navigation";
import database from "../../../Database/database";

function CategoryList(props) {
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const color = props.color;
    const locked = props.locked;
    const beforeEdit = props.name;
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
                <ListItem button onLongPress={(e)=>{
                }} style={styles.listItem} thumbnail>
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


export default withNavigation(CategoryList);