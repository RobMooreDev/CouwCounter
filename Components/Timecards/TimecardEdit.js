import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import TimecardList from '../../Timecard/TimecardList'
import TimecardAdd from '../../Timecard/TimecardAdd'
import TimecardEdit from '../../Timecard/TimecardEdit'

const TimecardTabs = createBottomTabNavigator({
        TimecardList: {screen: TimecardList},
        TimecardAdd: {screen: TimecardAdd},
        TimecardEdit: {screen: TimecardEdit}
    },
);

export default createAppContainer(TimecardTabs);