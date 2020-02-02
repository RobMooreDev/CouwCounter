import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ListContainer from '../Categories/CategoryList/ListContainer'
import {createStackNavigator} from "react-navigation-stack";
import CategoryAdd from "../Categories/CategoryAdd";
import Color from "../Categories/Color";

const CategoryStack = createStackNavigator({
    CategoryList: {
        screen: ListContainer,
        navigationOptions: {
            headerShown: false
        }
    },
    CategoryAdd: {
        screen: CategoryAdd,
        navigationOptions: {
            headerShown: false
        }
    },
    SelectColor: {
        screen: Color,
        navigationOptions: {
            headerShown: false
        }
    }
}, {
});

export default createAppContainer(CategoryStack);