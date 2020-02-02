import React from 'react';
import {createAppContainer} from 'react-navigation';
import ListContainer from '../Items/ListContainer'
import {createStackNavigator} from "react-navigation-stack";

const ItemStack = createStackNavigator({
    ItemList: {
        screen: ListContainer,
        navigationOptions: {
            headerShown: false
        }
    }
}, {
});

export default createAppContainer(ItemStack);