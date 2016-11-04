import facebookService from './service/facebook'
import './view/main'

window.fbAsyncInit = function () {
  const FB = window.FB

  FB.init({
    appId: '186623538410942',
    version: 'v2.8'
  })

  FB.login(function (response) {
    console.log(response)
    if (response.authResponse) {
      facebookService.getFriends(response.authResponse.userID)
    }
  }, {
    scope: 'user_friends'
  })
}
