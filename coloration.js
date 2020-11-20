// CONFIG

const PR_SELECTOR = 'div.js-issue-row'
const DRAFT_PR_SELECTOR = '[aria-label="Open draft pull request"]'
const APPROVED_PR_SELECTOR = '[aria-label*="approval"]'

// QUERIES

var pr_list = get_all_pullrequests()

Array.prototype.forEach.call(pr_list, function (pr) {
    var draft_pr = get_all_draft_pullrequests(pr)
    draft_pr.forEach(() => {
        pr.style.backgroundColor = "#C2CAD0"
    })

    var approved_pr = get_all_approved_pullrequests(pr)
    approved_pr.forEach(() => {
        pr.style.backgroundColor = "#AFD275"
    })
})

function get_all_pullrequests() {
    return document.querySelectorAll(PR_SELECTOR)
}

function get_all_draft_pullrequests(pr){
    return pr.querySelectorAll(DRAFT_PR_SELECTOR)
}

function get_all_approved_pullrequests(pr) {
    return pr.querySelectorAll(APPROVED_PR_SELECTOR)
}