// 2016.07 Przemyslaw Rzeznik
function createCookie(name, value) {
  document.cookie = name + "=" + value + "; path=/";
}

function readCookie(name) {
  //console.log('console.log:', document.cookie);
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) {
      //console.log(c.substring(nameEQ.length,c.length));
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}

// http://www.darkcoding.net/credit-card-generator/
var visaPrefixList = new Array("4539", "4556", "4916", "4532", "4929", "40240071", "4485", "4716", "4");
var mastercardPrefixList = new Array("51", "52", "53", "54", "55");
var amexPrefixList = new Array("34", "37");
var discoverPrefixList = new Array("6011");
var dinersPrefixList = new Array("300", "301", "302", "303", "36", "38");
var enRoutePrefixList = new Array("2014", "2149");
var jcbPrefixList = new Array("35");
var voyagerPrefixList = new Array("8699");

function strrev(str) {
  if (!str) return '';
  var revstr = '';
  for (i = str.length - 1; i >= 0; i--) revstr += str.charAt(i)
  return revstr;
}

function completed_number(prefix, length) {
  var ccnumber = prefix;
  while (ccnumber.length < (length - 1)) {
    ccnumber += Math.floor(Math.random() * 10);
  }
  var reversedCCnumberString = strrev(ccnumber);
  var reversedCCnumber = new Array();
  for (var i = 0; i < reversedCCnumberString.length; i++) reversedCCnumber[i] = parseInt(reversedCCnumberString.charAt(i));
  var sum = 0;
  var pos = 0;
  while (pos < length - 1) {
    odd = reversedCCnumber[pos] * 2;
    if (odd > 9) odd -= 9;
    sum += odd;
    if (pos != (length - 2)) sum += reversedCCnumber[pos + 1];
    pos += 2;
  }
  var checkdigit = ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;
  ccnumber += checkdigit;
  return ccnumber;
}

function credit_card_number(prefixList, length, howMany) {
  var result = new Array();
  for (var i = 0; i < howMany; i++) {
    var randomArrayIndex = Math.floor(Math.random() * prefixList.length);
    var ccnumber = prefixList[randomArrayIndex];
    result.push(completed_number(ccnumber, length));
  }
  return result;
}

function onChangePhoneNumber() {
  createCookie('country_phone', document.getElementById("loginID").value);
}

function onChangePassword() {
  createCookie('cookie_password', document.getElementById("passwordID").value);
}


function switchOffForWhile() {
  var y = document.getElementsByTagName("BUTTON");
  for (var i = 0; i < y.length; i++) y[i].disabled = true;
  setTimeout(function() {
    for (var i = 0; i < y.length; i++) y[i].disabled = false;
  }, 500);
}


function Init(e) {
  var code2 = '  var script = document.createElement(\'script\'); \
    script.text += \'var pass = false;\'; \
    script.text += \'if (document.location.hostname == "localhost") pass = true;\'; \
    script.text += \'if (document.location.hostname == "payinttestweb2.virtavo.com") pass = true;\'; \
    script.text += \'if (document.location.hostname == "payinttestweb3.virtavo.com") pass = true;\'; \
    script.text += \'if (document.location.hostname == "secure.pay.com") pass = true;\'; \
    script.text += \'else {\'; \
    script.text += \'var elemDiv = document.createElement("div");\'; \
    script.text += \'elemDiv.style.cssText = "font-size:24px;padding:0px 5px 0px 5px; position:fixed;color:white; background:red;";\'; \
    script.text += \'elemDiv.innerHTML = "reload website with angular debug mode on...";\'; \
    script.text += \'window.document.body.insertBefore(elemDiv, window.document.body.firstChild);\'; \
    script.text += \'}\'; \
    script.text += \'if (pass == false) alert("this plugin works only on: DEV, PAYINTTESTWEB2, PAYINTTESTWEB3.VIRTAVO.COM ");\'; ';
  code2 += 'document.body.appendChild(script); ';
  chrome.tabs.executeScript(null, {
    code: code2
  });

  document.getElementById("Init").disabled = true;
  chrome.tabs.executeScript(null, {
    file: "js/angular.min.js"
  }, function() {
    chrome.tabs.executeScript(null, {
      code: "angular.reloadWithDebugInfo();"
    });
  });
}

