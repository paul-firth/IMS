import $ from "jquery";


let API_KEY = "dc140afe3fd3a251c2fdf9dcd835be5c";
let intstr = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key="+API_KEY+"&date=2019-04-21&per_page=10&page=1&format=json&nojsoncallback=1";
let photos = [];
let nrequests;
let nreceived;
let ready_cb;


export function getInteresting(ready){
    ready_cb = ready;

}

    
    
function displayflickr(flickr){
    nrequests = flickr.photos.photo.length;                     //counts number of images and stores
    nreceived = 0;
    for (let i = 0; i < flickr.photos.photo.length; i++) {           // Loop itterating the number of times indicated by nnumber of photos (limited to 10 by the API call)
        let photoObj = {id: flickr.photos.photo[i].id, title: flickr.photos.photo[i].title};        // creats the photoObj object containg ID and title
        photos.push(photoObj);                                                      //adds to the array
        flickrsize(photoObj);                                       //send each object to flcikrsize function 
    }
}

function flickrsize(photoObj){
    let flickrsizestr = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+API_KEY+"&photo_id="+photoObj.id+"&format=json&nojsoncallback=1";        //api call of size and source
    $.get(flickrsizestr, function(data){
        nreceived++;                                                            //adds one to received
        photoObj.file = data.sizes.size[data.sizes.size.length-1].source ;      //selects largest photo size available
        if (nreceived == nrequests){                                            //once the number of requests meets the number received send the array to display function
            ready_cb(photos);
        }
    });
}

export function search_Register(search){
        console.log(search);
        $("#container").html("");                       //Clear the container div
        $(photos = []);                                 //clear the array                           
        let flickrsearch = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+API_KEY+"&tags="+search+"&per_page=10&page=1&format=json&nojsoncallback=1"; //API call for flcikr searchs
        $.get(flickrsearch, function(result){                   //function to send the retrieved array too the display function
            console.log(result);
            displayflickr(result);
        });
        search = "";                                            //reset to allow a second search
}

