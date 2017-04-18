'use strict';
var os = require('os');


function getLocalIPs() {

    var addrInfo, ifaceDetails, _len;
    var localIPInfo = {};
    //Get the network interfaces
    var networkInterfaces = require('os').networkInterfaces();
    //Iterate over the network interfaces
    for (var ifaceName in networkInterfaces) {
        ifaceDetails = networkInterfaces[ifaceName];
        //Iterate over all interface details
        for (var _i = 0, _len = ifaceDetails.length; _i < _len; _i++) {
            addrInfo = ifaceDetails[_i];
            if (addrInfo.family === 'IPv4') {
                //Extract the IPv4 address
                if (!localIPInfo[ifaceName]) {
                    localIPInfo[ifaceName] = {};
                }
                localIPInfo[ifaceName].IPv4 = addrInfo.address;
            } else if (addrInfo.family === 'IPv6') {
                //Extract the IPv6 address
                if (!localIPInfo[ifaceName]) {
                    localIPInfo[ifaceName] = {};
                }
                localIPInfo[ifaceName].IPv6 = addrInfo.address;
            }
        }
    }
    return localIPInfo;
  };

module.exports.getLocalIPs = getLocalIPs;

exports.bye = function(args, res, next) {
  /**
   * Returns a good-bye
   *
   * returns GoodbyeResponse
   **/
  var examples = {};

  examples['application/json'] = {
  "date" : Date(),
  "message" : "Aloha",
  "IP"      : os.hostname(),
  "Network" : os.networkInterfaces()
};

  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.health = function(args, res, next) {
  /**
   * Returns health check status to the caller
   *
   * returns HealthResponse
   **/
  var health = {};
  health['application/json'] = {
  "statusString" : "Ok"
};
  if (Object.keys(health).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(health[Object.keys(health)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}


exports.hello = function(args, res, next) {


  /**
   * Returns greetings to the caller
   *
   * returns HelloWorldResponse
   **/
  var myHello = {};

  myHello['application/json'] = {
  "IPAddr"    : getLocalIPs(),
  "Hostname"  : os.hostname(),
  "Environment"   : process.env
  };

  if (Object.keys(myHello).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(myHello[Object.keys(myHello)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

