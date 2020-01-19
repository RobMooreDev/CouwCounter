import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from "expo-document-picker";

const directory = FileSystem.documentDirectory + "SQLite/couw.db";
let db = SQLite.openDatabase('couw.db', '1.0', 'SQLite Couw Database', 100000);

let database = {
    backup: async () => {
        try {
            const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (permission.status !== 'granted') {
                throw new Error('permission denied')
            }
            const db = await FileSystem.getInfoAsync(`${directory}`);
            await MediaLibrary.createAssetAsync(`${db.uri}`);
            return true;
        } catch (e) {
            console.log(e.message)
        }
    },
    restore: async () => {
        try {
            const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (permission.status !== 'granted') {
                throw new Error('permission denied')
            }
            const newDB = await DocumentPicker.getDocumentAsync();
            await FileSystem.deleteAsync(`${directory}`);
            await FileSystem.moveAsync({
                from: `${newDB.uri}`,
                to: `${directory}`
            }).then(() => {
                db._db.close();
                db = SQLite.openDatabase('couw.db', '1.0');
            })
            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    },
    create: () => {
        db.transaction(tx => {
            tx.executeSql(`
                PRAGMA foreign_keys = off;
                BEGIN TRANSACTION;
                
                DROP TABLE IF NOT EXISTS cart;
                CREATE TABLE cart (cart_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, cart_item INT REFERENCES item (item_id) ON DELETE SET NULL ON UPDATE CASCADE, cart_job INTEGER REFERENCES job (job_id) ON DELETE CASCADE ON UPDATE CASCADE);
                
                DROP TABLE IF NOT EXISTS category;
                CREATE TABLE category (category_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, category_name TEXT NOT NULL, category_description TEXT, category_color TEXT NOT NULL);
                
                DROP TABLE IF NOT EXISTS item;
                CREATE TABLE item (item_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, item_model TEXT NOT NULL, item_brand TEXT NOT NULL, item_description TEXT, item_barcode TEXT, item_image TEXT NOT NULL DEFAULT 'image', item_price REAL NOT NULL DEFAULT 0.0, item_category INTEGER);
                
                DROP TABLE IF NOT EXISTS job;
                CREATE TABLE job (job_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, job_name TEXT NOT NULL, job_description TEXT, job_client TEXT NOT NULL, job_date TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP), job_completed INTEGER NOT NULL DEFAULT 0, job_rate REAL DEFAULT (0.0) NOT NULL);
                
                DROP TABLE IF NOT EXISTS task;
                CREATE TABLE task (task_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, task_duration REAL NOT NULL, task_description TEXT NOT NULL, task_km REAL NOT NULL DEFAULT 0.0, task_timecard INTEGER NOT NULL REFERENCES timecard ON DELETE CASCADE ON UPDATE CASCADE);
                
                DROP TABLE IF NOT EXISTS timecard;
                CREATE TABLE timecard (timecard_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, timecard_date TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP), timecard_job INTEGER NOT NULL, timecard_total REAL NOT NULL DEFAULT (0), FOREIGN KEY (timecard_job) REFERENCES job (job_id) ON UPDATE CASCADE ON DELETE CASCADE);
                
                COMMIT TRANSACTION;
                PRAGMA foreign_keys = on;
                `, [], () => {
                console.log('Create tables query successful.')
            }, (tx, e) => {
                console.log(e.message);
            })
        }, (e) => {
            console.log(e.message);
        }, () => {
            console.log('Tables have been loaded successfully.');
        })
    },
    reset: () => {
        return new Promise((resolve, reject)=>{
            db.transaction(tx => {
                tx.executeSql(`
                BEGIN TRANSACTION;
                DROP TABLE IF EXISTS cart;      
                DROP TABLE IF EXISTS category;
                DROP TABLE IF EXISTS item;
                DROP TABLE IF EXISTS job;
                DROP TABLE IF EXISTS task;
                DROP TABLE IF EXISTS timecard;
                COMMIT TRANSACTION;
                `, [], () => {
                    resolve(true)
                }, (tx, e) => {
                    reject(false);
                })
            }, (e) => {
                console.log(e.message);
            }, () => {
                database.create();
                console.log('Tables have been dropped successfully.');
            })
        })


    }

};

export default database;