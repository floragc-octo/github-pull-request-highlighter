# What is Shiny Sporks doing ?

This extension intends to enhance the Github pull requests' page, by :
- adding colors to the following status :
  - draft, 
  - requesting changes 
  - review required
  - approved pull requests
  - (some may be added in the future, such as review required)
- adding colors to the obsolete pull requests (default is 15 days old)

<img src="docs/pr_list.png" height="200"/>

It has a settings page which allows to customize the default colors

<img src="docs/settings_page.png" width="200" height="200" />

> Screenshots may not be up to date

# What will Shiny Sporks do in the future ?

Better support for Firefox (storage features may have introduced bugs)

Still working on :
- custom colors by pull request names (RELEASE, BUGFIX etc.)
- allowing custom selectors (probably mostly in pull requests' name)
- add weight to status

# Instructions

Once you've cloned the repo on your computer (the extension is not yet published) :
 - Go to :
   - [**Chrome/Brave/Edge(Chromium)**] *chrome://extensions/*
   - [**Firefox**] *about:addons* then click on the wheel and chose (Debug module)
 - Activate "**developer mode**" if needed
 - Click on "**load unpacked extension**" and find the extension's folder
 - Then, go on the Pull Requests URL of any repository eg. *https://github.com/floragc-octo/shiny-spork/pulls*
