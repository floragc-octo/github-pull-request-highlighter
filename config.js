const BASE_SELECTOR = '[aria-label="Issues"] .js-issue-row'

const current_date = new Date()
const days_to_ms = (days) => days * 3600 * 24 * 1000

// QUERIES
const date_diff = (pr_date, date = current_date) => date - pr_date
const get_date = (pr) => new Date(pr.querySelector('relative-time').getAttribute('datetime'))

const makeCSS = ({ name, color }) => `
  ${BASE_SELECTOR}.${name} {
      border-color: ${color};
      background-color: ${color}20;
  }
  ${BASE_SELECTOR}.${name}:hover {
      background-color: ${color}40;
  }
`

const defaultGetter = {
  draft_color: DEFAULT_DRAFT_COLOR,
  approved_color: DEFAULT_APPROVED_COLOR,
  obsolete_color: DEFAULT_OBSOLETE_COLOR,
  request_changes_color: DEFAULT_REQUEST_CHANGES_COLOR,
  default_color: "transparent",
  pr_obsolescence_in_day: DEFAULT_OBSOLESCENCE_IN_DAY,
}

const status_list_default_configuration = [
  {
    name: "draft",
    is_applicable: (pr) => pr.querySelector('.tooltipped[aria-label="Open draft pull request"]')
  },
  {
    name: "approved",
    is_applicable: (pr) => pr.querySelector('.tooltipped[aria-label*="approval"]')
  },
  {
    name: "request_changes",
    is_applicable: (pr) => pr.querySelector('.tooltipped[aria-label*="requesting changes"]')
  }
]

// CSS CONFIG
store.get(defaultGetter, (user_config) => {
  const {
    draft_color,
    approved_color,
    obsolete_color,
    request_changes_color,
    default_color,
    pr_obsolescence_in_day,
  } = user_config

  let CSS = `${BASE_SELECTOR} {
    border-left: 15px solid ${default_color};
    border-right: 8px solid ${default_color};
    border-top: 0;
  }`

  const status_list_display = [
    { name: 'draft', color: draft_color },
    { name: 'approved', color: approved_color },
    { name: 'request_changes', color: request_changes_color },
    { name: 'obsolete', color: obsolete_color },
  ]

  status_list_display.forEach(status_display => {
    CSS = CSS.concat(makeCSS(status_display))
  })

  const style = document.createElement("style")
  style.appendChild(document.createTextNode(CSS))
  document.getElementsByTagName("head")[0].appendChild(style)

  const pr_obsolence = days_to_ms(pr_obsolescence_in_day)
  const obsolescence = {
    name: "obsolete",
    is_applicable: (pr) => date_diff(get_date(pr)) > pr_obsolence
  }

  const status_list_configuration = [...status_list_default_configuration, obsolescence]
  const event = new CustomEvent('shiny_spork_plugin_loaded', { detail: status_list_configuration });
  document.dispatchEvent(event);
})
