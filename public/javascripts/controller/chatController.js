app.controller('chatController',['$scope',($scope) =>{
    /**
     * Angular variables
     */
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.chatName="";
    /**
     * Socket.io event handling.
     */
    const socket = io.connect("http://localhost:3000");
   // console.log('aaaaaaaaaaaaaaaaaaaaaaaa hellooooo');

    /*socket.on('hello', () =>{
        console.log('hello from server1');
    });*/

    socket.on('onlineList', users =>{
        $scope.onlineList = users;
        $scope.$apply();
    });

    socket.on('roomList', rooms =>{
        $scope.roomList = rooms;
        $scope.$apply();
    });


    $scope.switchRoom = room =>{
        $scope.chatName=room.name;
        $scope.chatClicked = true;
    };

    $scope.newRoom = () =>{

        //random roomname
        //let randomName = Math.random().toString(36).substring(7);
        //console.log(randomName);
        //socket.emit('newRoom',roomName);

        //UI'dan room name alma
        let roomName = window.prompt("Enter room name");
        if(roomName != '' && roomName != null)
        {
            //sunucuma emit yapıp o isimde bir room oluşturucaz.
            socket.emit('newRoom',roomName);
        }
    };

    //front-end
    $scope.changeTab = tab =>{
        $scope.activeTab = tab;
    };

}]);