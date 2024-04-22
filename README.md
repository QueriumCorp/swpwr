This is a Vite project

We don't have a functional NPMJS.org Querium account and so the Github Actions publish the packages for AnimeTutor and swReact to Github Packages. However, `npm install` doesn't seem to be able to install from Github Packages unless all the dependancies (e.g., React, Three, etc) are also published to the Querium Github Package repo which they are not. So that path doesnt seem to be viable. Instead, doing an `npm pack` in AnimeTutor and swReact to create a .tgz archive and then from swPwr doing an `npm install xxx.tgz` does seem to work.
