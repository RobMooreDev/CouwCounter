import React from 'react';
import {createAppContainer} from 'react-navigation';
import ListContainer from '../Items/ListContainer'
import {createStackNavigator} from "react-navigation-stack";
import ItemAdd from "../Items/ItemAdd";
import Image from "../Items/Image"
import Barcode from "../Items/Barcode"
const ItemStack = createStackNavigator({
    ItemList: {
        screen: ListContainer,
        navigationOptions: {
            headerShown: false
        }
    },
    ItemAdd: {
        screen: ItemAdd,
        navigationOptions: {
            headerShown: false
        }
    },
    Image: {
        screen: Image,
        navigationOptions:{
            headerShown: false
        }
    },
    Barcode: {
        screen: Barcode,
        navigationOptions:{
            headerShown: false
        }
    }
}, {
});

export default createAppContainer(ItemStack);