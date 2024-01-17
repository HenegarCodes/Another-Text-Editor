import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Dd & vers
  const jateDB = await openDB("jate", 1);
  // New db
  const dbx = jateDB.transaction("jate", "readwrite");
  // open store
  const storing = dbx.objectStore("jate");
  // Pass through
  const request = storing.put({ id: 1, value: content });
  // Confirm
  const result = await request;
  console.log("data is in datbase", result);
};



// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Db & vers
  const jateDB = await openDB("jate", 1);
  // New process
  const dbx = jateDB.transaction("jate", "readonly");
  // Open store
  const storing = dbx.objectStore("jate");
  // request
  const request = storing.getAll();
  // Confirm
  const result = await request;
  console.log("data is read from datbase", result);
  return result.value;
};

initdb();
