window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const inputParam = urlParams.get('input');
    document.getElementById('originInput').value = inputParam;
}
