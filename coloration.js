// CONFIG

const PR_SELECTOR = '[aria-label="Issues"] .js-issue-row'

// QUERIES

const pr_list = () => document.querySelectorAll(PR_SELECTOR)
const set_color = (pr, color) => pr.style.backgroundColor = color

const init = () =>  {
    pr_list().forEach((pr) => {
        configuration.filter(( { disabled }) => !disabled ).forEach(({ name, color, is_applicable }) => {
            if (is_applicable(pr)) {
                set_color(pr, color)
            }
        })
    })
}

init()
document.addEventListener('pjax:end', function(event) {
    init()
});