function initssl(e) {
  //window.open('http://pr.www.net.local/pay.com_bridge/bridge.php?env=int&action=initssl','_blank');
  chrome.tabs.create({
    url: 'https://pr.www.net.local/pay.com_bridge/bridge.php?env=int&action=CONFIRM_CERTIFICATE_AS_TRUSTED_AND_GO_BACK_TO_WEBSITE'
  }, function(tab) {
    // Tab opened.
  });
}

function FillRegistrationFormStep1(submit_mode) {
  switchOffForWhile();
  var now = new Date();
  var month = now.getMonth();
  var day = now.getMonth();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  var country_phone = '+35386' + day + '' + hours + '' + minutes + '' + seconds;


  createCookie('country_phone', country_phone);
  document.getElementById("loginID").value = country_phone;
  var cookie_password = 'Testtest@1';
  createCookie('cookie_password', cookie_password);
  document.getElementById("passwordID").value = cookie_password;
  document.getElementById("loginID").style.background = "#FF9999";
  document.getElementById("passwordID").style.background = "#FF9999";
  setTimeout(function() {
    document.getElementById("loginID").style.background = "white";
    document.getElementById("passwordID").style.background = "white";
  }, 500);




  var cookie_password = readCookie('cookie_password');
  if (cookie_password === null) cookie_password = 'Testtest@1';
  createCookie('cookie_password', cookie_password);
  document.getElementById("passwordID").value = cookie_password;

  analitics();

  var code2 = '  var script = document.createElement(\'script\'); \
  script.text = \'q = angular.element(document.getElementsByClassName(\\\'registration-basic-step1\\\')).scope(); \'; \
  script.text += \'q.registrationBasicStep1.submit.data.phoneNo = "' + country_phone + '";\'; \
  script.text += \'q.registrationBasicStep1.submit.data.password =  "' + cookie_password + '";\'; \
  script.text += \'q.registrationBasicStep1.submit.data.confirmPassword =  "' + cookie_password + '";\'; \
  script.text += \'var randomnumber = Math.floor(Math.random() * (q.registrationBasicStep1.data.countries.length-2)) + 1; \'; \
  script.text += \'q.registrationBasicStep1.submit.data.country = q.registrationBasicStep1.data.countries[randomnumber];\'; \
  script.text += \'q.registrationBasicStep1.submit.data.tcAccepted = true;\'; \
  script.text += \'q.$apply();\'; ';
  if (submit_mode) {
    code2 += 'script.text += \'; q.registrationBasicStep1.preRegister(q.registrationBasicStep1.form); \'; ';
  }
  code2 += 'document.body.appendChild(script); ';
  chrome.tabs.executeScript(null, {
    code: code2
  });
}


function FillRegistrationFormStep2(submit_mode) {
  analitics();
  switchOffForWhile();
  phone_number = document.getElementById("loginID").value;
  if (phone_number[0] == '+') phone_number = '%2B' + phone_number.substring(1);
  var code2 = '  var script = document.createElement(\'script\'); \
  script.text += \'$.get( "' + myprotocol + '//pr.www.net.local/pay.com_bridge/bridge.php?env=' + env + '&phone_number=' + phone_number + '&action=getpin", function( data ) { \'; \
  script.text += \'if (data.status == -1) alert(data.message); \'; \
  script.text += \'q = angular.element(document.getElementsByClassName(\\\'registration-basic-step2\\\')).scope(); \'; \
  script.text += \'q.registrationBasicStep2.submit.data.pin = data.pin;\'; ';
  if (submit_mode) {
    code2 += 'script.text += \'; q.registrationBasicStep2.verifyPIN(); \'; ';
  }
  code2 += 'script.text += \'q.$apply();\'; \
  script.text += \'}, "json"); \'; \
  document.body.appendChild(script); ';
  chrome.tabs.executeScript(null, {
    code: code2
  });
  //window.close();
}


