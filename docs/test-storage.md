# Test Cloud Storage API

In test environment, if we are hard to access to the cloud storage through a login account, the read/write operations will be fall back to the local storages. In our case, we use IndexedDB as the local storage.

To verify the read/write operations are implemented correctly, we can use the following steps to test the cloud storage API.

## Steps

- Make sure you have implemented the cloud storage API according to our Demo.
- Call setItem() to write a key-value pair to the storage.
- Open the browser's developer tool and switch to the Application tab.
- Check the IndexedDB storage where the DB name should be the same as the Game ID.
- Verify the key-value pair is stored in the IndexedDB.

---

## 测试云存储 API

在测试环境中，如果我们很难通过登录帐户访问云存储，读写操作将回退到本地存储。在我们的情况下，我们使用 IndexedDB 作为本地存储。

为了验证读写操作是否正确实现，我们可以使用以下步骤来测试云存储 API。

## 步骤

- 确保您已根据我们的 Demo 实现了云存储 API。
- 调用 setItem() 将键值对写入存储。
- 打开浏览器的开发者工具并切换到应用程序选项卡。
- 检查 IndexedDB 存储，其中 DB 名称应与游戏 ID 相同。
- 验证键值对是否存储在 IndexedDB 中。

## Screenshots

![IndexedDB](./test-storage.png)
