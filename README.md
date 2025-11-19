<div align="center">
    <h1>gimmick</h1>
    <h3>gimkit hacks for a chromebook without extension or devtools access!</h3>
    <h3>live demo: <a href='https://gim.villainsrule.xyz'>gim.villainsrule.xyz</a></h3>
    <br>
    <h2>usage</h2>
</div>

1. Install [Bun](https://bun.sh) & Git.
2. Clone the repository from Git.
3. Install dependencies: `bun i`.
4. Run the program: `bun start`.
5. Try it! `http://localhost:6060`

<br>
<h2 align="center">setup "for dummies" on school computers</h2>

1. create a Github account
2. navigate to https://github.com/VillainsRule/Gimmick
3. click the big green "Code" button, select the "Codespaces" tab, and click "Create codespace on master"
4. it should open a new tab (give it a second to load)
5. in the terminal (where it says `/workspaces/Gimmick (master) $`), enter the following commands in order & wait for each one to finish:
   1. `curl -fsSL https://bun.sh/install | bash`
   2. `source /home/codespace/.bashrc`
   3. `bun i`
   4. `bun start`
6. go to the ports tab (at the top of the terminal area)
7. if you want to also let your friends use gimmick:
   1. right click the text that says "6060"
   2. hover over "port visibility"
   3. set it to public
8. now, right click the text that says "6060" and click "open in browser"
9. click "continue"
10. enjoy Gimmick!

> [!TIP]
> press the \ key to toggle the cheat menu

<br>
<h2 align="center">logging in to gimkit</h2>

you can go to the `/$login` page to login to gimkit.

for example, if you're using `https://my-awesome-codespace.app.github.dev`, go to `https://my-awesome-codespace.app.github.dev/$login`.

you can see everything that is done with your email/password in [this file](./src/routes/login.html) & [this file](./src/routes/login.js) - they are only sent to gimkit.

> [!CAUTION]
> it is possible for someone running the Gimmick program to modify their program to save your login. only login on websites you trust. if you run Gimmick, your password is 100% safe, but a public Gimmick URL might not be.

> [!NOTE]
> you cannot use google to login. if you usually use google to login, go to [gimkit.com/settings](https://gimkit.com/settings) and add a password to your account.

<br>
<h2 align="center">function</h2>

this "client" embeds [thelazysquid/gimkitcheat](https://github.com/TheLazySquid/GimkitCheat) in the site, allowing you to use it anywhere, even on a Chromebook! this allows for cheating during class...without the struggle of blocked scripts at all! the code fetches and "updates" the cheat anytime the program is started, so you can quite simply just run the program and never worry about updating or maintaining anything.

<br>
<h5 align="center">made with ❤️ by <b>VillainsRule</b></h5>
<h5 align="center">program working smoothly as of 9/23/25 :D</h5>
