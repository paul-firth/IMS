let api_key = "ec9f3d87c018000a26d00ee44d54ea93";                       // Set's api key
let app_id = "9Q48Unc7mRRayqDFOj0i";                                    // App Id for places api
let app_code = "RfRFAAIwA78ER_lVXJBiDA";                                // App code for places api
let bris_lat = "-27.5";                                                 // Latitude of Brisbane for geo-location 
let bris_lon = "153.016667";                                            // Longitude of Brisbane for geo-location 
let bris_id = "khXM8m9QU7ofBD4U";                                       // Flickr Location ID for Brisbane
let lon_lat = "51.5";                                                   // Latitude of London for geo-location 
let lon_lon = "-0.116667";                                              // Longitude of London for geo-location
let lon_id = "hP_s5s9VVr5Qcg";                                          // Flickr Location ID for London
let ny_lat = "40.7141667";                                              // Latitude of New York for geo-location 
let ny_lon = "-74.0063889";                                             // Longitude of New York for geo-location
let ny_id = ".skCPTpTVr.Q3WKW";                                         // Flickr Location ID for New York
let mos_lat = "55.7522222";                                             // Latitude of Moscow for geo-location 
let mos_lon = "37.6155556";                                             // Longitude of Moscow for geo-location
let mos_id = "Gyn7fcFTU7gkY7d5";                                        // Flickr Location ID for Moscow
let par_lat = "48.866667";                                              // Latitude of Paris for geo-location 
let par_lon = "2.333333" ;                                              // Longitude of Paris for geo-location
let par_id = "EsIQUYZXU79_kEA";                                         // Flickr Location ID for Paris
let flickr_search = "";                                                 // Blank flickrsearch varible for use
let photos = [];                                                        // Empty Photos array
let nrequests;                                                          // Empty Varible for number of requests
let nreceived;                                                          // Empty varible for number of requests fufilled
let recent_view = [];                                                   // Empt Array to store recent photos in
let recent_data = "";                                                   // Empty varible for recent data
let recent_data_bottom = " ";                                            // Empty varible for recent data when sent to the bottom div
let location_data = "";                                                 // Empty varible for location data
let resturant_data = "";                                                // Empty varible for resturant data
let display_res = "<p><strong>Nearby Resturants</strong></p>";          // Stores initial code for the resturant div
let intstr = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key="+api_key+"&date=2019-03-30&per_page=10&page=1&format=json&nojsoncallback=1";

