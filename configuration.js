
const DRAFT_PR_SELECTOR = '[aria-label="Open draft pull request"]'
const APPROVED_PR_SELECTOR = '[aria-label*="approval"]'
const PR_OBSOLENCE_DELAY_IN_DAYS = 15

const pr_obsolence = PR_OBSOLENCE_DELAY_IN_DAYS * 3600 * 24 * 1000
const current_date = new Date()

// QUERIES

const date_diff = (pr_date, date=current_date) => date - pr_date
const get_date = (pr) => new Date(pr.querySelector('relative-time').getAttribute('datetime'))

const defaultConfiguration = {
  DRAFT: {
    color: "#C2CAD0",
    is_applicable: (pr) => pr.querySelector(DRAFT_PR_SELECTOR)
  },
  OLD: {
    color: "#E7717D",
    is_applicable: (pr) => date_diff(get_date(pr)) > pr_obsolence
  },
  APPROVED: {
    color: "#379683",
    is_applicable: (pr) => pr.querySelector(APPROVED_PR_SELECTOR)
  },
}

const usersConfiguration = {
  OLD: {
    color:"red",
    is_applicable: (pr) => date_diff(get_date(pr)) > pr_obsolence
  }
}
const configuration = Object.values({...defaultConfiguration, ...usersConfiguration})
