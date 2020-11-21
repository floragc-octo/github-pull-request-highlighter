// CONFIG

const PR_SELECTOR = '[aria-label="Issues"] .js-issue-row'
const DRAFT_PR_SELECTOR = '[aria-label="Open draft pull request"]'
const APPROVED_PR_SELECTOR = '[aria-label*="approval"]'
const PR_OBSOLENCE_DELAY_IN_DAYS = 15

const pr_obsolence = PR_OBSOLENCE_DELAY_IN_DAYS * 3600 * 24 * 1000
const current_date = new Date()

// QUERIES

const pr_list = () => document.querySelectorAll(PR_SELECTOR)
const date_diff = (pr_date, date = current_date) => date - pr_date
const get_date = (pr) => new Date(pr.querySelector('relative-time').getAttribute('datetime'))

const is_draft = (pr) => pr.querySelector(DRAFT_PR_SELECTOR)
const is_approved = (pr) => pr.querySelector(APPROVED_PR_SELECTOR)
const is_old = (pr) => date_diff(get_date(pr)) > pr_obsolence
const set_color = (pr, color) => pr.style.backgroundColor = color

const init = () => {
    chrome.storage.sync.get({draft_color: "#C2CAD0"}, function (items) {
        pr_list().forEach((pr) => {
            if (is_draft(pr)) set_color(pr, items.draft_color)
            if (is_approved(pr)) set_color(pr, "#379683")
            if (is_old(pr)) set_color(pr, "#E7717D")
        })
    });
}

init()
document.addEventListener('pjax:end', function (event) {
    init()
});
