import React from "react";
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from "react-navigation";

import Home from '../Home'
import JobTabs from './JobTabs'
import ItemTabs from './ItemTabs'
import CategoryTabs from './CategoryTabs'
import SettingTabs from './SettingTabs'

const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Home,
    },
    Jobs: {
        screen: JobTabs,
    },
    Items: {
        screen: ItemTabs,
    },
    Categories: {
        screen: CategoryTabs,
    },
    Settings: {
        screen: SettingTabs,
    },
});

const Drawer = createAppContainer(MyDrawerNavigator);
export default Drawer;