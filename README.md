This is a Vite project

We don't have a functional NPMJS.org Querium account and so the Github Actions publish the packages for AnimeTutor and swReact to Github Packages. However, `npm install` doesn't seem to be able to install from Github Packages unless all the dependancies (e.g., React, Three, etc) are also published to the Querium Github Package repo which they are not. So that path doesnt seem to be viable. Instead, doing an `npm pack` in AnimeTutor and swReact to create a .tgz archive and then from swPwr doing an `npm install PATH/FILE.tgz` does seem to work.

Example...
`npm install ../qqPackages/queriumcorp-swreact-0.1.73.tgz --legacy-peer-deps`

For some unknown reason, the generated tailwind classes from animeTutor and swReact aren't getting packaged. To work around it, run `npm run tw` in swReact or animeTutor; whichever you've modified. That will scan all the source and generate a `tailwind.css` file. Copy that to swPower `/src/swReact.css` or `/src/animeTutor.css`.

useImperativeHandle - https://www.youtube.com/watch?v=xUjREPbMrsc

DEPLOYING TO GITHUB
You may get the error:

`RPC failed; HTTP 400 curl 22 The requested URL returned error: 400 Bad Request`

To fix it, run:

`git config --global http.postBuffer 157286400`
