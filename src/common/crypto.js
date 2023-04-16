import CryptoJS from 'crypto-js';

export function AESEncrypt(pureText) {
  const privateKey = process.env.REACT_APP_LOCALSTORAGE_KEY;
  var ciphertext = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(pureText), privateKey).toString());
  return ciphertext;
}

export function AESDecrypt(encryptedText) {
  const privateKey = process.env.REACT_APP_LOCALSTORAGE_KEY;
  try {
    var bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedText), privateKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    return 'Error: Malformed data';
  }
}
