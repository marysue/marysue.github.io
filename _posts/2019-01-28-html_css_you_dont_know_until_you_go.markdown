---
layout: post
title:      "HTML / CSS : You don't know until you go ..."
date:       2019-01-28 20:33:50 +0000
permalink:  html_css_you_dont_know_until_you_go
---


After completing the HTML5, CSS3, and Javascript portions of this course, I felt I had a good grasp on the subject matter.  Nothing could have been farther from the truth!

I was given a pre-interview test that worked with Javascript, HTML and CSS.  I was supposed to write a simple app that reached out to an API for stock values, then dynamically through Javascript, put up "tiles" that showed the stock name, index symbol, current price, price change percent (up/down) and low and high values on a scale.  The screenshot below demonstrates this:

http://marylark.com/images/StockWatcher/maxBrowserLayout.jpg

There were some major points I had missed while coding this website:

* Inline vs. Block vs. Inline-Block elements
   - **Inline** elements are elements that will appear inline (side-by-side).  An example of inline elements would be basic text -- not captured within the paragraph element tag.
   - **Block** - block elements are stackable objects.  One appears below the next.  Some examples of block elements are paragraphs (try placing two paragraphs side-by-side ... you can't with the default settings.  The paragraphs will appear one after the next).  Divs are also, by default, block elements.  One div will appear immediately following the previous div or previous block element.
   - **Inline-Block** elements :  This was what I needed.  I needed the Company name and Index Symbol in one div, and below that div I needed the stock change percent and indicator [I also needed to be able to hide this div for responsive sites, so it had to have its own div], and below that div I needed the stock pricing.  For responsive sites I needed to move this div to the right of the stock name/index symbol div -- so it also needed to be positioned in its own div.  Finally, I needed two more divs - one to hold the arrow computed to point at the relative positioning of the current stock pricing, and one to hold the vertical line, high and low prices.  Also these two divs needed to be hidden for responsive sites as well.
   - **FontAwesome** - this wasn't mentioned during the classes, however it was critical for use in this test as I needed an up-arrow to the left of the stock price change value, or down-arrow, depending upon which direction the stock pricing changed.  FontAwesome was hideously easy to use, however, it does provide an area for text and that messed with me a bit as I wasn't able to change the font style.  I quickly realized I could only use FontAwesome's tags for just the arrows, and the text had to appear outside of FontAwesome's tags to use the font styling specified for the page.
   - **API call**  - I had a terrible time with the API call.  I was getting some serious red-herrings.  The major one was the CORS, or cross-browser error when I inserted the API call within the onClick callback.  When the API call was simply inside the javascript, but outside of any function I didn't receive the CORS error.  When I removed the surrounding `<form></form>`tags from my input box these errors went away.  I still don't really understand why this would be the case.
   - **Styling** - One step farther, the Exceptional Realty site we worked on had some gradients around boxes that I recalled, but had to research more to figure out how to use these nice color effects on my own personal website.


Even though I wasn't ready to start working as a front-end designer when I completed the HTML, CSS and Javascript courses, I found that by going off and implementing a few sites on my own was critical in solidifying what I learned.





* 

