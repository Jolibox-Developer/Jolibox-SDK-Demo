# Test Cloud Storage API

In test environment, if we are hard to access to the cloud storage through a login account, the read/write operations will be fall back to the local storages. In our case, we use IndexedDB as the local storage.

To verify the read/write operations are implemented correctly, we can use the following steps to test the cloud storage API.

## Steps

- Make sure you have implemented the cloud storage API according to our Demo.
- Call setItem() to write a key-value pair to the storage.
- Open the browser's developer tool and switch to the Application tab.
- Check the IndexedDB storage where the DB name should be the same as the Game ID.
- Verify the key-value pair is stored in the IndexedDB.

## Screenshots

![IndexedDB](./test-storage.png)
