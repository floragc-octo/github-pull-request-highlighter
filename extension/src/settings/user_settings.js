const draftDOM = document.getElementById('draft')
const approvedDOM = document.getElementById('approved')
const obsoleteDOM = document.getElementById('obsolete')
const requestChangesDOM = document.getElementById('request-changes')
const reviewRequiredDOM = document.getElementById('review-required')
const obsolescenceDOM = document.getElementById('obsolescence')

const defaultCommonSettings = {
  draftColor: DEFAULT_DRAFT_COLOR,
  approvedColor: DEFAULT_APPROVED_COLOR,
  obsoleteColor: DEFAULT_OBSOLETE_COLOR,
  requestChangesColor: DEFAULT_REQUEST_CHANGES_COLOR,
  reviewRequiredColor: DEFAULT_REVIEW_REQUIRED_COLOR,
  prObsolescenceInDay: DEFAULT_OBSOLESCENCE_IN_DAY,
}

const isColor = (value) => value && typeof value === 'string' && value.indexOf('#') === 0
const toUppercase = (value) => value.toUpperCase()
const isUnique = (value, index, self) => self.indexOf(value) === index

const displayCommonSettings = (settings) => {
  const {
    draftColor,
    approvedColor,
    obsoleteColor,
    requestChangesColor,
    reviewRequiredColor,
    prObsolescenceInDay,
  } = settings
  draftDOM.value = draftColor
  approvedDOM.value = approvedColor
  obsoleteDOM.value = obsoleteColor
  requestChangesDOM.value = requestChangesColor
  reviewRequiredDOM.value = reviewRequiredColor
  obsolescenceDOM.value = prObsolescenceInDay

  const colorList = document.getElementById('color-list')
  colorList.innerHTML = ''
  const colorValues = Object.values([
    ...Object.values(defaultCommonSettings),
    draftColor,
    approvedColor,
    obsoleteColor,
    requestChangesColor,
    reviewRequiredColor,
  ])
  colorValues
    .filter(isColor)
    .map(toUppercase)
    .filter(isUnique)
    .forEach((color) => {
      const option = document.createElement('option')
      option.value = color
      colorList.appendChild(option)
    })
}

const getCommonSettings = () => ({
  draftColor: draftDOM.value,
  approvedColor: approvedDOM.value,
  obsoleteColor: obsoleteDOM.value,
  requestChangesColor: requestChangesDOM.value,
  reviewRequiredColor: reviewRequiredDOM.value,
  prObsolescenceInDay: obsolescenceDOM.value,
})

const saveSettings = () => store.set({ ...getCommonSettings() })

const retrieveSettings = () => store.get(defaultCommonSettings, displayCommonSettings)

const resetDefaultCommonSettings = () => displayCommonSettings(defaultCommonSettings)

document.addEventListener('DOMContentLoaded', retrieveSettings)
document.getElementById('customization-form').addEventListener('submit', saveSettings)
document.getElementById('form-reset').addEventListener('click', resetDefaultCommonSettings)