function FillRegistrationFormStep3(submit_mode) {

  switchOffForWhile();
  var code2 = '  var script = document.createElement(\'script\'); \
  script.text = \'q = angular.element(document.getElementsByClassName(\\\'registration-basic-step3\\\')).scope(); \'; \
  script.text += \'$.get( "' + myprotocol + '//alltic.home.pl/fake_names/bridge2.php", function( data ) { \'; \
  script.text += \'q.registrationBasicStep3.submit.data.question = q.registrationBasicStep3.data.questions[1]; \'; \
  script.text += \'q.registrationBasicStep3.submit.data.gender = { translation: "Male", value: "M"}; \'; \
  script.text += \'q.registrationBasicStep3.submit.data.currency = q.registrationBasicStep3.data.currencies.EUR; console.log(q.registrationBasicStep3.data.currencies); \'; \
  script.text += \'q.registrationBasicStep3.submit.data.answer = "Rzeznik"; \'; \
  script.text += \'q.registrationBasicStep3.submit.data.address.addressLine2 = "secondl"; \'; \
  script.text += \'q.registrationBasicStep3.submit.data.address.addressLine3 = ""; \'; \
  script.text += \'q.registrationBasicStep3.submit.data.address.city = data.city; \'; \
  script.text += \'q.registrationBasicStep3.submit.data.email = data.emailaddress; \'; \
  script.text += \'q.registrationBasicStep3.submit.data.address.addressLine1 = data.streetaddress; \'; \
  script.text += \'q.registrationBasicStep3.submit.data.birthDate = data.birthday; \'; \
  script.text += \'q.registrationBasicStep3.submit.data.firstName = data.givenname; \'; \
  script.text += \'q.registrationBasicStep3.submit.data.lastName = data.surname; \'; \
  script.text += \'console.log(data);q.registrationBasicStep3.submit.data.address.postCode = data.zipcode; \'; \
  script.text += \'q.registrationBasicStep3.submit.data.address.country.value = "pl";  \'; \
  script.text += \'q.registrationBasicStep3.submit.data.address.county = "pomorskie"; \'; \
  script.text += \'q.registrationBasicStep3.submit.data.address.country = {label: "Poland", value: "pl" , $$mdSelectId: 51}; \'; \
  script.text += \'q.$apply();\'; ';
  if (submit_mode) {
    code2 += 'script.text += \'; q.registrationBasicStep3.registerPersonalInfo(); \'; ';
  }
  code2 += 'script.text += \'}, "json");  \'; \
  script.text += \'q.$apply();\'; \
  document.body.appendChild(script); ';

  chrome.tabs.executeScript(null, {
    code: code2
  }); //window.close();

}


function FillCreditCardDetals(submit_mode) {
  switchOffForWhile();
  //var possible_cards = ['4000020951595032', '4000022756305864', '4000023104662535', '4000027701563111', '4000025906274039', '4000022105243287', '4000020213466162', '4000027343945304'];
  //var card = possible_cards[Math.floor(Math.random()*possible_cards.length)];
  var card = credit_card_number(visaPrefixList, 16, 1)[0];

  // make just picked card available to register (remove from database)
  // var xmlhttp=new XMLHttpRequest();
  // xmlhttp.open("GET", myprotocol+'//pr.www.net.local/pay.com_bridge/bridge.php?env='+env+'&action=removeCardFromDB&card_number='+card);
  // xmlhttp.onreadystatechange = function() {
  //     if (xmlhttp.readyState == XMLHttpRequest.DONE) {
  //         if(xmlhttp.status == 200) {
  //             var obj = JSON.parse(xmlhttp.responseText);
  //             if (obj.status == 1) {
  //               // alert('ok');
  //             }
  //             else {
  //               alert ('error during removing card '+card+' from database');
  //             }
  //         }else{
  //             alert('Error: ' + xmlhttp.statusText )
  //         }
  //     }
  // }
  // xmlhttp.send();

  analitics();

  var code2 = '  var script = document.createElement(\'script\'); \
  script.text = \'q = angular.element(document.getElementsByClassName(\\\'add-new-card\\\')).scope(); \'; \
  script.text += \'q.addNewCard.submit.data.cardholderName = "Przemyslaw Rzeznik";\'; \
  script.text += \'q.addNewCard.submit.data.pan =  "' + card + '";\'; \
  script.text += \'q.addNewCard.data.monthsSelected = q.addNewCard.data.months[3];\'; \
  script.text += \'q.addNewCard.data.yearsSelected = q.addNewCard.data.years[3];\'; \
  script.text += \'q.addNewCard.submit.data.cardNickname = "bonus";\'; \
  script.text += \'q.addNewCard.submit.data.cvv = 123;\'; \
  script.text += \'q.$apply(); \'; \ ';
  if (submit_mode) {
    code2 += 'script.text += \'; q.addNewCard.submit.data.cardType = { value : "VISA"}; \'; ';
    code2 += 'script.text += \'; q.addNewCard.saveCard(); \'; ';
  }
  code2 += 'document.body.appendChild(script); ';
  chrome.tabs.executeScript(null, {
    code: code2
  });
}


