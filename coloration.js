// SELECTORS

const PR_SELECTOR = '[aria-label="Issues"] .js-issue-row'
const DRAFT_PR_SELECTOR = '[aria-label="Open draft pull request"]'
const APPROVED_PR_SELECTOR = '[aria-label*="approval"]'
const PR_OBSOLENCE_DELAY_IN_DAYS = 15

const pr_obsolence = PR_OBSOLENCE_DELAY_IN_DAYS * 3600 * 24 * 1000
const current_date = new Date()


const pr_list = () => document.querySelectorAll(PR_SELECTOR)
const date_diff = (pr_date, date = current_date) => date - pr_date
const get_date = (pr) => new Date(pr.querySelector('relative-time').getAttribute('datetime'))

const is_draft = (pr) => pr.querySelector(DRAFT_PR_SELECTOR)
const is_approved = (pr) => pr.querySelector(APPROVED_PR_SELECTOR)
const is_obsolete = (pr) => date_diff(get_date(pr)) > pr_obsolence


// CSS CONFIG

chrome.storage.sync.get({
    draft_color: "#C2CAD0",
    approved_color: "#379683",
    obsolete_color: "#E7717D",
    default_color: "transparent"
}, function ({
    draft_color, 
    approved_color, 
    obsolete_color, 
    default_color
}) {
    const CSS = `
        [aria-label="Issues"] .js-issue-row {
            border-left: 15px solid ${default_color};
            border-right: 8px solid ${default_color};
            border-top: 0;
        }
        [aria-label="Issues"] .js-issue-row.draft {
            border-color: ${draft_color};
            background-color: ${draft_color}20;
        }
        [aria-label="Issues"] .js-issue-row.draft:hover {
            background-color: ${draft_color}40;
        }
        [aria-label="Issues"] .js-issue-row.approved {
            border-color: ${approved_color};
            background-color: ${approved_color}20;
        }
        [aria-label="Issues"] .js-issue-row.approved:hover {
            background-color: ${approved_color}40;
        }
        [aria-label="Issues"] .js-issue-row.obsolete {
            border-color: ${obsolete_color};
            background-color: ${obsolete_color}20;
        }
        [aria-label="Issues"] .js-issue-row.obsolete:hover {
            background-color: ${obsolete_color}40;
        }
    `
    const style = document.createElement("style")
    style.appendChild(document.createTextNode(CSS))
    document.getElementsByTagName("head")[0].appendChild(style)
})

const set_color = (pr, status) => {
    pr.classList.add(status)
}

// QUERIES

const init = () => {
    pr_list().forEach((pr) => {
        if (is_draft(pr)) set_color(pr, 'draft')
        if (is_approved(pr)) set_color(pr, 'approved')
        if (is_obsolete(pr)) set_color(pr, 'obsolete')
    })
}

init()
document.addEventListener('pjax:end', function (event) {
    init()
});
