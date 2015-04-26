var app = angular.module("app", ["ngRoute"]);




/**
 * RouteProvide
 * Prametros de las rutas 
 */
app.config(['$routeProvider', function($routeProvider)
{
    $routeProvider.when("/carreras",{
        templateUrl : "./carreras.php",
        controller : "carreras"
    })
    .when("/nuevousuario",{
        templateUrl : "./nuevousuario.php",
        controller : "nuevousuario"
    })
    .when("/organizadores",{
    	templateUrl : "./organizadores.php",
    	controller : "organizadores"
    })
    .when("/ayuda",{
        templateUrl : "ayuda.php",
        controller : "ayuda"
    })
    .when("/contacto",{
        templateUrl : "./contacto.php",
        controller : "contacto"
    })
    .when("/single/:carreraId",{
        templateUrl : "./single.php",
        controller : "single"
     })
    .when("/portada",{
        templateUrl : "./portada.php",
        controller: "portada"
     })
    .when("/privacidad",{
        templateUrl : "./privacidad.php"
     })
    .otherwise({ templateUrl : "./portada.php", controller: "portada" });
}]);

/*
app.controller('single', ['$scope', '$routeParams' , function($scope,$routeParams){
    $scope.variable = "single";
    $scope.identificador = $routeParams.identificador;
}]); */

app.controller('portada', ['$scope', function($scope)
{
    $scope.lugar = "Portada";

}]);


app.controller('carreras', ['$scope', function($scope)
{
	$scope.lugar = "Proximas Carreras";

}]);

app.controller('nuevousuario', ['$scope', function($scope)
{
	$scope.lugar = "Nuevo Usuario";

}]);

app.controller('organziadores', ['$scope', function($scope)
{
	$scope.lugar = "Organizadores";

}])

app.controller('ayuda', ['$scope', function($scope)
{
    $scope.lugar = "Ayuda";

}]);

app.controller('contacto', ['$scope', function($scope)
{
    $scope.lugar= "Contacto";

}]);


/**
 * Construccion del Menu
 *
 */
app.factory('enlacesMenu', function(){
    return{
        menu : [
            {nombre:"Portada",           url: "portada",        icon:"fa fa-home"},
            {nombre:"Proximas Carreras", url: "carreras",       icon:"fa fa-globe"},
            {nombre:"Nuevo Usuario",     url: "nuevousuario",   icon:"fa fa-user-plus"},
            {nombre:"Organizadores",     url: "organizadores",  icon:"fa fa-cube"},
            {nombre:"Ayuda",             url: "ayuda",          icon:"fa fa-life-ring"},
            {nombre:"Contacto",          url: "contacto",       icon:"fa fa-comments"}
        ]
    };
});

app.controller('enlacesmenu', ['$scope', 'enlacesMenu', function($scope,enlacesMenu){
    $scope.menu = enlacesMenu.menu;
}])




/* [FUNCIONES AJAX]  */

/**
 * Controller proximasCarreras
 * Este controlador obtiene todas las carreras actuales traidas a traves de ajax 
 * las almacena en objeto JSON
 * @param  {[type]} $scope   [description]
 * @param  {[type]} $http){                      $http.get("lib/ajaxProximas.php").success(function(carrerasP){        $scope.carreras [description]
 * @return {[type]}          [description]
 */
app.controller('proximasCarreras', ['$scope','$http', function($scope,$http){     
    $http.get("lib/ajaxProximas.php").success(function(carrerasP){
        $scope.carreras = carrerasP;
    });
}]);


/**
 * Controller Single
 * funcion que obtiene el ID de una carrera en el RouteParams y por ajax
 * obtiene el objeto JSON.
 * @param  {[type]} $scope          [description]
 * @param  {[type]} $http           [description]
 * @param  {[type]} $routeParams){                  $scope.identificador [description]
 * @return {[type]}                 [description]
 */
app.controller('single', ['$scope','$http', '$routeParams', function($scope,$http,$routeParams){
     $scope.identificador = $routeParams.carreraId;
     // La peticion la hago get ya que post no funciona correctamente
     // obtenemos el id a traves de $routeParams.carreraId que esta en los RouteProviders
    $http.get('lib/ajaxSingle.php?id='+$routeParams.carreraId+' ').success(function(response){
        $scope.carrera = response;  
    }); 
}]);