function analitics() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", myprotocol + "//alltic.home.pl/fake_names/" + env + ".php");
  xmlhttp.onreadystatechange = function() {}
  xmlhttp.send();
}


function FillCreditCardCompletePin(submit_mode) {
  switchOffForWhile();
  analitics();

  var code2 = '  var script = document.createElement(\'script\'); \
  script.text += \'q = angular.element(document.getElementsByClassName(\\\'card-owner\\\')).scope();\'; \
  script.text += \'var loadingCardId = q.completeCardOwnership.cardData.id;\'; \
  script.text += \'$.get( "' + myprotocol + '//pr.www.net.local/pay.com_bridge/bridge.php?env=' + env + '&loadingCardId="+loadingCardId+"&action=cardOvnershipVerification", function( data ) { \'; \
  script.text += \'if (data.status == -1) alert("problem with getting verification code!"); \'; \
  script.text += \'q.completeCardOwnership.submit.data.fourDigitCode = data.verificationCode;\'; \
  script.text += \'q.$apply(); \'; \ ';
  if (submit_mode) {
    code2 += 'script.text += \'; q.completeCardOwnership.verifyCard(); \'; ';
  }
  code2 += 'script.text += \'}, "json");  \'; \
  document.body.appendChild(script); ';
  console.log(code2);
  chrome.tabs.executeScript(null, {
    code: code2
  });

}


function FillLoginForm(submit_mode) {
  switchOffForWhile();
  var phone_number = document.getElementById("loginID").value;
  var password = document.getElementById("passwordID").value;

  var code2 = '  var script = document.createElement(\'script\'); \
  script.text = \'q = angular.element(document.getElementById("loginPage")).scope(); \'; \
  script.text += \'q.login.data.phone = "' + phone_number + '";\'; \
  script.text += \'q.login.data.password = "' + password + '";\'; \
  script.text += \'q.$apply();\'; \ ';
  if (submit_mode) {
    code2 += 'script.text += \'; q.login.submit(); \'; ';
  }
  code2 += ' \
  document.body.appendChild(script); ';

  chrome.tabs.executeScript(null, {
    code: code2
  });
  //window.close();
}

function Logout() {
  switchOffForWhile();

  chrome.tabs.executeScript(null, {
    file: "js/angular.min.js"
  }, function() {
    //chrome.tabs.executeScript(null, {file: "js/jquery-3.1.0.min.js"}, function() {
    //var code2 = "var injector = $(document.body).injector();var someService = injector.get('session');someService.logout();";
    var code2 = "var injector = angular.element(document.body).injector();var someService = injector.get('unVerifiedAccountNotification'); someService.showKycZeroAlert();";
    chrome.tabs.executeScript(null, {
      code: code2
    });
    //});
  });
}


function Get10usersKyc(kyc) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", myprotocol + '//pr.www.net.local/pay.com_bridge/bridge.php?env=' + env + '&action=get10users&kyc=' + kyc);
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status == 200) {
        var obj = JSON.parse(xmlhttp.responseText);
        if (obj.status == 1) {
          alert(kyc + ' users:' + "\n" + obj.msg + "\n\n Press ESC to exit");
        } else {
          alert('error during getting 10 users from database');
        }
      } else {
        alert('Error: ' + xmlhttp.statusText)
      }
    }
  }
  xmlhttp.send();
}

