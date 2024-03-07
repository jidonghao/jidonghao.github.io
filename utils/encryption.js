import CryptoJS from 'crypto-js/crypto-js';

function encryption(KeyStr) {
    const secretKey = CryptoJS.enc.Utf8.parse(KeyStr); // YOUR_SECRET_KEY 必须是16字节
    const iv = CryptoJS.enc.Utf8.parse("0000000000000000"); // 长度同样是16字节
    function Encrypt(word) {
        const srcs = CryptoJS.enc.Utf8.parse(word);
        const encrypted = CryptoJS.AES.encrypt(srcs, secretKey, {
            iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString(); // 输出为Base64形式的字符串
    }

    function Decrypt(word) {
        const decrypt = CryptoJS.AES.decrypt(word, secretKey, {
            iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString(); // 转换为Utf8字符串
    }

    return {Encrypt, Decrypt}
}

export default encryption