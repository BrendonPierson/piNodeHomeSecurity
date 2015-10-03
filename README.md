# piNodeHomeSecurity
A home automation system built on raspberryPi's, [nodejs](https://nodejs.org/en/), [angularjs](https://angularjs.org/), and [firebase](https://www.firebase.com/).

##Basic Concept
The backend of this system uses RaspberryPis to collect sensor data such as door openings and tempurature readings.  The sensor data is read and sent to a firebase database using nodejs.
The firebase data is then piped into a secure website and updated instantly thanks to angularjs. You could have as many raspberryPi nodes as needed, I currently have two. 

##Installation
####Install Nodejs on raspberryPi(s)
This works as of 10/3/2015.  Please open an issue if this breaks with the next node release.

*Instructions are based on [nodeRed](http://nodered.org/docs/hardware/raspberrypi.html), make note you don't need the other python libraries installed in their directions*

1.```sudo apt-get -y update && sudo apt-get -y upgrade``` This will take a while if you haven't run these commands in a while or ever

RaspberryPi 2

2.        ```curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -```
3.        ```sudo apt-get install -y nodejs```

RaspberryPi B+ or A+

2.        ```wget http://node-arm.herokuapp.com/node_archive_armhf.deb```
3.        ```sudo dpkg -i node_archive_armhf.deb```

If it worked, ```node -v``` will result in the node version, something like ```v0.12.6```.

Clone this repository and install the dependencies
4.        ```git clone --depth 1 https://github.com/BrendonPierson/piNodeHomeSecurity.git```
5.        ```cd piNodeHomeSecurity/```
6.        ```npm install```

