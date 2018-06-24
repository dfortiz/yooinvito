/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var info = null;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        console.log('fx onDeviceReady Event: ');
        //var edmsg = document.getElementById('dmsg');
        //edmsg.innerHTML += "fx onDeviceReady Event ok <br/>";

        // cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
        //     show_message("GPS location is " + (enabled ? "enabled" : "disabled"));
        // }, function(error){
        //     show_message("The following error occurred: "+error);
        // }); 


        if(!localStorage.getItem("rp_data"))
        {
          var rp_data = {data: []};
          localStorage.setItem("rp_data", JSON.stringify(rp_data));
        }

        info = JSON.parse(localStorage.getItem("rp_data"));
        
        //window.BackgroundTimer.onTimerEvent(eventCallback); // subscribe on timer event
        //window.BackgroundTimer.start(successCallback, errorCallback, settings);
        
        var intervalID = setInterval(function() { 
        
            add_reminder_now('Nuevas Ofertas te esperan',' este es el mensaje!!');

        }, 30000);



        show_message("OK!!!!!: ");

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);



    }
};

app.initialize();

function dotest() {

    var edmsg = document.getElementById('dmsg');
    edmsg.innerHTML += "dotest ok <br/>";
}

function dotest2() {

    getLocation();

    show_message('dotest2 ok');
    
}

function show_message(message) {

    //var edmsg = document.getElementById('dmsg');
    //edmsg.innerHTML += message + '<br/>';
}


function getLocation() {

    cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
        // alert("GPS location is " + (enabled ? "enabled" : "disabled"));
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          show_message("Geolocation is not supported by this browser.");
        }

    }, function(error){
            show_message("getLocation error : "+error);
    }); 

    
}

function showPosition(position) {
    show_message( "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude); 
}




function add_reminder()
{
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var title = document.getElementById("title").value;
    var message = document.getElementById("message").value;

    if(date == "" || time == "" || title == "" || message == "")
    {
      navigator.notification.alert("Please enter all details");
      return;
    }

    var schedule_time = new Date((date + " " + time).replace(/-/g, "/")).getTime();
    schedule_time = new Date(schedule_time);

    var id = info.data.length;

    cordova.plugins.notification.local.hasPermission(function(granted){
      if(granted == true)
      {
        schedule(id, title, message, schedule_time);
      }
      else
      {
        cordova.plugins.notification.local.registerPermission(function(granted) {
            if(granted == true)
            {
              schedule(id, title, message, schedule_time);
            }
            else
            {
              navigator.notification.alert("Reminder cannot be added because app doesn't have permission");
            }
        });
      }
    });
}

function add_reminder_now(title, message )
{
    
    schedule_time = new Date();

    var id = info.data.length;

    cordova.plugins.notification.local.hasPermission(function(granted){
      if(granted == true)
      {
        schedule(id, title, message, schedule_time);
      }
      else
      {
        cordova.plugins.notification.local.registerPermission(function(granted) {
            if(granted == true)
            {
              schedule(id, title, message, schedule_time);
            }
            else
            {
              navigator.notification.alert("Reminder cannot be added because app doesn't have permission");
            }
        });
      }
    });
}

function schedule(id, title, message, schedule_time)
{
    cordova.plugins.notification.local.schedule({
        id: id,
        title: title,
        message: message,
        at: schedule_time
    });

    var array = [id, title, message, schedule_time];
    info.data[info.data.length] = array;
    localStorage.setItem("rp_data", JSON.stringify(info));

    navigator.notification.alert("Reminder added successfully")
}



// var eventCallback = function() {
//     // timer event fired
//     show_message('eventCallback 111');
//     add_reminder_now('titulo este etes',' este es el mensaje!!');
//     show_message('eventCallback 222');

// }

// var successCallback = function() {
//     // timer plugin configured successfully
//     show_message('successCallback 1');

// }

// var errorCallback = function(e) {
//     // an error occurred
//     show_message('errorCallback 1');

// }

// var settings = {
//     timerInterval: 60000, // interval between ticks of the timer in milliseconds (Default: 60000)
//     startOnBoot: true, // enable this to start timer after the device was restarted (Default: false)
//     stopOnTerminate: true, // set to true to force stop timer in case the app is terminated (User closed the app and etc.) (Default: true)

//     // hours: 12, // delay timer to start at certain time (Default: -1)
//     // minutes: 0, // delay timer to start at certain time (Default: -1)
// }

// window.BackgroundTimer.onTimerEvent(eventCallback); // subscribe on timer event
// // timer will start at 12:00
// window.BackgroundTimer.start(successCallback, errorCallback, settings);

show_message('script completo ok end');
