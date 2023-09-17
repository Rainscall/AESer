function triggerButtonById(buttonId) {
    const button = document.getElementById(buttonId);

    if (button) {
        button.click();
    } else {
        console.log(`Button with id '${buttonId}' not found.`);
    }
}

function copyToClipboard(elementId) {
    // 获取要复制的元素
    var element = document.getElementById(elementId);

    // 选择文本
    element.select();

    // 复制文本到剪贴板
    document.execCommand('copy');

    // 取消文本选择
    window.getSelection().removeAllRanges();
}
function resetInput() {
    document.getElementById('originInput').value = '';
    document.getElementById('pwdInput').value = '';
}

function encryptAES256(plaintext, key) {
    const ciphertext = CryptoJS.AES.encrypt(plaintext, key).toString();
    return ciphertext;
}
function decryptAES256(ciphertext, key) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}