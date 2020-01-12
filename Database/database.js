import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('couw.db', '1.0');

const database = {
    createTables: () => {
        db.transaction(tx => {
            tx.executeSql(createTables, [], () => {
                console.log('The create table query was successful.');
            }, () => {
                console.log('The create table query failed.')
            })
        }, () => {
            console.log('The create table transaction failed.')
        }, () => {
            console.log('The create table transaction was successful.');
        })
    }
};

// SQL Statements

const createTables =
    `
    BEGIN TRANSACTION;
    CREATE TABLE IF NOT EXISTS "timecard" (
        "timecard_id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "timecard_date"	TEXT NOT NULL DEFAULT 'DATETIME(NOW)',
        "timecard_job"	INTEGER NOT NULL,
        "timecard_net"	REAL,
        FOREIGN KEY("timecard_job") REFERENCES "job"("job_id") ON UPDATE CASCADE ON DELETE CASCADE
    );
    
    CREATE TABLE IF NOT EXISTS "job" (
        "job_id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "job_name"	TEXT NOT NULL,
        "job_description"	TEXT,
        "job_client"	TEXT NOT NULL,
        "job_date"	TEXT NOT NULL DEFAULT 'DATETIME(NOW)',
        "job_rate"	REAL NOT NULL DEFAULT 0.00,
        "job_inventory"	INTEGER,
        "job_completed"	INTEGER NOT NULL DEFAULT 0
    );
    
    CREATE TABLE IF NOT EXISTS "task" (
        "task_id "	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "task_duration"	REAL NOT NULL,
        "task_description"	TEXT NOT NULL,
        "task_gross"	INTEGER NOT NULL DEFAULT 0.00,
        "task_net"	INTEGER NOT NULL DEFAULT 0.00,
        "task_km"	REAL NOT NULL DEFAULT 0.00,
        "task_timecard"	INTEGER NOT NULL,
        FOREIGN KEY("task_timecard") REFERENCES "timecard"("timecard_id") ON UPDATE CASCADE ON DELETE CASCADE
    );
    
    CREATE TABLE IF NOT EXISTS "inventory" (
        "job_id"	INTEGER NOT NULL,
        "item_id"	INTEGER NOT NULL,
        "quantity"	INTEGER NOT NULL DEFAULT 1,
        PRIMARY KEY("job_id","item_id"),
        FOREIGN KEY("job_id") REFERENCES "job"("job_id") ON UPDATE CASCADE ON DELETE SET NULL,
        FOREIGN KEY("item_id") REFERENCES "item"("item_id") ON UPDATE CASCADE ON DELETE SET NULL
    );
    
    CREATE TABLE IF NOT EXISTS "item" (
        "item_id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "item_model"	TEXT NOT NULL,
        "item_brand"	TEXT NOT NULL,
        "item_description"	TEXT,
        "item_barcode"	TEXT,
        "item_image"	TEXT NOT NULL DEFAULT 'image',
        "item_price"	REAL NOT NULL DEFAULT 0.00,
        "item_category"	INTEGER,
        FOREIGN KEY("item_category") REFERENCES "category"("category_id") ON UPDATE CASCADE ON DELETE SET NULL
    );
    
    CREATE TABLE IF NOT EXISTS "category" (
        "category_id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "category_name"	TEXT NOT NULL,
        "category_description"	TEXT,
        "category_color"	TEXT NOT NULL
    );

    CREATE TRIGGER TASK_INSERT
             AFTER INSERT
                ON task
    BEGIN
        UPDATE timecard
           SET timecard_net = (
                   SELECT SUM(task_net) 
                     FROM task
                    WHERE timecard.timecard_id = task_timecard
               ),
               timecard_gross = (
                   SELECT SUM(task_gross) 
                     FROM task
                    WHERE timecard.timecard_id = task_timecard
               ),
               timecard_km = (
                   SELECT SUM(task_km) 
                     FROM task
                    WHERE timecard.timecard_id = task_timecard
               )
         WHERE timecard_id = NEW.task_timecard;
    END;

    CREATE TRIGGER TASK_UPDATE
             AFTER UPDATE
                ON task
    BEGIN
        UPDATE timecard
           SET timecard_net = (
                   SELECT SUM(task_net) 
                     FROM task
                    WHERE timecard.timecard_id = task_timecard
               ),
               timecard_gross = (
                   SELECT SUM(task_gross) 
                     FROM task
                    WHERE timecard.timecard_id = task_timecard
               ),
               timecard_km = (
                   SELECT SUM(task_km) 
                     FROM task
                    WHERE timecard.timecard_id = task_timecard
               )
         WHERE timecard_id = NEW.task_timecard;
    END;
    
    CREATE TRIGGER TIMECARD_TRIGGER
             AFTER UPDATE
                ON timecard
    BEGIN
        UPDATE job
           SET job_net = (
                   SELECT SUM(timecard_net) 
                     FROM timecard
                    WHERE job.job_id = timecard_job
               ),
               job_gross = (
                   SELECT SUM(timecard_gross) 
                     FROM timecard
                    WHERE job.job_id = timecard_job
               ),
               job_km = (
                   SELECT SUM(timecard_km) 
                     FROM timecard
                    WHERE job.job_id = timecard_job
               )
         WHERE job_id = NEW.timecard_job;
    END;
    
    COMMIT;
    `;