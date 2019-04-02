---
layout: post
title:      "CLI Gem Web Scraper"
date:       2019-04-02 00:07:52 +0000
permalink:  cli_gem_web_scraper
---


<h2>Introduction </h2>

This project attempts to pull in the many facets of object oriented programming in Ruby that we've learned thus far.  The main points are:
<ol>
<li>Designing an object oriented program</li>
	<li>Designing a Singleton (Scraper)</li>
	<li>Using inheritance; encapsulation; polymorphism and abstraction</li>
	<li>Using modules to create reusable code</li>
	<li>Using namespaces to organize source code</li>
	<li>Adhering to the single responsibility principle (SRP)</li>
	<li>Using the "super" directive to inherit and enhance child methods</li>
	<li>Using "send" to iteratively assign attributes values based upon a hash received, as well as testing to see if a hash key exists within the hash</li>
	<li>Using Nokogiri and Open-Uri to reach out and scrape the contents of a remote webpage (or two)</li>
	<li>Using exceptions to throw meaningful error messages</li>
	<li>Learning the process for creating and publishing Ruby gems</li>
	</ol>

The project requires that we reach out to a web page, scrape the data and store the data in objects.  The second requirement is that it reaches to a second web page for additional information.  And finally, we create a ruby gem to make this available to either other local programs, or if chosen to publish this gem to Rubygems.org.  Because of the nature of this program, how specific it is to a particular website and will break easily if the website changes -- which it will -- I chose not to publish it to Rubygems.org.


<h2>Useage:</h2>

The following describes using the program. 

Invoke <code>finder = FindMyMac::Finder.new</code>  with default url (recommended):

