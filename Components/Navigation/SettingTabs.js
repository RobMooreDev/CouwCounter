import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Tools from '../Settings/Tools'
import BackupRestore from '../Settings/BackupRestore'

const SettingTabs = createBottomTabNavigator({
        Tools: {screen: Tools},
        BackupRestore: {screen: BackupRestore}
    },
);

export default createAppContainer(SettingTabs);