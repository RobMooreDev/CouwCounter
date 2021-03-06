import React, {useCallback, useEffect, useState} from "react";
import database from "../../Database/database";
import {Container, Content, List} from 'native-base';
import {NavigationEvents} from 'react-navigation';
import CategoryList from "./ItemList";
import {RefreshControl, SafeAreaView, ScrollView, View} from "react-native";
import NavBar from "../Navigation/NavBar";
import ItemList from "./ItemList";
function ListContainer(props) {
    const [lock, setLock] = useState(true)
    const [list, updateList] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        setTimeout(() => {
            getList();
        }, 500)
    }, []);


    const getList = useCallback(() => {
        setRefreshing(true);
        database.viewAllItems().then((result) => {
            updateList(result)
        })
        updateList(list)
        setRefreshing(false);
    });

    return (
        <Container>
            <SafeAreaView>
                <NavBar navigation={props.navigation} setLock={setLock} title={'Items'}/>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getList}/>}>
                    <NavigationEvents
                        onWillFocus={(event) => {
                                getList();
                        }}
                    />
                    <Content>
                            {list.map((list, i) => {
                                return (
                                    <View key={i}>
                                    <ItemList
                                        id={list.category_id}
                                        model={list.item_model}
                                        brand={list.item_brand}
                                        model={list.item_model}
                                        description={list.item_description}
                                        image={list.item_image}
                                        barcode={list.item_barcode}
                                        price={list.item_price}
                                        category={list.item_category}
                                        props={props.navigation}
                                        locked={lock}
                                        refresh={()=>{
                                            getList();
                                        }}
                                    />
                                    </View>
                                )
                            })}

                    </Content>
                </ScrollView>
            </SafeAreaView>

        </Container>
    )
}

export default ListContainer