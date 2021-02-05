# Shiny Sporks

## What is Shiny Sporks doing?

This extension intends to enhance the Github pull requests' page, by:

- Adding colors to the following status
  - Draft
  - Requesting changes
  - Review required
  - Approved pull requests
  - (some may be added in the future)
- Adding colors to the obsolete pull requests (default is 15 days old)

<img src="docs/pr_list.png" height="250"/>

It has a settings page which allows to customize the default colors.

<img src="docs/settings_page.png" width="200" height="200" />

> Screenshots may not be up to date

## What will Shiny Sporks do in the future?

Better support for Firefox (storage features may have introduced bugs).

Still working on:

- Custom colors by pull request names (RELEASE, BUGFIX etc.)
- Allowing custom selectors (probably mostly in pull requests' name)
- Add weight to status

## Instructions

[Chrome Web Store](https://chrome.google.com/webstore/detail/github-pull-requests-high/foocmliipmkajfnpiekhoahejhmcnida?hl=fr&authuser=0)
[Firefox Browser Add-ons](https://addons.mozilla.org/fr/firefox/addon/shiny-sporks-for-github-prs/)
> The add-ons may not be up-to-date, still working on properly tagging releases

## Dev instructions

Once you've cloned the repo on your computer:

- Go to
  - [**Chrome/Brave/Edge(Chromium)**] [chrome://extensions/](chrome://extensions/)
  - [**Firefox**] [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)
- Activate "**developer mode**" if needed
- Click on "**load unpacked extension**" and find the extension's folder
- Then, go on the Pull Requests URL of any repository eg. *https://github.com/floragc-octo/shiny-spork/pulls*
