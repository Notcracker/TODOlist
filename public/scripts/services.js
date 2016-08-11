angular.module('taskApp')
        .factory('taskFactory', ['$resource', function($resource) {
            var taskfac = {};

            // make query
            taskfac.query1 = function (host) {
                
                return $resource('http://'+host+':3000', null, {'post':{method:'POST'}});
                
            };

            taskfac.getTaskList = function (host) {
                return $resource('http://'+host+':3000'+'/tasks', null, {'get':{method:'GET'}});
            }

            taskfac.delTask = function (host){
                
                return $resource('http://'+host+':3000'+'/tasks/:id', null, {'delete':{method:'DELETE'}});
            }

           
            taskfac.changeTaskStatus = function (host) {
                return $resource('http://'+host+':3000'+'/tasks', null,  {'update':{method:'PUT'}});
            };
            return taskfac;
        }])