

#Heroku Configuration:

Install the Heroku CLI

Download and install the Heroku CLI.

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

$ heroku login

Create a new Git repository

Initialize a git repository in a new or existing directory

$ cd my-project/
$ git init
$ heroku git:remote -a prabutodoapp

Deploy your application

Commit your code to the repository and deploy it to Heroku using Git.

$ git add .
$ git commit -am "make it better"
$ git push heroku master

Existing Git repository

For existing repositories, simply add the heroku remote

$ heroku git:remote -a prabutodoapp


Note: Create "Procfile" with "web: node server.js"




#Git Configure

git --version
git config --global user.name "Prabu Mani"
git config --global user.email "prabube.mani@gmail.com"



…or create a new repository on the command line

echo "# tools" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/prabube/tools.git
git push -u origin master

…or push an existing repository from the command line

git remote add origin https://github.com/prabube/tools.git
git push -u origin master


Notes:

.gitignore file to avoid unwanted files to load on git need to mention dir and file names





 
