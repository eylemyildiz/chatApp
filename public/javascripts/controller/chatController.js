app.controller('chatController',['$scope',($scope) =>{
    const socket = io.connect("http://localhost:3000");
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa hellooooo');

    socket.on('hello', () =>{
        console.log('hello from server1');
    });

}]);