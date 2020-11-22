const draftDOM = document.getElementById('draft');
const approvedDOM = document.getElementById('approved');
const obsoleteDOM = document.getElementById('obsolete');

const defaultColors = {
    draft_color: "#2A4860",
    approved_color: "#379683",
    obsolete_color: "#E7717D",
}

const setColors = ({ draft_color, approved_color, obsolete_color }) => {
    draftDOM.value = draft_color;
    approvedDOM.value = approved_color;
    obsoleteDOM.value = obsolete_color;
}

const getColors = () => ({
    draft_color: draftDOM.value,
    approved_color: approvedDOM.value,
    obsolete_color: obsoleteDOM.value,
})

const saveSettings = () => chrome.storage.sync.set(getColors());

const retrieveSettings = () => chrome.storage.sync.get(defaultColors,setColors);

const resetDefaultColors = () => setColors(defaultColors)

document.addEventListener('DOMContentLoaded', retrieveSettings);
document.getElementById('customization-form').addEventListener('submit', saveSettings)
document.getElementById('form-reset').addEventListener('click', resetDefaultColors)

