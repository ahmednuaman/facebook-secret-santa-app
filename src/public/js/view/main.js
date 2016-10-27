import module from 'module'
import '../service/santa'

module
  .controller('MainController', ['$scope', 'santaService', ($scope, santaService) => {
    const handleSuccess = (response) => {
      console.log(response.data)
      $scope.presentResponse(response.data)
    }

    const handleError = () => {
      console.log(arguments)
    }

    $scope.santas = [''];

    $scope.addSanta = () => {
      $scope.santas.push('')
    }

    $scope.removeSanta = ($index) => {
      if ($scope.santas.length > 1) {
        $scope.santas.splice($index, 1);
      }
    }

    $scope.presentResponse = ($response) => {
      $scope.secretSantas = $response
    }

    $scope.submit = ($event) => {
      $event.preventDefault()

      santaService
        .send($scope.santas)
        .then(handleSuccess, handleError)
    }

    $scope.secretSantas = []

  }])
