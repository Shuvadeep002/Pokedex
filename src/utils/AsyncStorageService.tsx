import EncryptedStorage from 'react-native-encrypted-storage';

export const getItemFromStorage = (key: any) => {
  return new Promise((resolve, reject) => {
    EncryptedStorage.getItem(key)
      .then(resp => {
        resolve(resp || false);
      })
      .catch(err => reject(err));
  });
};

export const setItemInStorage = (data: any) => {
  return new Promise((resolve, reject) => {
    EncryptedStorage.setItem(data.key, data.value)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => reject(err));
  });
};

export const removeItemFromStorage = (key: any) => {
  return new Promise(async (resolve, reject) => {
    EncryptedStorage.removeItem(key)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => reject(err));
  });
};

export const clearStorage = () => {
  return new Promise(async (resolve, reject) => {
    EncryptedStorage.clear()
      .then(resp => {
        resolve(resp);
      })
      .catch(err => reject(err));
  });
};

