Dive: GTFS-based local search
=============================

Project for #build4stl during National Day of Civic Hacking 2014

Formerly "GTFS_Search_Near" and "things-near-my-bus-stop"

<h2>Why the name change?</h2>
<p>Basically, those names were kinda crappy.  Underscores are a pain in the butt to use because they are on the alternative characters Swype keyboard and using dashes in hashtags is most uncouth.</p>
<p>Dive was the name I had given this project because one of the first queries we tested this project with was to find bars near a bus route.  Since "dive" is another name for a "bar", I though it would be an ambiguous term good enough that one day, when this project caught on with a lot of folks people would say "Dive for [insert search terms here]".  In fact, when I re-write this page, I plan to have the search form do more than just look for things along bus routes but also highways.</p>

<blockquote>"Drop the 'The.' Just 'Facebook.' It's cleaner." --Napster founder Sean Parker (played by Justin Timberlake) in <i>The Social Network</i></blockquote>

<h2>What does this thing do?</h2>
<p>Given a trip route and desired search subject, this website displays a map of route and subject locations within 500 meters of the stops on the route.</p>
<p>Short answer: Finds places along the bus route you are on.</p>

<h2>What's used to make this work?</h2>
<ul>
  <li>JavaScript</li>
  <ul>
    <li>Node GTFS (Metro St. Louis uses it.)</li>
    <li>Node.js</li>
    <li>Leaflet.js</li>
    <ul>
      <li>Open Street Maps</li>
    </ul>
    <li>jQuery (something I plan to add.)</li>
    <li>Coffee Script (something I also plan to add.)</li>
  </ul>
  <li>FourSquare OAUTH (though I plan on replacing it with something that won't block you for scraping more than 1000 records.)</li>
  <li>MongoDB (which is currently broken on my computer, Thanks, Raspberry Pi.)</li>
  <li>Python</li>
  <ul>
    <li>Bottle.py (because Flask wasn't working. That and this was better.)</li>
  </ul>
  <li>Heroku</li>
</ul>
  

<h2> What plans do I have for it?</h2>
<p>Just to make me happy, I'd like to add weather information to it.  It's no fun standing a a shelterless bus stop when the weather sucks.</p>
<p>Foursquare OAUTH will be replaced with Open Street Map's Nominantim.</p>
<p>I might collab with Peter Greiss to add crime data from his Crimedb.org project. (No point of standing at a bus stop in a bad neighborhood.  Although, if there is one thing crime stats do not show is that once an incident occurs, it shouldn't happen again...at least in theory.)</p>
<p>There was some websitre I found  awhile back that had a list of people and addresses.  Though, not to rock the boat over data and privacy, that part of the project might just stay offline.</p>
<p>Depending on my mood, I might rewrite this project in Ruby.  I'm learning Python and Node.js, but if I can dabble with Rails as well as Sass, Compass, HAML, etc., that would be cool.</p>

<h2>Our Awesome Team</h2>
<ul>
<li>Jeremia Kimelman</li>
<li>LeAnne Lis</li>
<li>Vincent Lis</li>
<li>Noah Williams</li>
<li>Jason Charney (Me!)</li>
<li>Marc Braun</li>
</ul>

<h2>Acknowledgements</h2>
<p>Special thanks go out to the following people.</p>
<ul>
<li>Johnathan Leek for hosting this event.</li>
<li>Bill Schwulst for letting me know about it.</li>
<li>Brett Lord-Castillo</li>
<li>Elenore (who's last name I need to look up.)</li>
<li>My Awesome Team! (see previous section.)</li>
<li>Code for America</li>
<li>Build for STL</li>
<li>T-REX</li>
<li>And YOU for reading this page and leraning more about this project.</li>
</ul>

<h2>Copyright and Licensing</h2>
<p>Last I checked, this project was under a BSD or MIT software license.  I'll need to paste that part later.</p>
<p>This software was developed during an event where we collabbed with non-profits, community organizations, and local government agencies, so it would seem right that it would be free for the public to use.</p>
<p>However, if you do fork this project, as a courtesy to our hard work, please do not omitt the "Our Awesome Team" section of this README document, which you should continue to keep as part of documentation.</p>
<p>All trademarks, logos, and copyrights are property of their respective owners or organizations.  (Such acknowlegdements will be included in this section in the near future.)</p>
<p>It is advisable that you probably not use this while driving a vechicle, motorcycle, aircraft, or bicycle, nor should it be used while operating an air traffic control center, nuclear power plant, oil tanker, or Large Hadron Collider.</p>
<p>DON'T TEXT AND DRIVE!  That applies for Internet browsing too! Pull over and do that.</p>
<p>All your base are belong to us. :3</p>
