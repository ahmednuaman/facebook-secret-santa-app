import module from 'module'

module
  .service('santaService', ['$http', function ($http) {
    this.send = (santas) => $http.post('/🎅', { santas })
  }])