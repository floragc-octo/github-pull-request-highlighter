// SELECTORS
const PR_SELECTOR = '[aria-label="Issues"] .js-issue-row'

const pr_list = () => document.querySelectorAll(PR_SELECTOR)
const set_status = (pr, status) => pr.classList.add(status)
let configuration = []

// QUERIES
const init = ({detail: config}) => {
    configuration = [...config]
    document.addEventListener('pjax:end', replace_style);
    replace_style()
}
const replace_style = () => {
    if(!window.location.pathname.includes('pulls')) return
    pr_list().forEach((pr) => {
        configuration
          //.filter(( { disabled }) => !disabled )
          .forEach(({ status, is_applicable }) => {
            if (is_applicable(pr)) {
                set_status(pr, status)
            }
        })
    })
}

document.addEventListener('shiny_spork_plugin_loaded', init)
