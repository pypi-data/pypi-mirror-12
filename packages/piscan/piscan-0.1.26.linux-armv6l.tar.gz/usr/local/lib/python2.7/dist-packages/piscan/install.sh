#!/bin/bash
echo "Check /tmp/piscansetup.log"
echo "*** Starting Setup ***" >> /tmp/piscansetup.log

echo "*** Installing Required Components ***" >> /tmp/piscansetup.log
echo "*** APT-GET Update ***" >> /tmp/piscansetup.log
sudo apt-get update
echo "*** Installing LAME ***" >> /tmp/piscansetup.log
sudo apt-get -qq -y install lame
echo "*** Installing RABBITMQ ***" >> /tmp/piscansetup.log
sudo apt-get -qq -y install rabbitmq-server
echo "*** Installing SOX ***" >> /tmp/piscansetup.log
sudo apt-get -qq -y install sox
echo "*** Installing PIKA ***" >> /tmp/piscansetup.log
sudo apt-get -qq -y install python-pika
echo "*** Installing BOTO ***" >> /tmp/piscansetup.log
sudo apt-get -qq -y install python-boto
echo "*** Installing PIP ***" >> /tmp/piscansetup.log
sudo apt-get -qq -y install python-pip
echo "*** Installing FLASK ***" >> /tmp/piscansetup.log
sudo pip install flask
echo "*** Installing PISCAN ***" >> /tmp/piscansetup.log
sudo pip install piscan

echo "*** Creating Config Directory ***" >> /tmp/piscansetup.log
sudo mkdir /etc/piscan

# Create seqnum file
# Create piscan.ini file
# Run a ls /dev/tty* to check for the serial port

# should we Chmod 755 and +x em now?

#/usr/local/lib/python2.7/dist-packages/piscan (/piscan?)

echo "*** Setting up INIT.D ***" >> /tmp/piscansetup.log
sudo cp /usr/local/lib/python2.7/dist-packages/piscan/piqueue.sh /etc/init.d/piqueue.sh
sudo cp /usr/local/lib/python2.7/dist-packages/piscan/pirec.sh /etc/init.d/pirec.sh
sudo chmod 755 /usr/local/lib/python2.7/dist-packages/piscan/pirec.py
sudo chmod 755 /usr/local/lib/python2.7/dist-packages/piscan/piqueue.py
sudo chmod 755 /etc/init.d/piqueue.sh
sudo chmod 755 /etc/init.d/pirec.sh

sudo update-rc.d pirec.sh defaults
sudo update-rc.d piqueue.sh defaults

echo "*** Installation completed ***" >> /tmp/piscansetup.log
