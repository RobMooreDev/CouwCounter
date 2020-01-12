import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import CategoryList from '../Categories/CategoryList'
import CategoryAdd from '../Categories/CategoryAdd'
import CategoryEdit from '../Categories/CategoryEdit'

const CategoryTabs = createBottomTabNavigator({
        CategoryList: {
            screen: CategoryList, navigationOptions: {
                title: 'Categories',
            }
        },
        CategoryAdd: {
            screen: CategoryAdd, navigationOptions: {
                title: 'Add Category',
            }
        },
        CategoryEdit: {
            screen: CategoryEdit, navigationOptions: {
                title: 'Edit Category',
            }
        }
    }, {}
);

export default createAppContainer(CategoryTabs);