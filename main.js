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


function shareText() {
    var shareCode = document.getElementById('originInput').value;
    document.getElementById('qrcode').style.display = '';

    if (!shareCode) {
        console.log('no input');
    } else {
        var shareBasePart = document.getElementById('shareBasePart');
        shareBasePart.style.display = 'flex';
        clearElement();
        if (shareCode.length > 940) {
            shareCode = 'Too long to convert it to QR code.';
            document.getElementById('qrcodeError').style.display = 'flex';
            document.getElementById('qrcode').style.display = 'none';
        } else {
            shareCode = `${encodeURIComponent(shareCode)}`;
            shareCode = window.location.href + '?input=' + shareCode;
            const qrcode = new QRCode('qrcode', {
                'text': shareCode,
                'width': 256,
                'height': 256,
                'colorDark': 'black',
                'colorLoght': '#e5e5e5',
                'correctLevel': QRCode.CorrectLevel.M
            });
        }
        console.log(shareCode);
    }

}

function closeQRCode() {
    var shareBasePart = document.getElementById('shareBasePart');
    shareBasePart.style.display = 'none';
    document.getElementById('qrcodeError').style, display = 'none';
}

function clearElement() {
    var element = document.getElementById("qrcode");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
