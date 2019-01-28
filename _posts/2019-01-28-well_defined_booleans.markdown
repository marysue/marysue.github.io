---
layout: post
title:      "Well Defined Booleans"
date:       2019-01-28 20:53:15 +0000
permalink:  well_defined_booleans
---


I love well defined booleans.  I love functions that return booleans that are well named.  It makes reading code so much easier:

if (hasMyName?(thisString)) {
    printf("It has my name");
} else {
    printf("Sorry - my name isn't there");
}

When using booleans, make certain the variable names or function names are clear and unambiguous.  isBlueSky, rather than just blueSky.

My singular requirement when writing functions is to keep them simple.  Don't try to do too much.  Returning a boolean from a function is clear and unambiguous.




