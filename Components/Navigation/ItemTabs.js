import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import ItemList from '../Items/ItemList'
import ItemEdit from '../Items/ItemEdit'
import ItemSwitch from "../Items/ItemSwitch";

const ItemTabs = createBottomTabNavigator({
        ItemList: {screen: ItemList},
        ItemAdd: {screen: ItemSwitch},
        ItemEdit: {screen: ItemEdit}
    },
);

export default createAppContainer(ItemTabs);