function getUserKyc(kyc, option_id) {
  switchOffForWhile();
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", myprotocol + '//pr.www.net.local/pay.com_bridge/bridge.php?env=' + env + '&action=get10users&kyc=' + kyc);
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status == 200) {
        var obj = JSON.parse(xmlhttp.responseText);
        if (obj.status == 1) {
          var res = obj.msg.split("\n");
          var e = document.getElementById(option_id);
          var index = e.options[e.selectedIndex - 1].value;


          var phone_number = res[index].replace(/[0-9]*\.\s/g, '').trim();
          createCookie('country_phone', phone_number);
          document.getElementById("loginID").value = phone_number;
          var cookie_password = 'Testtest@1';
          createCookie('cookie_password', cookie_password);
          document.getElementById("passwordID").value = cookie_password;
          document.getElementById("loginID").style.background = "#FF9999";
          document.getElementById("passwordID").style.background = "#FF9999";
          setTimeout(function() {
            document.getElementById("loginID").style.background = "white";
            document.getElementById("passwordID").style.background = "white";
          }, 500);


          var password = 'Testtest@1';
          var code2 = '  var script = document.createElement(\'script\'); \
                  script.text = \'q = angular.element(document.getElementById("loginPage")).scope(); \'; \
                  script.text += \'q.login.data.phone = "' + phone_number + '";\'; \
                  script.text += \'q.login.data.password = "' + password + '";\'; \
                  script.text += \'q.$apply();\'; \ ';
          console.log(code2);
          code2 += ' \
                  document.body.appendChild(script); ';

          chrome.tabs.executeScript(null, {
            code: code2
          });
        } else {
          alert('error during getting 10 users from database');
        }
      } else {
        alert('Error: ' + xmlhttp.statusText)
      }
    }
  }
  xmlhttp.send();


}

function AdditionalUserInformation(submit_mode) {
  switchOffForWhile();

  var code2 = ' var script = document.createElement(\'script\'); \
  script.text  = \'q = angular.element(document.getElementsByClassName("personal-details")).scope(); \'; \
  script.text += \'var randomnumber = Math.floor(Math.random() * (q.myProfile.data.advanceCustomerExtraDetails.placeOfBirth.length-1)) + 1; \'; \
  script.text += \'q.myProfile.submit.data.advanceCustomerExtraDetails.placeOfBirthSelected    = q.myProfile.data.advanceCustomerExtraDetails.placeOfBirth[randomnumber];\'; \
  script.text += \'randomnumber = Math.floor(Math.random() * (q.myProfile.data.advanceCustomerExtraDetails.occupationsList.length-1)) + 1; \'; \
  script.text += \'q.myProfile.submit.data.advanceCustomerExtraDetails.occupationsListSelected = q.myProfile.data.advanceCustomerExtraDetails.occupationsList[randomnumber];\'; \
  script.text += \'randomnumber = Math.floor(Math.random() * (q.myProfile.data.advanceCustomerExtraDetails.tax1CountryList.length-1)) + 1; \'; \
  script.text += \'q.myProfile.submit.data.advanceCustomerExtraDetails.taxCountryList1Selected = q.myProfile.data.advanceCustomerExtraDetails.tax1CountryList[randomnumber];\'; \
  script.text += \'randomnumber = Math.floor(Math.random() * (q.myProfile.data.advanceCustomerExtraDetails.tax1CountryList.length-1)) + 1; \'; \
  script.text += \'q.myProfile.submit.data.advanceCustomerExtraDetails.taxCountryList2Selected = q.myProfile.data.advanceCustomerExtraDetails.tax1CountryList[randomnumber];\'; \
  script.text += \'randomnumber = randomnumber = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000; \'; \
  script.text += \'q.myProfile.submit.data.advanceCustomerExtraDetails.taxIdNumber = randomnumber;\'; \
  script.text += \'q.$apply();\'; \ ';
  if (submit_mode) {
    code2 += 'script.text += \'; q.myProfile.savePersonalInfo(); \'; ';
  }
  code2 += ' \
  document.body.appendChild(script); ';

  chrome.tabs.executeScript(null, {
    code: code2
  });
  //window.close();
}




