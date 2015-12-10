// our controller for the form
// =============================================================================
formApp.controller('PassengersCtrl', function($scope,$http,$state) {
	$scope.count=1;
    $scope.disableForm="true";
    var checkStatus=null;
    $scope.formData = {};
    $scope.formData.count="India";
    
    
    


   /* if($scope.formData.email==null || $scope.formData.email==undefined){
        $state.go('form.profile');
    }
   */
    $scope.add=function(){
    	$scope.passengerForm.push({"name":'',"user_id":$scope.formData.ID});
    }



    var getPassengerDetails=function(){
        var getPassenger={};
        getPassenger.user_id=$scope.formData.ID;
        console.log("getPassenger",getPassenger)
        $http.post("http://52.3.211.255:1107/getpassengers",getPassenger, {
            headers: { 'Content-Type': 'application/JSON; charset=UTF-8'}
        }).success(function(responseData) {
            $scope.passengerForm=responseData.result;
            $scope.isLoading=false;
            if(responseData.result.length==0){
               $scope.passengerForm=[{
                   "name":'',
                   "user_id":$scope.formData.ID
               }];
               $scope.emptyData=true;
           }else{
            $scope.emptyData=false;;
        }
       // $scope.passengerForm={};
   });
    }

    $scope.submitPassengerDetails=function(){
        $scope.isLoading=true;
        for (var i=0; i<$scope.passengerForm.length; i++) {
            if($scope.passengerForm[i].dorm_type=='NonAc'){
                $scope.passengerForm[i].dorm_type='NAC';
                $scope.passengerForm[i].amount=4500;
            }if($scope.passengerForm[i].dorm_type=='Shared'){
                $scope.passengerForm[i].dorm_type='CH';
                $scope.passengerForm[i].amount=0;
            }if($scope.passengerForm[i].dorm_type=='AC'){
             $scope.passengerForm[i].amount=9000;  }
             if($scope.passengerForm[i].gender=='Male'){
              $scope.passengerForm[i].gender='M';
          }if($scope.passengerForm[i].gender=='Female'){
            $scope.passengerForm[i].gender='F';
        }if($scope.passengerForm[i].special_needs==true){
            $scope.passengerForm[i].special_needs='CB';
        }if($scope.passengerForm[i].d1==true){
            $scope.passengerForm[i].special_needs=$scope.passengerForm[i].special_needs+',CW';
        }
        else{
            $scope.passengerForm[i].special_needs='NO';
        }

    };
    console.log("passengerDetails",$scope.passengerForm)
    $http.post("http://52.3.211.255:1107/passengers", $scope.passengerForm, {
        headers: { 'Content-Type': 'application/JSON; charset=UTF-8'}
    }).success(function(responseData) {
        console.log(JSON.stringify(responseData));
        getPassengerDetails();
    }).error(function(status){
        console.log(status);

    });
}

/*var paymentRequest=function(paymentRequestResults){
      $scope.isLoading=true;
      var payment_requests_details={};
    //$scope.PaymentDetals.amount=$scope.totalAmount
    if($scope.formData.amount!=undefined){
      $scope.PaymentDetals.amount=$scope.formData.amount;
    }else{
      $scope.PaymentDetals.amount=$scope.totalAmount;
    }
    console.log($scope.totalAmount);
    var paymentInfo={
      'amount':10,
      'purpose':'registration',
      'buyer_name':$scope.formData.contact_name,
      'email':$scope.formData.contact_email,
      'phone':$scope.formData.contact_number,
      'send_email':true,
      'send_sms':true,
      'redirect_url':'http://127.0.0.1:8080/#/form/profile',
      'webhook':'http://52.3.211.255:1107/webhook',
      'allow_repeated_payments':false
    }

    $http({
      url : 'https://www.instamojo.com/api/1.1/payment-requests/',
      method : "post",
      headers: {
        'X-Api-Key': 'a781bd097cc86a560eac695ff4848e4b',
        'X-Auth-Token':'6574831da9e4d4a61f54dd2160f6e0c4',
        'content-Type': 'Application/Json'
       /* 'Access-Control-Max-Age':3600,
        'Access-Control-Allow-Origin':'https://www.instamojo.com',
        'Access-Control-Allow-Methods':'POST,PUT,GET,OPTIONS',
        'Access-Control-Allow-Headers':'AUTHORIZATION'  */
      /*},
      data : paymentInfo
    }).success(function(response) {
      console.log("reponse response.data", response);
      var payment_requests_details=response.payment_request;
     
        window.open(paymentRequestResults.payment_request.longurl, '_self', 'location=no');
      }
    }).error(function (data, status, headers, config) {
      console.log("error",status);

    });
  }*/

  /*var getPaymentId=function(payment_requests_data){
    $http({
      url : 'https://www.instamojo.com/api/1.1/payment-requests/ff78ecae9e1945a1b9510102c76b1b95',
      method : "get",
      headers: {
        'X-Api-Key': 'a781bd097cc86a560eac695ff4848e4b',
        'X-Auth-Token':'6574831da9e4d4a61f54dd2160f6e0c4',
        'content-Type': 'Application/Json',
            }
    }).success(function(response) {
      console.log("reponse response.data", response.payment_request.shorturl); 
           // window.open(response.payment_request.longurl, '_self', 'location=no');
           confirmPayment(response.payment_request.payments[0]);
           $scope.isLoading=false;
         }).error(function (data, status, headers, config) {
          console.log("error",status);

        });
       }
*/


});