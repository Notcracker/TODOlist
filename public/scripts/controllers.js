angular.module('taskApp', ['ui.router','ngResource'])


    .controller('taskController', ['$scope', 'taskFactory', function($scope, taskFactory) {
        $scope.search = '';
        $scope.task = {'text':''};
        $scope.tasklist;
        

        var host = window.location.hostname;


        
        taskFactory.getTaskList(host).query(
                function(response) {
                    $scope.tasklist = response;
                   
        });

        $scope.filterTasks = function(){
            taskFactory.getTaskList(host).query(
                function(response) {
                    $scope.tasklist = response;
                    $scope.superArray = [];
                    for (var j=0; j<$scope.tasklist.length; j++) {
                        if ($scope.tasklist[j].taskBody.match($scope.search)) {
                            $scope.superArray.push($scope.tasklist[j]);
                        };
                    }
                    $scope.tasklist = $scope.superArray;
            });
            
            
        }

        $scope.sendQuery = function(){
            
            taskFactory.query1(host).post($scope.task,function(data){
                $scope.tasklist.push(data);
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
            
            taskFactory.delTask(host).delete({id:id},function (data) {
                taskFactory.getTaskList(host).query(
                function(response) {
                    $scope.tasklist = response;
                   
                });
            })
        };

        $scope.changeStatus = function (id) {
            
            taskFactory.changeTaskStatus(host).update({id:id},function (data) {
                taskFactory.getTaskList(host).query(
                function(response) {
                    $scope.tasklist = response;
                   
                });                 
                
            });
        }
        
          
    }]);