---
layout: post
title:      "Pass Through Objects - Objects Has Many Lab"
date:       2019-03-04 21:47:08 +0000
permalink:  pass_through_objects_-_objects_has_many_lab
---


The most difficult parrt of the pass through objects has many implementation is which object should be responsible for "passing through" information.  Once you've tackled that question, then refraining from duplicating object updates is a bit akin to dieting.  It's easy to just write a method (or grab a snack from the fridge) ... but where should we really update the object ( ... or should we wait for dinner?).  

In the case of this lab:  [Has Many Through Lab](https://github.com/marysue/ruby-objects-has-many-through-lab-cb-000) the Artist, Genre, and Songs classes seemed like it was easier to determine where to put the pass through information.  

In the Artist, Genre, Songs -- there was one, and only one place where ALL of the information was present on every object:  That was the Songs.  When a song is created, it has both an artist and a genre.  Genre does not know about the artists or songs that will be coming in, and Artists don't know about the genres of the songs before they've written them.  So when the Song is created, we have both the Artist AND the Genre.

As such, the Song would be the pass through object.  To get all of the information about the Artists and Genres, you can start from the Song.  To get the information about the Songs or Genres, you can start with the Artist, but you need to access the individual song instances to find the Genre.

I don't believe I created this part of the lab correctly.  I believe you'll find that I'm storing duplicate information across my classes as well as updating information from multiple classes.  Bad software engineer!  No cookie for you on this implementation.

However, in the Doctors, Appointments, and Patient classes I attempted to provide more clarity about where information was stored and accessed.  You'll find that in the Appointment class the appointment knows both the doctor and the patient at the time the appointment is created.  There is no other time when both of these objects will be known.  Creating the Pass Through Object as the Appointment object made sense.

Also, in this lab I became more stingy about where I set values on other objects.  I did not carry duplicated information in my non-passthru objects.  If I needed information about a doctor's patients, I searched through the appointments for all the appointments related to this doctor.  From that I extracted the patient objects.

Similarly, if I wanted all the doctors associated with a patient, I searched the appointments object for all appointments related to the patient ... then selected the doctors from those objects.

This made the implementation much clearer than they way I implemented the Song, Artist, Genre class.

Still, the burning question on these labs is which object you're going to choose for the pass through object.  I believe the best answer for this is how you are instantiating the objects.  Will you know all the patients when you instantiate the doctor's object?  No!  A doctor starts with no patients.  Will you know all the doctors when you instantiate the patient's object?  Nope!  You only know about the doctor you're visting for this appointment.  But on instantiating an appointment, will you know both the Doctor and Patient?  Yes!  So this intuitively made sense that the Appointment object would be the pass through object.
