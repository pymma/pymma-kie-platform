/*
 * Copyright 2014 Pymma Software
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var productManagerModule = angular.module('productManagerApp', ['ngAnimate']);

productManagerModule.controller('quoteManagerController', function ($scope, $http) {

    var urlBase = "";
    var aPerson1 = {
        "name": "Héron",
        "surname": "Nicolas",
        "gender": "male",
        "birthdate": new Date("1968-08-23")
    }
    var aPerson2 = {
        "name": "Héron",
        "surname": "Camille",
        "gender": "female",
        "birthdate": new Date("2000-09-09")
    }
    var aPerson3 = {
        "name": "Héron",
        "surname": "Lilian",
        "gender": "male",
        "birthdate": new Date("2003-07-22")
    }
    var aPerson4 = {
        "name": "Héron",
        "surname": "Zéphirin",
        "gender": "male",
        "birthdate": new Date("2011-12-31")
    }
    var anAdress = {
        "streetNumber": "3",
        "streetName": "A name",
        "zipCode": "20000",
        "cityName": "Zurich"
    }
    $scope.quote = {
        "quoteDate": new Date("2016-08-23"),
        "validUntil": new Date(),
        "address": anAdress,
        "period": {
            "desidedStartDate": new Date(),
            "seasonType": "day"
        },
        "personList": [aPerson1, aPerson2, aPerson3, aPerson4],
        "priceList": []
    };
    $scope.quoteResult = []
    $scope.sessionLogging = '{angularjs: 1, is: 2, awesome: 3}';
    $scope.products = [];
    $scope.selection = [];
    $scope.productSearch = "";
    $http.defaults.headers.post["Content-Type"] = "application/json";
    $scope.allSessionExecutionDetails = [];
    $scope.containerid = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2MDk5OWEyZGQ3YWUyODNmY2MyNWFhNzciLCJpYXQiOjE2MjY4NzkxMjUsInN1YiI6ImFwaSIsImlzcyI6InB5bW1hIiwiZ3JvdXBJRCI6ImNvbS5weW1tYXNvZnR3YXJlLmpicG0udHJhaW5pbmciLCJhcnRpZmFjdElEIjoic3dpbW1pbmdwb29sLXR1dG9yaWFsIiwicHJvamVjdFZlcnNpb24iOiIyLjAuMC1TTkFQU0hPVCIsImJyYW5jaCI6Im1hc3RlciIsIm1haW5DbGFzcyI6Im9yZy50cmFpbmluZy5sZWlzdXJlLnN3aW1taW5ncG9vbC5RdW90ZSIsImV4cCI6MTY1ODQxNTEyNX0.sKYOY98Hsk4JcS546f7xmj1tPNxdrqRtw5y6w0qdu88";
    $scope.aClassName = "org.training.leisure.swimmingpool.Quote";
    var _lastGoodResult = '';
    $scope.toPrettyJSON = function (objStr, tabWidth) {
        try {
            var obj = $parse(objStr)({});
        } catch (e) {
            // eat $parse error
            return _lastGoodResult;
        }

        var result = JSON.stringify(obj, null, Number(tabWidth));
        _lastGoodResult = result;

        return result;
    };
    $scope.deleteline = function (personline) {
        for (i = 0; i < $scope.quote.personList.length; i++) {
            var aPerson = $scope.quote.personList[i];
            if (aPerson.name == personline.name && aPerson.surname == personline.surname) {
                $scope.quote.personList.splice(i, 1);
            }
        }
        ;

    };
    $scope.addPerson = function () {
        var aPerson = {
            "name": "",
            "surname": "",
            "gender": "male",
            "birthdate": new Date()
        }
        $scope.quote.personList.push(aPerson);


    };


    $scope.calculatePrice = function () {
        var myQuote = $scope.quote;
        myQuote.sessionLogging=uuidv4();
        $http.put(urlBase + "/quote/calculate/" + $scope.containerid + "/", myQuote).success(function (data) {
            $scope.quoteResult = data;
            $scope.allSessionExecutionDetails = JSON.parse(data.sessionLogging);
            $scope.sessionLogging = JSON.stringify($scope.allSessionExecutionDetails, null, 3);
            // $scope.sessionLogging=data.sessionLogging;
        })
    }
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

});





