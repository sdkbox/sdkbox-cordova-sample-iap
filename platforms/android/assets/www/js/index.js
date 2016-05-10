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
        app.receivedEvent('deviceready');
        
            sdkbox.PluginIAP.initPlugin(
                {
                    "config" : {
                        "iap": {
                            "key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq7eIGu7dRcBRBSC05cYvxjBMd7cqq9w6++1er+cqO2tyWPtWB4vuTkliq4k/Fkylx5UMfptdOYOW8ENgQyVucs/NyuOAGmve4j5JFhLPcLa6LjO2HUSY6zk04DRR9Zw7YPET4WAezZTz8jYMGhPG08HYltVj8cmSpSFWd1nI0pGOJoLQIMkIkXplgnPQRbMpuOu70vnQQBS1RFcoFT7OjaV8U0cfJzMoS1TMkGqaJKks2T+qOBNTtkXzge92EnvYIkhpCfN98dj6aQmETNp5yj5Fa+jcbAVF8dy5xymJwioL89XQKfKkGR+P6ESMoBEPfIZYIlMU8EUwmC+UKGLujQIDAQAB",
                            "items": {
                                    "remove_ads": {
                                    "id": "com.cocos2dx.non1",
                                    "type": "non_consumable"
                                },
                                    "double_coin": {
                                    "id": "com.cocos2dx.non2",
                                    "type": "non_consumable"
                                },
                                    "coin_package": {
                                    "id": "com.cocos2dx.plugintest2"
                                },
                                    "coin_package2": {
                                    "id": "com.cocos2dx.plugintest3"
                                }
                            }
                        }
                    }
                },
                function success() {
                __log("Initialization ok");
                },
                function error() {
                __log("Initialization error");
                }
                );

        function __log( obj ) {
            var res = document.getElementById('result');
            if ( obj ) {
                res.textContent = JSON.stringify( obj, 0, 2 );
            } else {
                res.textContent = "";
            }
        }

        function createProductsButtons( products ){
            
            var nproducts= document.getElementById('products');
            nproducts.innerHTML='';
            
            products.forEach(function(product) {
            
                var span = document.createElement('div');
                             span.className = "button-purchase";
                             span.innerText = product.title;
                             span.addEventListener("touchend",function(ev){
                                                    sdkbox.PluginIAP.purchase(
                                                                              product.name,
                                                                              product.type,
                                                                              function success( purchase_result) {
                                                                              __log( purchase_result );
                                                                              },
                                                                              function error( err ) {
                                                                              __log( err );
                                                                              });
                            },false);
                             nproducts.appendChild( span );
            });
        }

        var _clear_result =document.getElementById("clear-results");
        _clear_result.addEventListener('touchend', function(e) {
                                       __log();
                                       }, false );

        var _get_products= document.getElementById("get-products");
        _get_products.addEventListener('touchend', function(e) {
                                       
           sdkbox.PluginIAP.getProducts(
                function( products ) {
                    __log( products );
                    createProductsButtons(products);
                },
                function(error) {
                    __log( error ) ;
                });

       }, false);

        var _refresh= document.getElementById("refresh");
        _refresh.addEventListener('touchend', function(e) {
                                       
           sdkbox.PluginIAP.refresh(
                function( products ) {
                    __log( products );
                    createProductsButtons(products);
                },
                function(error) {
                    __log(error);
                });
       }, false);

        var _restore= document.getElementById("restore");
        _restore.addEventListener('touchend', function(e) {
       
           sdkbox.PluginIAP.restore(
                function( product ) {
                    __log( product );
                },
                function(error) {
                    __log( error );
                });
           
       }, false);

        
        
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