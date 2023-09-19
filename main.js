function triggerButtonById(buttonId) {
    const button = document.getElementById(buttonId);

    if (button) {
        button.click();
    } else {
        console.log(`Button with id '${buttonId}' not found.`);
    }
}

function copyToClipboard(elementId) {
    var element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');
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

function clearElement() {
    var element = document.getElementById("qrcode");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function shareText() {
    const shareCode = document.getElementById('originInput').value;
    const qrcode = document.getElementById('qrcode');
    qrcode.style.display = '';

    if (!shareCode) {
        console.log('no input');
        return;
    }

    const shareBasePart = document.getElementById('shareBasePart');
    shareBasePart.style.display = 'flex';
    clearElement();

    if (shareCode.length > 940) {
        qrcodeError.style.display = 'flex';
        qrcode.style.display = 'none';
        qrcode.textContent = 'Too long to convert it to QR code.';
        return;
    }

    const encodedShareCode = encodeURIComponent(shareCode);
    const shareCodeUrl = `${window.location.href}?input=${encodedShareCode}`;
    new QRCode(qrcode, {
        'text': shareCodeUrl,
        'width': 256,
        'height': 256,
        'colorDark': 'black',
        'colorLoght': '#e5e5e5',
        'correctLevel': QRCode.CorrectLevel.M
    });
}


function closeQRCode() {
    var shareBasePart = document.getElementById('shareBasePart');
    shareBasePart.style.display = 'none';
    document.getElementById('qrcodeError').style.display = 'none';
}

async function decryptFile() {
    const originInput = document.getElementById('originInput');
    const ciphertext = originInput.value;
    const successfulResults = []; // 用于记录所有成功的解密结果

    try {
        const response = await fetch('/pwdDir.txt');
        if (!response.ok) {
            throw new Error('Failed to fetch file');
        }

        const fileContent = await response.text();
        const keyLines = fileContent.split('\n');

        for (const key of keyLines) {
            try {
                const decryptedValue = decryptAES256(ciphertext, key.trim());
                if (decryptedValue) {
                    successfulResults.push({
                        key: key.trim(),
                        value: decryptedValue
                    });
                }
            } catch (error) {
                // 处理解密错误，继续尝试下一个密钥
                console.error('Decryption error: ' + error.message);
            }
        }

        if (successfulResults.length > 0) {
            // 输出成功解密的结果
            originInput.value = '#Results are for reference only and not guaranteed for correctness.\n#The following will output all possible keys found and the original text\n#plaintext                        key \n\n' +
                successfulResults.map(result =>
                    `${result.value}                 ${result.key}`
                ).join('\n');
            return successfulResults.map(result => result.value);
        } else {
            originInput.value = 'Decryption failed';
            return 'failed';
        }
    } catch (error) {
        console.error('An error occurred: ' + error.message);
        originInput.value = 'An error occurred: ' + error.message;
        return 'failed';
    }
}