angular.module('taskApp', ['ui.router','ngResource'])


    .controller('taskController', ['$scope', 'taskFactory', function($scope, taskFactory) {


        var host = window.location.hostname;
        $scope.tasklist;
        taskFactory.getTaskList(host).query(
                function(response) {
                    $scope.tasklist = response;
                   
        });

        $scope.task = {'text':''};


        $scope.sendQuery = function(){
            
            taskFactory.query1(host).post($scope.task,function(data){
                $scope.tasklist.push(data);
                console.log($scope.tasklist);
                $scope.task = '';
                
            });

        }
        $scope.tab = 1;
        
        $scope.filtText = '';

        $scope.select = function(setTab) {
            $scope.tab = setTab;
        
     
            if (setTab === 2) {
                $scope.filtText = 'Completed';
            }
            else if (setTab === 3) {
                $scope.filtText = 'In process';
            }
         
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };


        $scope.deleteTask = function (id){
            console.log(id);
        }
        
          
    }]);