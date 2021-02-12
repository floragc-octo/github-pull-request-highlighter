const BASE_SELECTOR = '[aria-label="Issues"] .js-issue-row'

const currentDate = new Date()
const daysToMs = (days) => days * 3600 * 24 * 1000

// QUERIES
const dateDiff = (prDate, date = currentDate) => date - prDate
const getDate = (pr) => new Date(pr.querySelector('relative-time').getAttribute('datetime'))

const makeCss = ({ name, color }) => `
    ${BASE_SELECTOR}.${name} {
        border-color: ${color};
        background-color: ${color}20;
    }
    ${BASE_SELECTOR}.${name}:hover {
        background-color: ${color}40;
    }
`

const defaultGetter = {
  draftColor: DEFAULT_DRAFT_COLOR,
  approvedColor: DEFAULT_APPROVED_COLOR,
  obsoleteColor: DEFAULT_OBSOLETE_COLOR,
  requestChangesColor: DEFAULT_REQUEST_CHANGES_COLOR,
  reviewRequiredColor: DEFAULT_REVIEW_REQUIRED_COLOR,
  defaultColor: 'transparent',
  prObsolescenceInDay: DEFAULT_OBSOLESCENCE_IN_DAY,
}

const statusListDefaultConfiguration = [
  {
    name: 'approved',
    is_applicable: (pr) => pr.querySelector('.tooltipped[aria-label*="approval"]'),
  },
  {
    name: 'request_changes',
    is_applicable: (pr) => pr.querySelector('.tooltipped[aria-label*="requesting changes"]'),
  },
  {
    name: 'review_required',
    is_applicable: (pr) => pr.querySelector('.tooltipped[aria-label*="Review required before merging"]'),
  },
  {
    name: 'draft',
    is_applicable: (pr) => pr.querySelector('.tooltipped[aria-label="Open draft pull request"]'),
  },
]

// CSS CONFIG
store.get(defaultGetter, (userConfig) => {
  const {
    draftColor,
    approvedColor,
    obsoleteColor,
    requestChangesColor,
    reviewRequiredColor,
    defaultColor,
    prObsolescenceInDay,
  } = userConfig

  let css = `${BASE_SELECTOR} {
        border-left: 15px solid ${defaultColor};
        border-right: 8px solid ${defaultColor};
        border-top: 0;
    }`

  const statusListDisplay = [
    { name: 'draft', color: draftColor },
    { name: 'approved', color: approvedColor },
    { name: 'request_changes', color: requestChangesColor },
    { name: 'review_required', color: reviewRequiredColor },
    { name: 'obsolete', color: obsoleteColor },
  ]

  statusListDisplay.forEach((statusDisplay) => {
    css = css.concat(makeCss(statusDisplay))
  })

  const style = document.createElement('style')
  style.appendChild(document.createTextNode(css))
  document.getElementsByTagName('head')[0].appendChild(style)

  const prObsolence = daysToMs(prObsolescenceInDay)
  const obsolescence = {
    name: 'obsolete',
    is_applicable: (pr) => dateDiff(getDate(pr)) > prObsolence,
  }

  const statusListConfiguration = [...statusListDefaultConfiguration, obsolescence]
  const event = new CustomEvent('shiny_spork_plugin_loaded', { detail: statusListConfiguration })
  document.dispatchEvent(event)
})
