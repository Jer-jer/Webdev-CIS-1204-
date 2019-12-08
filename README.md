# Webdev-CIS-1204-
For WEBDEV CIS 1204

For git commands:

To push an existing repository (this one)
type "git remote add origin https://github.com/Jer-jer/Webdev-CIS-1204-"
type "git push -u origin master"

type "git status"
[example response:
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   public/css/about1.css
        modified:   public/css/contact.css
        modified:   public/css/eacss/navbar.css
        modified:   public/css/gallery.css
        modified:   public/css/page.css
        modified:   server.js
        modified:   views/home/index.ejs
        modified:   views/index.ejs
        modified:   views/partials/navbar.ejs
 
 Untracked files:
  (use "git add <file>..." to include in what will be committed)
        routes/aboutus.js
        routes/contactus.js
        routes/gallery.js
        views/aboutus/
        views/contactus/
        views/gallery/
        views/layouts/aboutus.ejs
        views/layouts/contactus.ejs
        views/layouts/gallery.ejs

no changes added to commit (use "git add" and/or "git commit -a")
]

*For Changes not staged for commit: and Untacked files:*
type "git add <file> <another file> <another file>" or "git add --all" or "git add -A" (where -A is a short form for "--a")

type "git status" again
[example response:
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   routes/aboutus.js
        new file:   routes/contactus.js
        new file:   routes/gallery.js
        new file:   views/aboutus/index.ejs
        new file:   views/aboutus/members.ejs
        new file:   views/contactus/index.ejs
        new file:   views/gallery/index.ejs
        new file:   views/layouts/aboutus.ejs
        new file:   views/layouts/contactus.ejs
        new file:   views/layouts/gallery.ejs
]
type "git commit -a" after, naay text file mu gawas sa editor nimo type anything like "Initial Website" or whatever 
then save then exit
type "git status" again
if the response is like this:
"On branch master
Your branch is ahead of 'origin/master' by 3 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean"
type "git push" and you're done
else, wala paka nahuman ug add or commit ug files

VERY EZ AHAHHAHAHAHAHHAHAHHAHAH


