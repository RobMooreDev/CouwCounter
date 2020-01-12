import React from 'react'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {createAppContainer} from 'react-navigation'
import {Transition} from 'react-native-reanimated';
import ItemAdd from "./../Items/ItemAdd";
import SelectCategory from "./../Items/SelectCategory";

const ItemSwitch = createAnimatedSwitchNavigator(
    {
        ItemAdd: ItemAdd,
        SelectCategory: SelectCategory,
    },
    {
        // The previous screen will slide to the bottom while the next screen will fade in
        transition: (
            <Transition.Together>
                <Transition.Out
                    type="slide-right"
                    durationMs={400}
                    interpolation="easeIn"
                />
                <Transition.In type="fade" durationMs={500}/>
            </Transition.Together>
        ),
    }
);

export default createAppContainer(ItemSwitch);
