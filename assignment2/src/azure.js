import $ from "jquery";
let results;
let test;
let res;
let body__;
let body;
let body_;
let phraseArr = [];




export function textAnalyse (data){
    textAnalysis(data);
    setTimeout(function(){ 
            console.log(results)
    }, 1000);
}

export function reply (){
    for (let i = 0; i < results.documents.length; i++){
        console.log(results.documents[i].keyPhrases[0]);
        let temp = results.documents[i].keyPhrases[0];
        phraseArr.push(temp);
    }
    console.log(phraseArr);
    return phraseArr.sort((a,b) =>
          phraseArr.filter(v => v===a).length
        - phraseArr.filter(v => v===b).length
    ).pop();
    
    
}


export function textAnalysis (data){
    
    
        'use strict';
        
        let https = require ('https');
        
        // **********************************************
        // *** Update or verify the following values. ***
        // **********************************************
        
        // Replace the accessKey string value with your valid access key.
        let accessKey = '8669676a0bdc4620a7736b162e6cdd25';
        
        // Replace or verify the region.
        
        // You must use the same region in your REST API call as you used to obtain your access keys.
        // For example, if you obtained your access keys from the westus region, replace 
        // "westcentralus" in the URI below with "westus".
        
        // NOTE: Free trial access keys are generated in the westcentralus region, so if you are using
        // a free trial access key, you should not need to change this region.
        let uri = 'australiaeast.api.cognitive.microsoft.com';
        let path = '/text/analytics/v2.1/keyPhrases';
        
        let response_handler = function (response) {
            
                body = '';
                response.on ('data', function (d) {
                    body += d;
                });
                response.on ('end', function () {
            		body_ = JSON.parse (body);
            		body__ = JSON.stringify (body_, null, '  ');
                    //console.log (body__);
                    results = body_;
                    
                });
                response.on ('error', function (e) {
                    console.log ('Error: ' + e.message);
                });
        };
        
        let get_key_phrases = function (documents) {
        	let body = JSON.stringify (documents);
        
        	let request_params = {
        		method : 'POST',
        		hostname : uri,
        		path : path,
        		headers : {
        			'Ocp-Apim-Subscription-Key' : accessKey,
        		}
        	};
        
        	let req = https.request (request_params, response_handler);
        	req.write (body);
        	req.end ();
        }
        
        let documents = data;
    
    
        get_key_phrases (documents);
    
        
}