const express = require("express");
const request = require("request");


request('http://www.google.com', function (error, response, body) {
    if (error) {
        console.log('Something went wrong');
        console.error(error);
    }
    else {
        if (response.statusCode == 200) {
            console.log(body);
        }
    }
});