document.addEventListener('DOMContentLoaded', function() {

  // remember 'env' as global variable
  chrome.tabs.executeScript(null, {
    file: "js/angular.min.js"
  }, function() {
    chrome.tabs.executeScript(null, {
        code: "passData=document.location.hostname+','+document.location.protocol; passData"
      },
      function(passedData) {
        var aha = String(passedData).split(",");
        switch (aha[0]) {
          case "127.0.0.1":
            env = 'myapi';
            break;
          case "localhost":
            env = 'dev';
            break;
          case "payinttestweb2.virtavo.com":
            env = 'int';
            break;
          case "payinttestweb3.virtavo.com":
            env = 'int';
            break;
        }

        myprotocol = aha[1];
      });
  });

  var country_phone = readCookie('country_phone');
  document.getElementById("loginID").value = country_phone;
  var cookie_password = readCookie('cookie_password');
  document.getElementById("passwordID").value = cookie_password;
  document.getElementById('Init').addEventListener('click', Init);
  document.getElementById('initssl').addEventListener('click', function() {
    initssl(false)
  }, false);
  document.getElementById('loginID').addEventListener('change', onChangePhoneNumber);
  document.getElementById('passwordID').addEventListener('change', onChangePassword);
  document.getElementById('FillRegistrationFormStep1NoSubmit').addEventListener('click', function() {
    FillRegistrationFormStep1(false)
  }, false);
  document.getElementById('FillRegistrationFormStep1Submit').addEventListener('click', function() {
    FillRegistrationFormStep1(true)
  }, false);
  document.getElementById('FillRegistrationFormStep2NoSubmit').addEventListener('click', function() {
    FillRegistrationFormStep2(false)
  }, false);
  document.getElementById('FillRegistrationFormStep2Submit').addEventListener('click', function() {
    FillRegistrationFormStep2(true)
  }, false);
  document.getElementById('FillRegistrationFormStep3NoSubmit').addEventListener('click', function() {
    FillRegistrationFormStep3(false)
  }, false);
  document.getElementById('FillRegistrationFormStep3Submit').addEventListener('click', function() {
    FillRegistrationFormStep3(true)
  }, false);
  document.getElementById('FillCreditCardDetalsNoSubmit').addEventListener('click', function() {
    FillCreditCardDetals(false)
  }, false);
  document.getElementById('FillCreditCardDetalsSubmit').addEventListener('click', function() {
    FillCreditCardDetals(true)
  }, false);
  document.getElementById('FillCreditCardCompletePinNoSubmit').addEventListener('click', function() {
    FillCreditCardCompletePin(false)
  }, false);
  document.getElementById('FillCreditCardCompletePinSubmit').addEventListener('click', function() {
    FillCreditCardCompletePin(true)
  }, false);
  document.getElementById('AdditionalUserInformationNoSubmit').addEventListener('click', function() {
    AdditionalUserInformation(false)
  }, false);
  document.getElementById('AdditionalUserInformationSubmit').addEventListener('click', function() {
    AdditionalUserInformation(true)
  }, false);
  document.getElementById('FillLoginFormNoSubmit').addEventListener('click', function() {
    FillLoginForm(false)
  }, false);
  document.getElementById('FillLoginFormSubmit').addEventListener('click', function() {
    FillLoginForm(true)
  }, false);
  document.getElementById('Get10usersKyc0').addEventListener('click', function() {
    Get10usersKyc('kyc-0')
  }, false);
  document.getElementById('Get10usersKyc1').addEventListener('click', function() {
    Get10usersKyc('kyc-1')
  }, false);
  document.getElementById('Get10usersKyc2').addEventListener('click', function() {
    Get10usersKyc('kyc-2')
  }, false);
  document.getElementById('getUserKyc0').addEventListener('change', function() {
    getUserKyc('kyc-0', 'getUserKyc0')
  }, false);
  document.getElementById('getUserKyc1').addEventListener('change', function() {
    getUserKyc('kyc-1', 'getUserKyc1')
  }, false);
  document.getElementById('getUserKyc2').addEventListener('change', function() {
    getUserKyc('kyc-2', 'getUserKyc2')
  }, false);
  document.getElementById('Logout').addEventListener('click', function() {
    Logout()
  }, false);
  document.getElementById('CloseWindow').addEventListener('click', function() {
    window.close()
  }, false);
});