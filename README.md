# Run Ecommerce application
Before push any code you have to pass in lint and test cases
1. ng lint
2. ng test

after pass in both cases

npm start

# PUSH Ecommerce application
Before push any code you have to pass in lint and test cases
1. ng lint
2. ng test

after pass in both cases

1. git add .
2. git commit -m "message" --no-verify
3. git push -u origin master

# In  API service static JSON files are used which are coming from assets folder
categories.json
content.json
products.json

#How do I add Sass compilation in Angular CLI 6: angular.json
"schematics": {
        "@schematics/angular:component": {
          "styleext": "scss"
        }
},
# Changing the CSS Files to Sass
"styles": [
              "src/styles.scss"
          ],


# Package.json

Husky is a really cool npm package that lets you define npm scripts that correlate to local Git events such as a commit or push.
Husky is a very popular (1 million downloads a month) npm package that allows custom scripts to be ran against your repository. Husky works with any project that uses a package.json file.

This really reduces the friction of using this feature of Git. So for example, if you install Husky using the command

npm install husky --save-dev


"husky": {
    "hooks": {
      "pre-commit": "npm run lint",
      "pre-push": "npm run lint"
    }
}
Any time you try and commit, the hooks will run your lint command first. The hooks will not allow your commit to pass if the lint are failing.

😜 Don’t worry, you can force a commit with --no-verify if you find yourself in the situation where you just want to commit even though your pre-commit hooks don’t succeed.

git commit -m "first commit" --no-verify


I have added the following entries to the package.json

"precommit": "ng lint && npm test",
"prepush": "ng lint && ng build --aot true && npm test"
This sets up means that on a commit we:

lint the code
then run tests
and before pushing to a remote repository we:

perform an optimized build
then run unit tests

https://www.npmjs.com/package/pre-commit-with-lint
https://www.npmjs.com/package/pre-commit
https://sigmoidal.io/automatic-code-quality-checks-with-git-hooks/
