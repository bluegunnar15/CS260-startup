# CS260-startup
startup project for cs260

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
