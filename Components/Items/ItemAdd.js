import React, {useState} from "react";
import {Button, StyleSheet, View} from 'react-native';
import {Container, Content, Form, Input, Item, Label, Picker} from 'native-base';
import database from "../../Database/database";
import NavBar from "../Navigation/NavBar";
import CategoryPicker from "./CategoryPicker";
import Image from "./Image"
function ItemAdd(props) {
    const [model, setModel] = useState(props.model);
    const [brand, setBrand] = useState(props.brand);
    const [description, setDescription] = useState(props.description);
    const barcode = props.navigation.getParam('barcode', '');
    const image = props.navigation.getParam('image', '');
    const [price, setPrice] = useState(props.brand);
    const [category, setCategory] = useState(props.model);
    console.log(category)
    return (
        <Container>
            <NavBar
                navigation={props.navigation}
                title={'Add Item'}
                image={(image == '') ? false : ()=>{}}
                barcode={(barcode == '') ? false : true}
            />
            <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Brand</Label>
                            <Input placeholder='' onChangeText={(value) => setBrand(value)}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Model</Label>
                            <Input placeholder='' onChangeText={(value) => setModel(value)}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Description</Label>
                            <Input placeholder='' onChangeText={(value) => setDescription(value)}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Price</Label>
                            <Input placeholder='' onChangeText={(value) => setPrice(value)}/>
                        </Item>
                        <CategoryPicker category={setCategory}/>
                        <Button title='Create item' onPress={() => {
                            console.log(`
                                brand: ${brand}
                                model: ${model} 
                                description: ${description} 
                                barcode: ${barcode} 
                                image: ${image} 
                                price: ${price} 
                                category: ${category} 
                            `)
                            database.createItem(model, brand, description, barcode, image, price, category);
                            database.viewAllItems().then((result) => {
                                props.navigation.navigate('ItemList', {
                                    list: result
                                });
                            })
                        }}/>
                    </Form>
            </Content>
        </Container>
    );
}

export default ItemAdd
