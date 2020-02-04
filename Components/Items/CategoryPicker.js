import React, {useEffect, useState} from "react";

import {Form, Icon, Picker} from 'native-base'
import database from "../../Database/database";

function CategoryPicker(props) {
    const [value, setValue] = useState(undefined);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        database.viewAllCategory().then((result) => {
            setCategories(result);
        });
        console.log(categories)
    }, []);

    return (
        <Form>
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down"/>}
                placeholder="Select your SIM"
                textStyle={{color: "#5cb85c"}}
                itemStyle={{
                    backgroundColor: "#d3d3d3",
                    marginLeft: 0,
                    paddingLeft: 10
                }}
                itemTextStyle={{color: '#788ad2'}}
                style={{width: undefined}}
                selectedValue={value}
                onValueChange={(value) => {
                    props.category(value);
                    setValue(value)
                }}
            >
                <Picker.Item key={0} label={'Select a Category'} value={null}/>
                {categories.map((category, i) => {
                    return <Picker.Item key={i + 1} label={`${category.category_name}`} value={category.category_id}/>
                })}
            </Picker>
        </Form>
    );
}

export default CategoryPicker;
