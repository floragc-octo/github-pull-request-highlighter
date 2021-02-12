// SELECTORS
const PR_SELECTOR = '[aria-label="Issues"] .js-issue-row'

const pullrequestsList = () => document.querySelectorAll(PR_SELECTOR)
const setStatus = (pr, status) => pr.classList.add(status)
const isPullPage = () => window.location.pathname.includes('pulls')

let statusList = []

// QUERIES
const replaceStyle = () => {
  if (!isPullPage) return

  pullrequestsList().forEach((pr) => {
    statusList.forEach((status) => {
      if (status.is_applicable(pr)) {
        setStatus(pr, status.name)
      }
    })
  })
}

const init = ({ detail }) => {
  statusList = [...detail]
  document.addEventListener('pjax:end', replaceStyle)
  replaceStyle()
}

document.addEventListener('shiny_spork_plugin_loaded', init)
