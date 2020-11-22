const draftDOM = document.getElementById('draft');
const approvedDOM = document.getElementById('approved');
const obsoleteDOM = document.getElementById('obsolete');
const obsolescenceDOM = document.getElementById('obsolescense');

const defaultCommonSettings = {
    draft_color: "#2A4860",
    approved_color: "#379683",
    obsolete_color: "#E7717D",
    pr_obsolescence_in_day: "15"
}

const displayCommonSettings = ({ draft_color, approved_color, obsolete_color, pr_obsolescence_in_day }) => {
    draftDOM.value = draft_color;
    approvedDOM.value = approved_color;
    obsoleteDOM.value = obsolete_color;
    obsolescenceDOM.value = pr_obsolescence_in_day;
}

const getCommonSettings = () => ({
    draft_color: draftDOM.value,
    approved_color: approvedDOM.value,
    obsolete_color: obsoleteDOM.value,
    pr_obsolescence_in_day: obsolescenceDOM.value,
})

const saveSettings = () => chrome.storage.sync.set({...getCommonSettings()});

const retrieveSettings = () => chrome.storage.sync.get(defaultCommonSettings, displayCommonSettings);

const resetDefaultCommonSettings = () => displayCommonSettings(defaultCommonSettings)

document.addEventListener('DOMContentLoaded', retrieveSettings);
document.getElementById('customization-form').addEventListener('submit', saveSettings)
document.getElementById('form-reset').addEventListener('click', resetDefaultCommonSettings)
