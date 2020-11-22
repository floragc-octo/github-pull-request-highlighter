// SELECTORS
const PR_SELECTOR = '[aria-label="Issues"] .js-issue-row'

const pullrequests_list = () => document.querySelectorAll(PR_SELECTOR)
const set_status = (pr, status) => pr.classList.add(status)
const isPullPage = () => window.location.pathname.includes('pulls')

let status_list = []

// QUERIES
const init = ({ detail }) => {
    status_list = [...detail]
    document.addEventListener('pjax:end', replace_style);
    replace_style()
}

const replace_style = () => {
    if(!isPullPage) return
    console.log("replace style")

    pullrequests_list().forEach((pr) => {
        status_list
          .forEach((status) => {
            if (status.is_applicable(pr)) {
                set_status(pr, status.name)
                console.log(status.name, " traitée")
                console.log(pr)
            }
        })
    })
}

document.addEventListener('shiny_spork_plugin_loaded', init)
