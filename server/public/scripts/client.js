var app = angular.module('RestaurantApp',[]);

app.controller('FoodController', ['$http',function($http){
    console.log('FoodController is running');
    var self = this; 
    self.foodArray = [];
    self.newFood = {is_hot: false};


    self.getFood = function (){
        $http({
            method: 'GET',
            url: '/food'
        }).then(function(response){
            console.log('response',response.data);
            self.foodArray = response.data;
        });
    };



    self.addNewFood = function(newFood){
        $http({
            method: 'POST',
            url: '/food',
            data: newFood
        }).then(function(response){
            console.log('response', response);
            self.newFood = {is_hot: false};
            self.getFood();
        })
    }//end addNewFood

    self.deleteFood = function(id){

        
        $http({
            method: 'DELETE',
            url: '/food/' + id,
        }).then(function(response){
            console.log('response', response)
            self.getFood();
        })
    }//end deleteFood


    self.editFood = function(id){

        $http({
            method: 'PUT',
            url: '/food/' + id,
            data: {is_hot: true}
        }).then(function(response){
            self.getFood();
        })
    }
    
    self.getFood();


}]);