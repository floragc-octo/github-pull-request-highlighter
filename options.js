function saveSettings() {
    const draft = document.getElementById('draft').value;
    const approved = document.getElementById('approved').value;
    const obsolete = document.getElementById('obsolete').value;

    chrome.storage.sync.set({
        draft_color: draft,
        approved_color: approved,
        obsolete_color: obsolete,
    }, function () {
        console.log('Settings saved.')
        var status = document.getElementById('status');
        status.textContent = 'Settings saved.';
    });
}

function retrieveSettings() {
    chrome.storage.sync.get({
        draft_color: "#C2CAD0",
        approved_color: "#379683",
        obsolete_color: "#E7717D",
    }, function (items) {
        document.getElementById('draft').value = items.draft_color;
        document.getElementById('approved').value = items.approved_color;
        document.getElementById('obsolete').value = items.obsolete_color;
    });
}

function resetDefaultColors() {
    document.getElementById('draft').value = "#C2CAD0";
    document.getElementById('approved').value = "#379683";
    document.getElementById('obsolete').value = "#E7717D";
}

document.addEventListener('DOMContentLoaded', retrieveSettings);
document.getElementById('customization-form').addEventListener('submit', saveSettings)
document.getElementById('form-reset').addEventListener('click', resetDefaultColors)