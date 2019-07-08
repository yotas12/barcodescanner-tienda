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

var _yy;

function barcodescanner() {
    cordova.plugins.barcodeScanner.scan(
        function(result) {
            $("#codigo").val(result.text);
            $("#yy").val(result.text);
            alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
            
        },
        function(error) {
            alert("Scanning failed: " + error);
        }, {
            preferFrontCamera: true, // iOS and Android
            showFlipCameraButton: true, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: true, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt: "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true, // iOS
            disableSuccessBeep: false // iOS and Android
        }
    );
}

function mostar() {
    var mydb = window.openDatabase('test', '1.0', 'My test database', 1024 * 1024, function(mydb) {});
    mydb.transaction(function(transaction) {
        transaction.executeSql('SELECT * FROM Prueba', [], function(tx, results) {
            var len = results.rows.length,
                i;
            $("#rowCount").append(len);
            for (i = 0; i < len; i++) {
                $("#TableData").append("<tr><td>" + results.rows.item(i).id + "</td><td>" + results.rows.item(i).codigo + "</td><td>" + results.rows.item(i).producto + "</td><td>" + results.rows.item(i).precio + "</td></tr>");
            }
        }, null);
    });
}
function yy(e){
    var mydb = window.openDatabase('test', '1.0', 'My test database', 1024 * 1024, function(mydb) {});
    mydb.transaction(function(transaction) {
        transaction.executeSql("SELECT * FROM Prueba  WHERE codigo like ('%"+ e + "%')", [], function(tx, results) {
            var len = results.rows.length,
                i;
            $("#rowCount1").append(len);
            for (i = 0; i < len; i++) {
                $("#TableData1").append("<tr><td>" + results.rows.item(i).id + "</td><td>" + results.rows.item(i).producto + "</td><td>" + results.rows.item(i).precio + "</td></tr>");
            }
        }, null);
    });
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var mydb = window.openDatabase('test', '1.0', 'My test database', 1024 * 1024, function(mydb) {});
        mydb.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Prueba (id INTEGER PRIMARY KEY ASC AUTOINCREMENT, codigo TEXT, producto TEXT, precio INTEGER)', [],
                function(tx, result) {
                   var y = result
                },
                function(error) {
                    alert("Error occurred while creating the table.");
                });
        });
        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();