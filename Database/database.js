import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from "expo-document-picker";

const directory = `${FileSystem.documentDirectory}SQLite/couw.db`;
let db = SQLite.openDatabase('couw.db', '1.0', 'SQLite Couw Database', 100000);

let database = {
    backup: async () => {
        try {
            let permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (permission.status !== 'granted') {
                throw new Error('permission denied')
            }
            console.log(permission);
            const db = await FileSystem.getInfoAsync(directory);
            console.log(db);
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
            await FileSystem.deleteAsync(directory);
            await FileSystem.moveAsync({
                from: `${newDB.uri}`,
                to: directory
            }).then(() => {
                db._db.close();
                db = SQLite.openDatabase('couw.db', '1.0');
            });
            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    },
    create: () => {
        db.transaction(tx => {
            tx.executeSql(`
                CREATE TABLE IF NOT EXISTS category (category_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, category_name TEXT NOT NULL, category_description TEXT, category_color TEXT NOT NULL);
                `, [], (tx, result) => {
            }, (tx, e) => {
                console.log('create error');
            })
        }, (e) => {
            console.log('create tx error');
        }, () => {
            console.log('Tables have been loaded successfully.');
        })
    },
    reset: () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`
                DROP TABLE IF EXISTS category;
                `, [], () => {
                    resolve(true)
                }, (tx, e) => {
                    reject(false);
                })
            }, (e) => {
                console.log('reset error');
            }, () => {
                database.create();
                console.log('Tables have been dropped successfully.');
            })
        })
    },

    editCategory: (id, name, description, color) => {
        console.log(id);
        console.log(name);
        console.log(description);
        console.log(color);

        db.transaction(tx => {
            tx.executeSql(`
               UPDATE category
               SET category_name = ?,
               category_description = ?,
               category_color = ?
               WHERE category_id = ?
                `, [name, description, color, id], (tx, result) => {
                console.log(result);
            }, (tx, e) => {
                console.log(e.message);
            })
        }, (e) => {
            console.log('update error2');
        }, () => {
            database.create();
            console.log('Category updated successfully.');
        })
    },
    createCategory: (name, description, color) => {
        db.transaction(tx => {
            tx.executeSql(`
                INSERT INTO CATEGORY(category_name, category_description, category_color) VALUES (?, ?, ?);
                `, [name, description, color], (tx, result) => {
                console.log(result);
            }, (tx, e) => {
                console.log('create error');
            })
        }, (e) => {
            console.log('create error');
        }, () => {
            database.create();
            console.log('Category created successfully.');
        })
    },
    updateColor: (color, id)=> {
        db.transaction(tx => {
            tx.executeSql(`
              UPDATE category SET category_color = ? WHERE category_id = ?
                `, [color, id], (tx, result) => {
                console.log('worked');
                console.log(result);
            }, (tx, e) => {
                console.log('create error');
            })
        }, (e) => {
            console.log('create error');
        }, () => {
            console.log('updated color successfully.');
        })
    },
    viewAllCategory: () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`
                SELECT * FROM category;
                `, [], (tx, results) => {
                    let list = [];
                    results.rows._array.map((row, i) => {
                        list.push(row);
                    });
                    resolve(list);
                }, (tx, e) => {
                    console.log('list error');
                })
            })
        }, (e) => {
            console.log('view tx error');
        }, () => {
            database.create();
            console.log('view was successfully.');
        })
    },
    viewAllItems: () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`
                SELECT * FROM item;
                `, [], (tx, results) => {
                    let list = [];
                    results.rows._array.map((row, i) => {
                        list.push(row);
                    });
                    resolve(list);
                }, (tx, e) => {
                    console.log('list error');
                })
            })
        }, (e) => {
            console.log('view tx error');
        }, () => {
            database.create();
            console.log('view was successfully.');
        })
    },
    createItem: (model, brand, description, barcode, image, price, category) => {
        db.transaction(tx => {
            tx.executeSql(`
                INSERT INTO CATEGORY(item_model, item_brand, item_description, item_barcode, item_image, item_price, item_category) VALUES (?, ?, ?, ?, ?, ? ,?);
                `, [model, brand, description, barcode, image, price, category], (tx, result) => {
                console.log(result);
            }, (tx, e) => {
                console.log('create error');
            })
        }, (e) => {
            console.log('create error');
        }, () => {
            database.create();
            console.log('Category created successfully.');
        })
    },
};

export default database;