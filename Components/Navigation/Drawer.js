import React from "react";
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from "react-navigation";
import Home from '../Home'
import JobTabs from './JobTabs'
import CategoryStack from './CategoryStack'
import SettingTabs from './SettingTabs'
import ItemStack from "./ItemStack";


const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Home,
    },
    Jobs: {
        screen: JobTabs,
    },
    Items: {
        screen: ItemStack,
    },
    Categories: {
        screen: CategoryStack
    },
    Settings: {
        screen: SettingTabs,
    },
});

const Drawer = createAppContainer(MyDrawerNavigator);
export default Drawer;