import React, {useEffect} from 'react';
import Drawer from './Components/Navigation/Drawer'
import database from "./Database/database";

export default function App() {
    database.create();
    return (
        <Drawer/>
    );
}

