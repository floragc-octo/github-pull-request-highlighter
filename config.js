const DEFAULT_DRAFT_COLOR = "#2A4860"
const DEFAULT_APPROVED_COLOR = "#379683"
const DEFAULT_OBSOLETE_COLOR = "#E7717D"
const DEFAULT_OBSOLESCENCE_IN_DAY = 15

const BASE_SELECTOR = '[aria-label="Issues"] .js-issue-row'

const current_date = new Date()
const days_to_ms = ( days ) => days * 3600 * 24 * 1000
// QUERIES

const date_diff = (pr_date, date=current_date) => date - pr_date
const get_date = (pr) => new Date(pr.querySelector('relative-time').getAttribute('datetime'))


const makeCSS = ({ status, color }) => `
  ${BASE_SELECTOR}.${status} {
      border-color: ${color};
      background-color: ${color}20;
  }
  ${BASE_SELECTOR}.${status}:hover {
      background-color: ${color}40;
  }
`

const defaultGetter = {
  draft_color: DEFAULT_DRAFT_COLOR,
  approved_color: DEFAULT_APPROVED_COLOR,
  obsolete_color: DEFAULT_OBSOLETE_COLOR,
  default_color: "transparent",
  pr_obsolescence_in_day: DEFAULT_OBSOLESCENCE_IN_DAY,
}


const defaultConfiguration = [
  {
    status: "draft",
    is_applicable: (pr) => pr.querySelector('[aria-label="Open draft pull request"]')
  },
  {
    status: "draft",
    is_applicable: (pr) => pr.querySelector('[aria-label*="approval"]')
  },
]

// CSS CONFIG
chrome.storage.sync.get(defaultGetter, function ({
               draft_color,
               approved_color,
               obsolete_color,
               default_color,
                pr_obsolescence_in_day,
             }) {
  const pr_obsolence = days_to_ms(pr_obsolescence_in_day)

  const params = [
    { status: 'draft', color: draft_color },
    { status: 'approved', color: approved_color },
    { status: 'obsolete', color: obsolete_color },
  ]
  let CSS = `${BASE_SELECTOR} {
      border-left: 15px solid ${default_color};
      border-right: 8px solid ${default_color};
      border-top: 0;
  }`
  params.forEach(param => {
    CSS = CSS.concat(makeCSS(param))
  })
  const style = document.createElement("style")
  style.appendChild(document.createTextNode(CSS))
  document.getElementsByTagName("head")[0].appendChild(style)
  const obsolescence =   {
    status: "obsolete",
    is_applicable: (pr) => date_diff(get_date(pr)) > pr_obsolence
  }
  const configuration = [...defaultConfiguration, obsolescence]
  const event = new CustomEvent('shiny_spork_plugin_loaded', { detail : configuration });
  document.dispatchEvent(event);
})
