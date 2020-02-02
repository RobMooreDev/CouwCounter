import React, {useState} from "react";
import {Button, StyleSheet, View} from 'react-native';
import {Container, Content, Form, Input, Item, Label} from 'native-base';
import database from "../../Database/database";
import NavBar from "../Navigation/NavBar";

function CategoryAdd(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const color = props.navigation.getParam('newColor', '#232323');
    const textColor = props.navigation.getParam('text', '#f2f2f2');

    const styles = StyleSheet.create({
        colorButton: {
            color: textColor
        }
    });
    return (
        <Container>
            <NavBar
                navigation={props.navigation}
                title={'Add Category'}
            />
            <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Name</Label>
                            <Input placeholder='' onChangeText={(value) => setName(value)}/>
                        </Item>
                        <Item stackedLabel last>
                            <Label>Description</Label>
                            <Input placeholder=''
                                   onChangeText={(value) => setDescription(value)}/>
                        </Item>
                        <Button color={color} style={styles.colorButton} title='Add Barcode' onPress={() => {
                            props.navigation.navigate({
                                routeName: 'SelectColor',
                                params: {
                                    parent: 'CategoryAdd',
                                    oldColor: `${color}`
                                }
                            })
                        }}/>
                        <Button title='Create category' onPress={() => {
                            database.createCategory(name, description, color);
                            database.viewAllCategory().then((result) => {
                                props.navigation.navigate('CategoryList', {
                                    list: result
                                });
                            })
                        }}/>
                    </Form>
            </Content>
        </Container>
    );
}

export default CategoryAdd
