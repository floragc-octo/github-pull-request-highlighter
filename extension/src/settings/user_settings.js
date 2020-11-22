const draftDOM = document.getElementById('draft');
const approvedDOM = document.getElementById('approved');
const obsoleteDOM = document.getElementById('obsolete');
const requestChangesDOM = document.getElementById('request-changes');
const reviewRequiredDOM = document.getElementById('review-required');
const obsolescenceDOM = document.getElementById('obsolescense');

const defaultCommonSettings = {
    draft_color: DEFAULT_DRAFT_COLOR,
    approved_color: DEFAULT_APPROVED_COLOR,
    obsolete_color: DEFAULT_OBSOLETE_COLOR,
    request_changes_color: DEFAULT_REQUEST_CHANGES_COLOR,
    review_required_color: DEFAULT_REVIEW_REQUIRED_COLOR,
    pr_obsolescence_in_day: DEFAULT_OBSOLESCENCE_IN_DAY,
}

const displayCommonSettings = ( settings ) => {
    const {
        draft_color, approved_color, obsolete_color, request_changes_color, review_required_color, pr_obsolescence_in_day
    } = settings
    draftDOM.value = draft_color;
    approvedDOM.value = approved_color;
    obsoleteDOM.value = obsolete_color;
    requestChangesDOM.value = request_changes_color;
    reviewRequiredDOM.value = review_required_color;
    obsolescenceDOM.value = pr_obsolescence_in_day;
}

const getCommonSettings = () => ({
    draft_color: draftDOM.value,
    approved_color: approvedDOM.value,
    obsolete_color: obsoleteDOM.value,
    request_changes_color: requestChangesDOM.value,
    review_required_color: reviewRequiredDOM.value,
    pr_obsolescence_in_day: obsolescenceDOM.value,
})

const saveSettings = () => store.set({...getCommonSettings()});

const retrieveSettings = () => store.get(defaultCommonSettings, displayCommonSettings);

const resetDefaultCommonSettings = () => displayCommonSettings(defaultCommonSettings)

document.addEventListener('DOMContentLoaded', retrieveSettings);
document.getElementById('customization-form').addEventListener('submit', saveSettings)
document.getElementById('form-reset').addEventListener('click', resetDefaultCommonSettings)
