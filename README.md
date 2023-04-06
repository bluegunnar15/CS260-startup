# CS260-startup

Learned from simon React: 
  * To convert Simon to a React application, you need to reorganize the code, create a template React application, clean up the template code, move the template files to Simon, convert to React Bootstrap, populate App.jsx, create view components, create the router, convert to React components, and set up debugging.
  * Reorganizing Simon involves putting the service code in a service directory and the React code in the src directory, and then testing that the service is still working.
  * Moving the template files to Simon involves copying over the generated files from the template-react directory to the simon repository directory, and then deleting the template-react directory.
  * Converting to React Bootstrap involves installing the React Bootstrap NPM package, importing the CSS from the package, and then converting the modal dialog and button implementations to use the React Bootstrap components.
  * Populating App.jsx involves moving the header and footer HTML into the render function for the app, renaming the class attribute to be className, and making other modifications to the code.
  * Creating view components involves creating new React components to represent different parts of the user interface, such as the header, footer, and game board.
  * Creating the router involves using the React Router package to set up navigation between different parts of the application.
  * Converting to React components involves refactoring existing code to take advantage of React-specific functionality and to create sub-components.
  * Setting up debugging involves using the React Developer Tools browser extension to inspect and debug the React components in the application.



startup project for cs260

Web Sockets are a game-changer when it comes to building real-time applications. I used them in my project to create sort of a  live chat feature that enabled my users to communicate with each other instantly when they post and comment.

MongoDB was a great choice for my project as I was dealing with a lot of unstructured data- and had no choice from the class lol. I used it to store user profiles, chat messages, and voting data. One of the best things about MongoDB is its flexible schema. I was able to add new fields to my documents on the fly without having to worry about the database structure. This made it easy for me to iterate on my data model as I developed my product.

Simon Notes from Websocket:
  * Make sure you install "ws"... will save countless minutes of wondering why its not working  

Simon Notes from Login: 
 * "pm2 start index.js -n simon -- 3000" to manually start simon on aws server
 * "pm2 ls" to list processes running on aws server
 * Makes sure simon and start up are running on separate ports!! 

Simon Notes from DB:
 * REMEMBER TO ALLOW ACCESS FROM ALL IPS- was able to access data locally but wasnt pulling/uploading when hosted on server

Service notes from start up:
  * "sudo kill -9 $(lsof -t -i:6000)" kills listening on port 6000 or whatever port specified 
  * dont forget "app.use(express.static('public'));" in index.js, tells index.js to use the html/files in the public folder
  * also dont forget "npm init -y" in new project folders!! installs node.js

JS notes from start up: 

  * To remove all children from a dom object
        while (votingBox.firstChild) {
              votingBox.removeChild(votingBox.firstChild);
          }

  * Use localstorage to save data between pages, works sort of like a map. 
  


JS notes from simon: Make sure that the ids match up!! 

DOM:
 * let banner = document.getElementById('element-id) <- gets element by id and saves it to banner
 * document.getElementByClassName('class name') <- gets element by class name
 * document.getElementByTagName('Tag name') <- gets element by Tag name
 * document.querySelector('#name') <- only returns one, the first one it finds
 * document.querySelectorAll('#name') <- returns all elements found in the document 
 
Notes from css simon:
  * "text-align:center;" <- centers text
  * <main class="container-fluid bg-secondary text-center"> <- means background secondary color, text center.
        You can add certain characteristics to the class name. 


CSS Notes:
  * padding-left: 1em; <- How to indent

WHat I learned from Simon HTML: I did not know that you could do pre extensions to links. Not sure if that makes sense but for example, I did not know that https://simon.dumbquestions.click could be a valid link. 

HTML Notes:
  * div <- new line
  * span <- continue on the line
  * nav <- navigation, can put organize vertically or horizontally using div or span
  * ul <- unordered list
  * li <- list
  * table <- table with tr as rows, and th as cells
  * alt <- "alternative text"
  * img <- image
  * svg <- "scalable vector graphics" allows to create images within html
  * canvas <- similiar to svg, allows image creation in html but requres Javacript

Website(updated for https): https://dumbquestions.click

IP address to website: http://13.59.126.80

Cool terminal commands:
   * dig amazon.com <- gets IP address associated with domain 
   * whois byu.edu <- gets information about a domain name from the domain name
   * traceroute byu.edu <- the path my computer takes to connect to byu.edu

The Pitch
POV Opinions:

POV Opinions is a forum like website where users can post and debate light hearted controversial questions from their points of view. Some of these types of questions include: Is water wet? Dark or milk chocolate? Peel or bite string cheese? The list of questions grows as more users add their own questions. 
The website consists of a list of questions posted by various users. Upon clicking on a question you can read the authors question, their own opinion, other users comments, and there is even an opinion to vote with the overall results being shown.

![alt text](https://github.com/bluegunnar15/CS260-startup/blob/3ae3f62ee506f480796333195f5fcd4487e59afd/images/POV_Opinions.png)

Key Features:
    * Ability to create a new thread, or question for debate
    * Ability to comment personal opinions on each question
    * Ability to vote and display survey result
    * Ability to sort questions by popularity(most votes) 
