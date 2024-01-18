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
  console.log('Update database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log(result);
};



// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Db & vers
  console.log('GET from the database');

  // Create a connection to the database database 
  const jateDb = await openDB('jate', 1);

  // Create a new transaction
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();
  // Get confirmation 
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
