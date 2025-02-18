import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync('chronos.db');

export const createElectivesTable = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS electives (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      courseId TEXT NOT NULL,
      courseName TEXT NOT NULL,
      electiveTag TEXT NOT NULL,
      UNIQUE(courseId)
    );
  `);
  console.log('Electives table created or already exists');
};

