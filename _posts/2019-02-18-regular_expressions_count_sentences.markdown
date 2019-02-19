---
layout: post
title:      "Regular Expressions : Count Sentences"
date:       2019-02-18 18:49:56 -0500
permalink:  regular_expressions_count_sentences
---


One might imagine that this count sentences assignment was about using self (the "this" equivalent in non-scripting languages).  However, it was not.  The bulk of my time was working through regular expressions.

The author of the lab suggested using the split string function.  But split requires a regular expression, unless you're simply splitting on one specific character.  In this assignment we're splitting on three:  ? . !

I have an excellent resource for regular expression testing: [RegExp Console](https://regexr.com/)  This is crucial in this assignment.  You'll drive yourself nuts trying to compile over and over until you get your regexp correct.

In this tool you're able to test out the regular expression on any string you place in the window.  Further, it tells you what each element of your regular expression represents as you hover over the regexp characters.

In this assignment we needed to count the number of sentences in a given string, taking into consideration that some sentences may end with multiple punctuations, such as "???", "!!!" or "..."  

I will spare you the tutorial on regular expressions, and simply layout the regexp I created and explain what each step in constructing this expression was about:

The full expression:   (/(!+)\s|(\.+)\s|(\?+)\s/)

This expression states to record matches on each of the following:
    -- any string that contained one or more "!"'s
		-- any string that contained one or more "."'s
		-- any string that contained one or more "?"'s
		 
		
### The construction of the regular expression is as follows:

`(//)`        :        regular expression placed between the '/'
`(!+) `      :        matches one or more exclamation points - marks as one match.  
                         Eliminate the + if you want to match on everysingle ! ... but we don't as some sentences end in !!!
`\s`         :        matches any whitespace character
                           so `(!+)\s` matches one or more exclamation points followed by any number of 
													 whitespace character so "This is a blast!     "   would count as one match
`|`            :       OR ... match the previous expression OR the next expression
`(\.+)`     :       use care here, the period means "all or any" so you need to quote the
period to match only the character - not interpret the meaning
So this expression matches one or more periods
`\s `       :       see above
` (\?+) ` :       again use care, the` ?` means to match between 0 and 1 of the previous
character -- so we need to quote this to match on the character
and not interpret the meaning
`\s`        :        see above  
		
	



Splitting a string on the simple ?.! characters will yield multiple strings with only a "?" in it.

So for a given sentence:  

       "This, well, is a sentence. This is too!! And so is this, I think? Woo...".split(/[\?\.\!]/)

Returns the 5 element array: 

       ["This, well, is a sentence", " This is too", "", " And so is this, I think", " Woo"]
 
We cannot simply count the elements in this array, as it has empty elements.  Our count would be off.
 
There are a couple of ways to manage this.
 
1.  You can parse the array using "reject", which returns a new array with only elements in the reject block which were false.
  
       So for example, with the array `["a", "b", "c", "d"].reject{ |x| x == "c"}`
 			will return false for a, b, and d..  Your resulting array will be:
 			
			`["a", "b", "d"]`
					

	In our case we can use reject to remove the empty string.
	
	Our code then becomes three lines:
* split the string into an array of sentences, including nil sentences:
* reject the members of the array which are nil, returning an array of non-nil sentences
* use this array's length method to count the elements in the array
		
 2.  You can use gsub to substitute the matching characters, placing a unique character in its place.  gsub will return a string.  Once you have a string with unique characters you can split on that character, and split will return an array which you then can get a proper count for the number of sentences:

     `sentence = "This, well, is a sentence. This is too!! And so is this, I think? Woo..."`
		 `newSentence = sentence.gsub(/(!+)\s|(\.+)\s|(\?+)\s/, '\0|')`
 		 
 		 Your newSentence is now a string:
 		     ` "This, well, is a sentence. |This is too!! |And so is this, I think? |Woo..."`
		 
		 And you can easily split this now, on the pipe character:
		 
			`newArr =  newSentence.split("|");`
 		 
	 Which returns the array:
	 
		`["This, well, is a sentence. ", "This is too!! ", "And so is this, I think? ", "Woo..."]`
		 
	 And now you can count the members of this array

	 `newArr.length  =>  4`
 		 
 
3.  Finally, I found this on the web.  Now that you understand the reject function -- which is, in itself a map function, you could chain map and reject functions.

WARNING:  This is a truth and beauty issue.  Some developers believe if they can make code work in less lines that it is better.  I counter that argument with -- is it understandable?  Is it easier for someone who did not write the code to understand what you've written?  If the answer is no!  I'd suggest breaking your code into smaller, more easily digestable chunks.  The following code is a perfect example of this.

First, the actual line of code I found:

`sentence.split(/[.!?]/).map{|x| !(x.match(/\w+/).nil?)}.reject{|x| x == false}.size `
 
 WTF?
 

The overview of this function, which is pretty brain warping, is:
a.  Take all the elements of the array and run them through map, 
b.  In the map function, create an array that answers the question:  Is this an empty string.  The result from this map is an array of booleans.
c. 	Take this array of booleans, and remove the element of the array that is false (or IS an empty string).  The result from this "reject" function returns an array of booleans which should all be true:  they ARE all strings.
d. 	Take this array and count the members.  This should yield the number of sentences found in the string. 
		 
You could do this by taking multiple steps:

`sentence = "This, well, is a sentence. This is too!! And so is this, I think? Woo..."`
			
`step1Arr=sentence.split(/[\?\.\!]/);`
		
This returns a new array of sentences but some sentences may be blank:
			 
			
`["This, well, is a sentence", " This is too", "", " And so is this, I think", " Woo"]`
				
 `step2Arr = step1Arr.map(!(x.match(/\w+/))}`
 
	`[#<MatchData "This">, #<MatchData "This">, nil, #<MatchData "And">, #<MatchData "Woo">]]`
			
Now cycle through every element of intermedArr and determine whether it is nil, or there is a word:

 `step3Arr = step2Arr.map{|x| x.nil?}`
 
 which returns:
 
	`[false, false, true, false, false]`

make this more intuitive - because each of the false's were acutally true - they were a sentence:

 `step4Arr = step3Arr.map{|x| !x}`

 returns:
 
	`[true, true, false, true, true]`
			
	Filter out these results to contain only booleans representing sentences:
 
   `finalArr = step4Arr.map{|x| x==false}`
			
 returns:
 
	`[true, true, true, true]`
			
 Now count your final array to yield the number of sentences:
 
	`finalArr.length  ==> returns 4`
