Copy of assignments I created for Intelligent Media Systems.

Assignment 1 
A photo viewer type app that makes use of flickr and HERE's places API's.

Brings up 10 images on load from Flickr's intrestingness api, Allow's selection of 5 places and loads 10 photo's with flickr's photo's 
API based on the selected locations longitude and latitude, Also use's flickrs places API to display the location name and longitude and latitude.
Also uses HERE's Places API to locate the 3 nearest resuturants and display the relevent infomation
Shows images in a Modal.
Shows the past 5 recently viewed images off to the side or bottom when the screen is reduced, clciking an image already in the list will move it back to the top.

Assignment 2.
The purpose of this app is to return photos related to the most common key phrase found in a user's past 25 Facebook posts.
This app makes use of Facebook’s Graph API to retrieve a user's recent posts' this information is then used to create a JSON object 
formatted for use in Microsoft’s Azure cognitive Services API specifically the Key phrases part of their Text analytics API. 
The Text analytics returns another JSON object containing the Key phrases from each post that are extracted and placed into an array. 
This array is then filtered to find the most common reoccurring phrase from the posts. This phrase is then sent to Flickr's search API 
to return an array of 10 photo's that have tag's containing the key phrase.
Facebook Test user accounts for this are wesmrqgkei_1557282548@tfbnw.net and iyanvrtgng_1557282546@tfbnw.net both use the password "notapassword".

A few problems remain in Assignment 2, namely not filtering out non-text post's from facebook, because of this it is possible for the most common keyword
to be undefined resulting in 10 images without tags. Also I'm still planning to implement callback functions correctly so rather than the user clicking
buttons to progress the entire process would be automated once logged into facebook. 
This is stil a WIP
