angular.module('taskApp')
        .factory('taskFactory', ['$resource', function($resource) {
            var searchfac = {};

            // make query
            searchfac.query1 = function (host) {
                
                return $resource('http://'+host+':3000', null, {'post':{method:'POST'}});
                
            };

            searchfac.getTaskList = function (host) {
                return $resource('http://'+host+':3000'+'/tasks', null, {'get':{mathod:'GET'}});
            }

            return searchfac;
        }])