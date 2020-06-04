app.controller('chatController',['$scope',($scope) =>{
    $scope.onlineList = [];
    $scope.activeTab = 2;

    const socket = io.connect("http://localhost:3000");
   // console.log('aaaaaaaaaaaaaaaaaaaaaaaa hellooooo');

    /*socket.on('hello', () =>{
        console.log('hello from server1');
    });*/

    socket.on('onlineList', users =>{
        $scope.onlineList = users;
        $scope.$apply();
    });

    $scope.newRoom = () =>{

        let randomName = Math.random().toString(36).substring(7);
        console.log(randomName);
        //sunucuma emit yapıp o isimde bir room oluşturucaz.
        socket.emit('newRoom',randomName);

    };

    //front-end
    $scope.changeTab = tab =>{
        $scope.activeTab = tab;
    };

}]);