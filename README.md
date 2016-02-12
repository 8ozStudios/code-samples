# code-samples
Some samples of code I wrote, below is a description of each folder. 

<b>'BuyDontRent WP' </b><br/>
These are some files extracted from the child theme I built for a WP-based real estate website (www.buydontrent.com). The files are:
 - functions.php
 - styles.css - <b>*{{Main CSS file from a recent site}}*</b>
 - script.js

The styles.css file is the CSS for the child theme I built, based on a purchased WP real estate theme. It contains styles broken down by section of the layout and then by important pages. 

The scripts.js file contains custom javascript that I wrote for the child theme. If you want to look a specific function, here is one function explained:
 <b>*{{Some javascript code I am proud of}}*</b>
 - submitSearch() - This handles the user's search for a property. The particular challenge on this functionality was that I wanted the user's experience to be to enter a single string for the location (as opposed to entering the street address in one field, the city in another, etc). On submit, the 'location' string is submitted by ajax to be geocoded by Google Maps API. The return result contains the address parts and they are used to populate individual hidden fields - after all that, the fields are submitted to the server and the results page is populated. The extra step happens seamlessly and the user's experience is better, they have the flexibility to type in what they want.

<b>'Social Media Content Factory'</b><br/>
I've extracted just the controller, view, css and js files for a particular feature called the Social Media Content Factory (and also a screenshot of the page). The purpose of the feature was to help administrators easily and quickly pull content submitted to different areas of a community-organizing website and share them across social media platforms. Features:
 - In the controller, I am pulling the 5 most recent items from different areas of the site (calendar, classifieds, etc). 
 - In the js file, we are using jQuery UI to enable drag and drop and also setting up the code to submit items to each platform (Facebook, Twitter, LinkedIn, Google+). 
 - The page also has a feature to shorten the URL by ajax using the bit.ly API and counts the characters of the message, letting the user know if the message is too long for Twitter.
 - FYI, this page references files other than the ones I've extracted so this feature will not work as a standalone using these files.

<b>Reusable Text Blocks - Custom Templates</b><br />
<b>*{{Some PHP code I am proud of}}*</b><br />
I took over work on a client's existing Wordpress site that was rather bloated with plugins. Among many others, the site was using a plugin called Reusable Text Blocks - a simple plugin allowing a user to make a 'text block' and display it in multiple places on the site by a shortcode like this:
  [text-blocks id="my-text"]
The plugin also allows custom templates to be built, to modify the display of the block and I used this feature to build out some additional functionality on the site based on the text blocks (specifically trying to avoid using new plugins). 
 - text-blocks-certwindow.php - The client offered classes periodically and wanted to display only the upcoming or current class date range on the site. The problem is that the client did not want to have to remember to log in and change it every time a class ended or risk having outdated information on the site - they wanted to be able to set up the nex few date windows in advance and have the correct one display. Using this template, I enabled them to add the following shortcode to their page, which met their needs:
 
   [text-blocks
      id="certification-window-date-range"
      template="certwindow"
      q1start="December 1, 2015"
      q1end="December 29, 2015"
      q2start="February 1, 2016"
      q2end="February 3, 2016"
      q3start="March 1, 2016"
      q3end="March 3, 2016"
      q4start="April 1, 2016"
      q4end="April 3, 2016"
      defaultmessage="Sorry, window test dates are unavailable"]

 This custom template allows the user to add the next four upcoming date ranges (start and end date for each), as well as a default message to show if they forget to update them by the time the last date range ends. This saved them a lot of time and worry. 
 
 - text-blocks-eventfilter.php - Similar to above, the client wanted to be able to display an upcoming event of a certain type and have the event disappear after it occurs and show the next one. Previously they were doing this by hand and frequently forgetting to keep the site up to date. This template allows the user to set the type of event (matching 2 different post type taxonomies) and also the number of upcoming events to show. The shortcode looked like this:
 
   [text-blocks id="event-filter" template="eventfilter" topic="sales" type="webinars" limit="1"]
 
 - text-blocks-rotatingitems.php - The client wanted an easy way to be able to add rotating slides to a page. For example, a block of testimonials or logos that rotated. To avoid adding a new plugin, I created another custom template that would turn any bulleted listed (unordered list items) into a slideshow. All the user had to do was create a text block, add a bulleted list of any kind of content (text, images, event tables) and use the shortcode like this:
 
   [text-blocks id="test-slideshow-block" template="rotatingitems"]

 As you can see in the php file, the custom template includes the js and css files for Unslider, a very simple slider jquery plugin and activates it on page load. The code uses a random number generator to make the element ID unique, so multiple sliders could exist on the same page without conflicting name space. There are various config settings that have default values but can be overridden, by passing more values through the shortcode, like this:

   [text-blocks id="test-slideshow-block" template="rotatingitems" autoslide="yes" shownav="no" showarrows="no" slidedelay="4000"]
