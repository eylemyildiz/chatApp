app.controller('chatController',['$scope',($scope) =>{
    $scope.onlineList = [];
    $scope.activeTab = 2;

    $scope.changeTab = tab =>{
        $scope.activeTab = tab;
    };

    const socket = io.connect("http://localhost:3000");
   // console.log('aaaaaaaaaaaaaaaaaaaaaaaa hellooooo');

    /*socket.on('hello', () =>{
        console.log('hello from server1');
    });*/

    socket.on('onlineList', users =>{
        $scope.onlineList = users;
        $scope.$apply();
    });

}]);