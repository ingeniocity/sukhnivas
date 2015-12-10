
formApp.controller('formController', function($scope,$Country,$http,$state) {
	$scope.count=1;
  $scope.disableForm="true";
  $scope.isLoading=false;
  $scope.test1={};
  var checkStatus=null;
  $scope.formData = {};
  $scope.formData.country="India";
  $scope.uniqueEmail=false;
  $scope.emptyData=false;
  $scope.totalAmount=0;
  $scope.PaymentDetals={};
  $scope.searchEmail='';
  var api_url="http://api.sukhnivas.in:1107/";
         $scope.procescheckStatussForm = function() {
          alert('awesome!');
        };

        $scope.searchByReference=function(){
         $scope.checkEmail();
       }

       function isEmailAddress(str) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
        return pattern.test(str);    

      }

    /*if($scope.formData.email==null || $scope.formData.email==undefined){
        $state.go('form.profile');
      }*/
      $scope.country1=$Country.getCountry();

      $scope.add=function(){
       $scope.passengerForm.push({"name":'',"user_id":$scope.formData.ID});
     }


     $scope.checkEmail=function(){
      if($scope.searchEmail!=''){
       $scope.formData.contact_email=$scope.searchEmail;
     } 
     if(isEmailAddress($scope.formData.contact_email)){
       $scope.isLoading=true;
       $http({
         url:api_url+'checkemail?contact_email='+$scope.formData.contact_email, 
         method: "post",
       }).success(function(response){
        console.log("response",response)
        $scope.Datalength=response.result.length;
        if(response.result.length>0){
         $scope.formData=response.result[0];
       }else{
        $scope.test1=response;
        $scope.disableForm=false;
        checkStatus='initial';
      }
      $scope.uniqueEmail=true;
      $scope.isLoading=false;
    }).error(function(status){
      alert("please valid EmailID")
      $scope.isLoading=false;
    })
  }
  else{
    alert("Please Ensure Your email ")
  }
}



$scope.submitUserDetail=function(){
  $scope.isLoading=true;
  console.log($scope.formData);
  $http.post(api_url+'userdetails',$scope.formData,{ 
    headers: { 'Content-Type': 'application/JSON; charset=UTF-8'}   
  }).success(function(response){
    $scope.checkEmail();
   console.log("reponse",response.ID);
   $scope.uniqueEmail=true;
   $scope.isLoading=false;
 }).error(function(status){
  alert("please valid EmailID")
  console.log("error"+status)

})

}

$scope.editForm=function(){
  $scope.disableForm=false;
}


$scope.updateUserInfo= function(){
  $scope.isLoading=true;
  if(checkStatus=='initial'){
   $scope.submitUserDetail();
   checkStatus='';
 }else{
  console.log("update",$scope.formData)
  $http.post(api_url+'updateuserdetails',$scope.formData,{ 
    headers: { 'Content-Type': 'application/JSON; charset=UTF-8'}   
  }).success(function(response){
    console.log("reponse",response);
    $scope.isLoading=false;
    $scope.uniqueEmail=true;
  }).error(function(status){
    alert("please valid EmailID")
    $scope.isLoading=false;

    console.log("error"+status)

  })

}
$scope.disableForm=true;

}

var getPassengerDetails=function(){
  var getPassenger={};
   $scope.isLoading=true;
  $scope.totalAmount=0;
  getPassenger.user_id=$scope.formData.ID;
  console.log("getPassenger",getPassenger)
  $http.post(api_url+"getpassengers",getPassenger, {
    headers: { 'Content-Type': 'application/JSON; charset=UTF-8'}
  }).success(function(responseData) {
    console.log(responseData)
    $scope.passengerForm=responseData.result;
    var arr=[];
    for (var i = 0; i < $scope.passengerForm.length; i++) {
      $scope.totalAmount+=$scope.passengerForm[i].amount;
      arr=$scope.passengerForm[i].arrival.split('T');
      $scope.passengerForm[i].arrival=arr[0];
      arr=[];
      arr=$scope.passengerForm[i].departure.split('T');
      $scope.passengerForm[i].departure=arr[0];
      arr=[];

    };
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
     }).error(function(status){
       $scope.isLoading=false;

     })
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
        if($scope.passengerForm[i].special_needs==undefined){
          $scope.passengerForm[i].special_needs='CW';}else{
           $scope.passengerForm[i].special_needs='CB,CW';
         }
         delete $scope.passengerForm[i].d1;
       }if($scope.passengerForm[i].special_needs==undefined || $scope.passengerForm[i].special_needs==false){
         $scope.passengerForm[i].special_needs='NO';}
         $http.post(api_url+"addpassenger", $scope.passengerForm[i], {
          headers: { 'Content-Type': 'application/JSON; charset=UTF-8'}
        }).success(function(responseData) {
          $scope.isLoading=false;
        }).error(function(status){
          console.log(status);
          $scope.isLoading=false;


        });
      };
      getPassengerDetails();
    }

    $scope.NextView=function(){
      $scope.isLoading=true;
      $scope.checkEmail();
      getPassengerDetails();
      $state.go('form.interests');
    }

    $scope.cancel=function(){
      console.log($scope.formData.ID);
      if($scope.formData.ID!=undefined){
        $scope.disableForm=true;
      }else{
        $state.go($state.current, {}, {reload: true});
        
      }
    }


    
       var confirmPaymentBYPG=function(payments){
        var payment={}
        $scope.isLoading=true;
        payment.transaction_ref=$scope.payment_request_confirm_id[0];
        payment.payment_confirmed=1;
        payment.payment_request_id=$scope.payment_request_id[2]
        var confirmPayment={   
          "ID":scope.formData.ID,
          "payment_confirm":payment
        }
        $http.post(api_url+"confirmpayment", confirmPayment, {
          headers: { 'Content-Type': 'application/JSON; charset=UTF-8'}
        }).success(function(responseData) {
          console.log(JSON.stringify(responseData));

          $scope.isLoading=false;
        }).error(function(status){
          console.log(status);
          $scope.isLoading=false;
        }); 
      }




      var makePayment=function(event){
        $scope.isLoading=true;
        var paymentRequestInfo={};
         if($scope.formData.amount!=undefined){
         $scope.PaymentDetals.amount=$scope.formData.amount;
        }else{
             $scope.PaymentDetals.amount=$scope.totalAmount;
           }
         console.log($scope.PaymentDetals.amount);
         $scope.PaymentDetals.payment_confirmed=0;
        $scope.PaymentDetals.amount=$scope.totalAmount;
        
       if(event=='Make'){
       paymentRequestInfo={
      'amount': 10,
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
     var Payment={ "ID":$scope.formData.ID,
        "payment_info":$scope.PaymentDetals,
        "paymentRequestInfo":paymentRequestInfo}
    }else{
      var Payment={ "ID":$scope.formData.ID,
        "payment_info":$scope.PaymentDetals,
        "paymentRequestInfo":paymentRequestInfo}
    }    
       console.log("payment",Payment)
        $http.post(api_url+"submitpayment", Payment, {
          headers: { 'Content-Type': 'application/JSON; charset=UTF-8'}
        }).success(function(responseData) {
          console.log(responseData);
          if(event=='Make'){
            window.open(responseData.paymentResult.payment_request.longurl, '_self', 'location=no');
          }else{
           $scope.checkEmail();
           $state.go('form.profile');
         }
        }).error(function(status){
          console.log(status);
          $scope.isLoading=false;
        }); 
      }

      $scope.submitPayment=function(event){
        $scope.isLoading=true;
        if(event=='Make'){
         $scope.PaymentDetals.bank_name='InstaMojo'
         $scope.PaymentDetals.transaction_ref='PENDING';
         makePayment(event);
         //paymentRequest();
       }if(event=='Submit'){
         makePayment();

       }

     }
     var sendConfirmRequest=function(){
       console.log(document.URL);
       $scope.payment_request_id=[];
       $scope.payment_request_confirm_id=[];
       $scope.payment_request_id=document.URL.split('=');
       console.log($scope.payment_request_id[2]);
       $scope.payment_request_confirm_id=$scope.payment_request_id[1].split('&');
       console.log($scope.payment_request_confirm_id[0]);
       confirmPaymentBYPG();
     }
     var init=function(){
      var index=(document.URL.indexOf('payment_id')>-1);
      if(index){
        sendConfirmRequest();
      }
    }
    init();

  });