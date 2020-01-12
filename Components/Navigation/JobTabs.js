import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import JobList from '../Jobs/JobList'
import JobAdd from '../Jobs/JobAdd'
import JobEdit from '../Jobs/JobEdit'

const JobTabs = createBottomTabNavigator({
        JobList: {screen: JobList},
        JobAdd: {screen: JobAdd},
        JobEdit: {screen: JobEdit}
    },
);

export default createAppContainer(JobTabs);