$(function(){
        searchregister();                                   // initiate the search_register function
        
        $('#modal-close').click(function(){                 // creates a click function for eack modal-close
        $('#modal-container').css('display', 'none');       // sets #modal-container display to none
        $('#modal-content').attr('src', '');                // remove the model-content img on close so it doesnt show up when another picture is selected
        $('#modal-caption').html($(this).attr(''));         // Remove the html from modal-caption div when its close
            
        $('figure_rec').each(function(index){
            $(this).click(function(){ 
                $('#modal-container').css('display', 'block');              //displays the #modal-container div
                $('#modal-content').attr('src', $(this).attr('url'));       //sets the src atttribute on the img tag to the largest img size 
                $('#modal-caption').html($(this).attr('caption'));          //sets the html atttribute on the modal-caption div to the photos caption 
            });
        });
    });
});


    function searchregister(){
        $.get(intstr, function(flickr){
            displayflickr(flickr);
        });
        $("#btn").click(function(){                                                 // Begin function on click of #btn my button
            $("#thumbs").html("<strong>Thumbnails</strong>");                       // Just fills this intial html of the thumbs Div with a title
            $(photos = []);                                                         // resets photos to blank everytime a new search begins so as to not show any of the previous search results
            let search = $("#location").val();                                      // Grab and store the value of the input
            if (search == "brisbane") {                                             // Seris of if statements to make function calls dependent on location
                flickr_search=(flickrphotoapi(api_key, bris_lat, bris_lon));
                location_data=(flickrlocapi(api_key, bris_id));
                resturant_data=(placesapi(app_id, app_code, bris_lat, bris_lon));
            } else if (search == "london") {
                flickr_search=(flickrphotoapi(api_key, lon_lat, lon_lon));
                location_data=(flickrlocapi(api_key, lon_id));
                resturant_data=(placesapi(app_id, app_code, lon_lat, lon_lon));                                                                          
            }  else if (search == "newyork") {
                flickr_search=(flickrphotoapi(api_key, ny_lat, ny_lon));
                location_data=(flickrlocapi(api_key, ny_id));
                resturant_data=(placesapi(app_id, app_code, ny_lat, ny_lon));                                                                           
            }  else if (search == "moscow") {
                flickr_search=(flickrphotoapi(api_key, mos_lat, mos_lon));
                location_data=(flickrlocapi(api_key, mos_id));
                resturant_data=(placesapi(app_id, app_code, mos_lat, mos_lon));                                                                         
            } else if (search == "paris") {
                flickr_search=(flickrphotoapi(api_key, par_lat, par_lon));
                location_data=(flickrlocapi(api_key, par_id));
                resturant_data=(placesapi(app_id, app_code, par_lat, par_lon));                                                                         
            }   else {
                console.log("Error in city selection. Location input invalid.");        // error handeling in case the location does not match
            }
    
            $.get(flickr_search, function(result){                      // function to send the retrieved array from the api call to the display function
                displayflickr(result);                              
                result = "";                                            // reset the varible result and flickr search so not to pass additional infomation in future search's
                flickr_search = "";
            
                $.get(location_data, function(loc){                     //function to send the location data to the location function
                    location(loc);
                });
                
                $.get(resturant_data, function(near){                   //Function to send local resurants data array to resturant near function
                    resturantnear(near);
                });
                
            });
    });

    function flickrphotoapi (key, lat, lon){
        flickr_search = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+key+"&lat="+lat+"&lon="+lon+"&radius=30&radius_units=&content_type=1&media=photo&per_page=10&page=1&format=json&nojsoncallback=1";    // API call for photos within 30km 
        return(flickr_search);
    }
    
    function flickrlocapi (key, locid){
        location_data = "https://api.flickr.com/services/rest/?method=flickr.places.getInfo&api_key="+key+"&place_id="+locid+"&format=json&nojsoncallback=1";           // API call for location data
        return(location_data);
    }

    function placesapi (appid, appcode, lat, lon){
        resturant_data = "https://places.cit.api.here.com/places/v1/discover/explore?app_id="+appid+"&app_code="+appcode+"&at="+lat+","+lon+"&cat=eat-drink&pretty" ;   // API call for resturants within30km sorted nearest first
        return(resturant_data);
    }

    function resturantnear(near){                                  // Function loops 3 times taking the first 3 resurants from the array and send to div. Resturants are sorted relative to nearest location first
        for (let i = 0; i < 3; i++){
            display_res += `<figure_res><p>${near.results.items[i].title}<br>Address:<br>${near.results.items[i].vicinity}<br>Opening Hours:<br>${near.results.items[i].openingHours.text}</p></figure_res>`;
        }
        $('#places').html(display_res);
        display_res = "<p><strong>Nearby Resturants</strong></p>";
    }

    function location(loc){                                         //function to pass the local infomation pulled from flickr (location name state country and latitude and longitude and send to the div)
        let display = `<p><strong>${loc.place.locality._content}</strong></p>Latitude: ${loc.place.locality.latitude}<br>Longitude: ${loc.place.locality.longitude} `;
        $('#local-data').html(display);
    }
    
    function displayflickr(flickr){
        nrequests = flickr.photos.photo.length;                     //counts number of images and stores
        nreceived = 0;                                              // Sets received to 0
        for (let i = 0; i < flickr.photos.photo.length; i++) {           // Loop itterating the number of times indicated by number of photos (limited to 10 by the API call)
            let photoObj = {id: flickr.photos.photo[i].id, title: flickr.photos.photo[i].title};        // creats the photoObj object containg ID and title
            photos.push(photoObj);                                                      //adds objects to the photos array
            flickrsize(photoObj);                                       //send each object to flcikrsize function 
        }
    }

    function flickrsize(photoObj){
        let flickrsizestr = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+api_key+"&photo_id="+photoObj.id+"&format=json&nojsoncallback=1";        //api call of size and source of the image
        $.get(flickrsizestr, function(data){
            nreceived++;    //adds one to received
            photoObj.file = data.sizes.size[0].source ;      // grabs the smallest available
            photoObj.filelarge = data.sizes.size[data.sizes.size.length-1].source ;      //picks the largest it can find
            
            for (let i = 0; i < data.sizes.size.length; i++){
                if (data.sizes.size[i].label == "Small"){
                    photoObj.file = data.sizes.size[i].source ;      //selects small photo size 
                } 
            }

            for (let i = 0; i < data.sizes.size.length; i++){
                if (data.sizes.size[i].label == "Large"){
                    photoObj.filelarge = data.sizes.size[i].source ;      //selects the large size photo 
                }
            }
            
            if (nreceived == nrequests){                                            //once the number of requests meets the number received send the array to display function
                    display(photos);
            }
        });
    }
    
    function display(photos){
        let result = "<div id = 'thumb-title'><strong>Thumbnails</strong></div>";                                    //sets the intital result varible to contain the title for the div
        let result_rec = "";                                                                                        //A varible to store the html data for the recent viewed section
        let result_cap = ""; 
        for (let i = 0; i < photos.length; i++) {           // Loop itterating the number of times indicated by the length of the array which hould be 10 
            result += `<figure data-full="${photos[i].filelarge}" data-caption="${photos[i].title}"><img src = "${photos[i].file}" alt="${photos[i].title}" height="200" width="200"></img><figcaption>${photos[i].title}</figcaption></figure>`;                     // Appened a copy of each thumbnails code        
        }
        $("#thumb").html(result);               // Alter the container div with the code from result
        $('figure').each(function(index){
            $(this).click(function(){                                           //a click function for each figure 
                $('#modal-container').css('display', 'block');                  //displays the #modal-container div
                $('#modal-content').attr('src', $(this).attr('data-full'));     //sets the src atttribute on the img tag to the largest img size 
                $('#modal-caption').html($(this).attr('data-caption'));              //sets the html atttribute on the modal-caption div to the photos caption 
                $('#recent').html("");                                          //blanks the recent div html 
                recent_data = "<strong> Recently Viewed</strong>";               // Store the title for the recently viewed div
                recent_data_bottom = " ";
                result_rec = $(this).attr('data-full');                         //pulls the photos url and stores in recent_rec
                result_cap = $(this).attr('data-caption'); 
                recent_view.unshift(result_rec);                                //places the latest url in the first position of the array
                
                for (let x = 1; x < recent_view.length; x++){
                    if (recent_view[x] == recent_view[0]){
                        recent_view.splice(x, 1);
                    }
                }
                
                if (recent_view[5]){
                    recent_view.splice(5, 1);
                } 
                for (let x = 0; x < recent_view.length; x++){           // loop though the length of the recently viewed array
                    recent_data += (`<figure_rec url= '${recent_view[x]}' data-caption='${result_cap}' )'><img src = "${recent_view[x]}" height="100" width="100"></img></figure_rec>`);          //pulls and stores the html for each figure that has been recently viewed
                    recent_data_bottom += (`<figure_rec url= '${recent_view[x]}' data-caption='${result_cap}' )'><img src = "${recent_view[x]}" height="100" width="100"></img></figure_rec>`);          //pulls and stores the html for each figure that has been recently viewed
            }
            $('#recent').html(recent_data);                              //insert the html stored in recentdata into the recently viewed div
            $('#recent-bottom').html(recent_data_bottom);                       //inserts the html stored in recentdata into the recently viewed bottom div which is used to create a 2 column layout when under 1024px screen width
            
            });
        });
    }
}