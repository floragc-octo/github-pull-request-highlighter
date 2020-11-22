function toto() {
    const color = document.getElementById('draft_color').value;

    chrome.storage.sync.set({ draft_color: color }, function () {
        console.log('Settings saved');
    });
}

document.getElementById('customization-form').addEventListener('submit', toto)