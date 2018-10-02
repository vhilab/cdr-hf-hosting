
<!--
//  Based upon quick_start_template.html
//  Created by Faye Li on 3 Feb 2017
//  Copyright 2017 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
//  Adapted for CDR study by Mark Miller, 28 Aug 2018
-->
<html>
    <head>
        <title>Teleporting Table</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,600,700" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div class="top-bar">
            <h4>Teleporting Table</h4>
        </div>
        <div class="content">
            
            <table class="bordered">
            <tr>
              <td></td>
              <td>Table</td>
              <td>No Table</td>
            </tr>
            <tr>
              <td>Core</td>
              <td>
                <input type="button" class="app-button" value="A">
                <input type="button" class="app-button" value="B">
                <input type="button" class="app-button" value="C">
              </td>
              <td>
                <input type="button" class="app-button" value="A">
                <input type="button" class="app-button" value="B">
                <input type="button" class="app-button" value="C">
              </td>
            </tr>
            <tr>
              <td>Periphery</td>
              <td>
                <input type="button" class="app-button" value="A">
                <input type="button" class="app-button" value="B">
                <input type="button" class="app-button" value="C">
              </td>
              <td>
                <input type="button" class="app-button" value="A">
                <input type="button" class="app-button" value="B">
                <input type="button" class="app-button" value="C">
              </td>
            </tr>
            </table>
        </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script>
            function main() {
                // Send an event to gemstoneApp.js when the page loads and is ready to get things rolling
                console.log("document ready");
                var readyEvent = {
                    "type": "ready",
                };
                // The event bridge handles events represented as a string the best. So we first create a Javascript object, then convert to stirng
                EventBridge.emitWebEvent(JSON.stringify(readyEvent));
                // Send an event when user click on each of the gemstone buttons
                $('.app-button').click(function(){
                		var td = $(this).parent();
                    var col = $(td).parent().children().index($(td));
                    var row = $(td).parent().parent().children().index($(td).parent());
                    console.log(this.value + " " + row + " " + col + " button click");
                    var clickEvent = {
                        "type": "cdr-click",
                        "data": {
                             "value": this.value,
                             "row" : row,
                             "col" : col
                        }
                    };
                    EventBridge.emitWebEvent(JSON.stringify(clickEvent));
                });
            }
            $(document).ready(main);
        </script>
    </body>
</html>
