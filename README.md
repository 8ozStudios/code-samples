# code-samples
Some samples of code I wrote, below is a description of each folder. 

<b>'buydontrent-wp' </b><br/>
These are some files extracted from the code base of a WP-based real estate website (www.buydontrent.com). The files are:
 - functions.php
 - styles.css
 - script.js

The styles.css file is the CSS for the child theme I built, based on a purchased WP real estate theme. It contains styles broken down by section of the layout and then by important pages. 

The scripts.js file contains custom javascript that I wrote for the child theme. If you want to look a specific function, here is one function explained:
 - submitSearch() - This handles the user's search for a property. The particular challenge on this functionality was that I wanted the user's experience to be to enter a single string for the address (as opposed to entering the street address in one field, the city in another, etc). On submit, the 'location' string is submitted by ajax to be geocoded by Google Maps API. The return result contains the address parts and they are used to populate individual hidden fields - after all that, the fields are submitted to the server and the results page is populated. 

<b>'social media content factory'</b><br/>
I've extracted just the controller, view, css and js files for a particular feature called the Social Media Content Factory (and also a screenshot of the page). The purpose of the feature was to help administrators easily and quickly pull content submitted to different areas of a community-organizing website and share them across social media platforms. Features:
 - In the controller, I am pulling the 5 most recent items from different areas of the site (calendar, classifieds, etc). 
 - In the js file, we are using jQuery UI to enable drag and drop and also setting up the code to submit items to each platform (Facebook, Twitter, LinkedIn, Google+). 
 - The page also has a feature to shorten the URL by ajax using the bit.ly API and counts the message, letting the user know if the message is too long for Twitter.
 - FYI, this page references files other than the ones I've extracted so this feature will not work as a standalone using these files.
