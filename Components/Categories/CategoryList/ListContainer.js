import React, {useCallback, useEffect, useState} from "react";
import database from "../../../Database/database";
import {Container, Content, List} from 'native-base';
import {NavigationEvents} from 'react-navigation';
import CategoryList from "./CategoryList";
import {RefreshControl, SafeAreaView, ScrollView, View} from "react-native";
import NavBar from "../../Navigation/NavBar";
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
        database.viewAllCategory().then((result) => {
            updateList(result)
        })
        updateList(list)
        setRefreshing(false);
    });

    return (
        <Container>
            <SafeAreaView>
                <NavBar navigation={props.navigation} setLock={setLock} title={'Categories'}/>
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
                                    <CategoryList
                                        id={list.category_id}
                                        name={list.category_name}
                                        description={list.category_description}
                                        color={list.category_color}
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