![](http://marylark.com//images/CLI-Scraper/screenshot1.png)

Invoke the entry point: <code>finder.findMacs</code>

![](http://marylark.com/images/CLI-Scraper/screenshot2.png)

Or manually, invoke Scraper to retrieve the full list of all refurbished computers listed:  <code>hash = Scraper::scrape_refurbished_mac</code>

![](http://marylark.com/images/CLI-Scraper/screenshot3.png)

Pass the hash into Finder when instantiating your finder object:  <code> finder = FindMyMac::Finder.new(hash)</code>

![](http://marylark.com/images/CLI-Scraper/screenshot4.png)

And run finder.findMacs - to begin your search.  <code>finder.findMacs</code> 

The following is an example of running one scenario:

<img src="http://marylark.com/images/CLI-Scraper/screenshot5.png" >

<h2>Details on Design and Implementation</h2>

For this project I chose Apple's refurbished computer site as there is an opportunity on this site to scrape needed data, and perform the required secondary scrape for additional information.  

To make this determination I needed to examine this site, and determine whether I could scrape meaningful data.  The following are my findings:
	
On the initial search page, the only information given is through a description string and current price.  The information is tagged for the item can be obtained through the highlighted classes and a css call to this area.

However, examining this page I found this section only revealed the computers the user selected on the search bar.  It did not include ALL computers that Apple offers in their refurbished store. 



<img src="http://marylark.com/images/CLI-Scraper/main-screenshot.png" height="600" >

So I continued to examine this html.

Scrolling down the page I found hundreds of &lt;li&gt;'s.  Investigating these &lt;li&gt;  elements  I found all of the refurbished computers available on the site:


![](http://marylark.com/images/CLI-Scraper/details.png)


And further examination I found I could access all of the information initially presented through the highlighted class and element tags.

But can I perform a secondary reach as required by this project?  Chasing the link exposed in the above screenshot  I find their details page:

<img src="http://marylark.com/images/CLI-Scraper/secondary-page.png" height="400" >

And as the following screenshot demonstrates, I'm able to reach into this detailes page and extract more information about a selected computer:

<img src="http://marylark.com/images/CLI-Scraper/secondary-page-details.png" height="400" >


At this point I know that I have all the details I need to conduct a search of the desired desktop or laptop, and I'm ready to create my Scraper gem.

<h2>Implementation Details for Scraper Gem:</h2>

Designing this gem, I wanted to return either an array of hashes, or a singular hash, to the caller.  

The critical calls were: 
<pre>
	<code>html = open(url).read</code>
	<code>page = Nokogiri::HTML(html)</code>
	<code>computers = page.css('div.refurbished-category-grid-no-js')</code>
	<code>eachComputer = computers.css('li')</code>
	<code>link = eachComputer.css('a')[0]['href']</code>
	<code>description =  eachComputer.css('a')[0].children[0].text</code></pre>
	
For pricing information, within each &lt;li&gt; element pricing is obtained through a function call, cleaning the text, removing preceding and trailing whitespace: 

<pre><code>was_price = clean_up(eachComputer.css('span.as-price-previousprice').text)</code>
<code>current_price = clean_up(eachComputer.css('div.as-price-currentprice').text)</code>
<code>savings = clean_up(eachComputer.css('span.as-producttile-savingsprice').text)</code></pre>


There were a few challenges in this scraping.  First, nothing was easy to get ahold of.  The CPU was mixed up in the description string, along with the number of cores, model name, color, etc.  There was no other place on the page where this information was distinctly separated.  That said, I had to depend upon the description string for the bulk of my information.  To do this, however, I had to parse out the information I needed from this description string.  

After extracting information from the description field, I compiled a hash that represents one refurbished computer's configuration:

<pre><code>hash = {</code>
          <code>:cpu => description_hash[:cpu],</code>
          <code>:display_size => description_hash[:display_size],</code>
         <code> :number_cores => description_hash[:number_cores],</code>
          <code>:core_type => description_hash[:core_type],</code>
          <code>:display_type => description_hash[:display_type],</code>
          <code>:color => description_hash[:color],</code>
         <code> :model => description_hash[:model],</code>
         <code> :computer_type => description_hash[:computer_type],</code>
          <code>:link => link,</code>
          <code>:description => description,</code>
         <code> :current_price => current_price,</code>
         <code> :was_price => was_price,</code>
          <code>:savings => savings</code>
        }</code></pre>

Cycling through each &lt;li&gt; element, I put together an array of these hashes and returned this array to the caller.

Scraper also performs one more function.  After the user has selected the computer they're most interested in, we again reach back out to the website with the selected detail link and scrape additional information.  The critical calls were:

<pre><code>	html = open(url).read
	page = Nokogiri::HTML(html)
	computers = page.css('div.as-productinfosection-mainpanel')
	paragraphs = mainpanel[0].css('p')</code></pre>
	
Once I got the paragraphs in the detail section, I needed to determine what type of information I was looking at in order to determine where to put this in the returning hash.  So for each paragraph, I removed the leading and trailing white space, then looked at the string to determine what component this represented: 

<pre><code>case detail
    when "RAM"
		    ram = detailStr
		when "HardDrive"
		    hard_drive = detailStr
		when "YearReleased"
		    year_released = detailStr
		when "GPU"
		    gpu = detailStr
		end</code></pre>
	
Once I understood what the component was, I was able to store the information in he corresponding variable, load the hash, remove the nil values, and return the hash:

<pre><code>hash = {
	        :ram => ram,
	        :hard_drive => hard_drive,
	        :year_released => year_released,
	        :gpu => gpu
	      }
	
	      hash = hash.reject{ |k,v| v == nil || v == ""}</code></pre>
	

<h2>findMyMac</h2>

After scraping the website, findMyMac performs the logic for presenting the information in a searchable manner to the user.

I needed a way to organize the data coming in, such that I wasn't constantly searching hundreds of objects every time.  To do this I needed to create objects that represented this real life application.  I came up with 4 classes:

<ul>
<li><b>Mac Class : </b>
Carries the bulk of the attributes, the <code>initialize</code> method, a <code>print</code> method, an additional <code>add_attrs_by_hash </code> method (for the final selection, where we gather more information) and the class variable <code>@@all</code></li>

<li><b>Desktop Class:</b>
Inherits from Mac class.  This class offers no display options. </li>

<li><b>Laptop Class:</b>
Inherits from the Mac class.  This class has a display.  Additionally, it will have to print the display information using <code>super</code> to capture the parent class's print method, and tacking on the printing of our display.</li>

<li><b>Unknown Class:</b>
This class inherits from the Mac Class.  It is used for troubleshooting only.  I can examine these objects to identify why I wasn't able to determine what class it belongs to.  </li>


<li><b>Finder Class</b>
This class houses the controller methods.  When we instantiate a <code>Finder</code> object with the array of hashes provided by the <code>Scraper</code> singleton, we create one <code>Desktop</code>  or <code>Laptop</code> object for each refurbished computer shown in the hash returned by scraper.  Adding these new objects to their <code>@@all</code> arrays, we will later access these objects to determine if the objects match the selected computer configurations.

As long as we're looking at the objects, to determine whether they're laptops, desktops, iMacs, Mac Mini's, etc, I decided we should store their corresponding configurations so that choices made available to the user represented not every configuration ever imaginable, but specific configurations to the type of machine.
	
The bulk of the code in findMyMac deals in two parts: presenting configuration choices to the user, and searching the objects for matching configurations.</li>

<li><b>Abstracted Methods:  Findable Class</b>

<code>Concerns::Findable</code> has methods that are available to all Mac classes utilizing their <code>@@all</code> class variable.  This module finds, selects, and sorts the <code>@@all</code> array of Mac objects.</li>

For a live demo, with a brief overview of design and implementation see:  [YouTube](https://www.youtube.com/watch?v=XKcexqg0Qgs)


	 

