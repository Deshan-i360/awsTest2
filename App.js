import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, Touchable, TouchableOpacity, View} from 'react-native';
// import awsIot from 'aws-iot-device-sdk';
import {IoTClient, SigV4Signer} from 'aws-crt';
import IotDevice from 'aws-iot-device-sdk';
import awsConfig from './awsConfig';

const App = () => {
  // useEffect(() => {
  //   const connectToAwsIoT = async () => {
  //     const device = awsIot.device({
  //       keyPath: "path/to/private.pem.key",
  //       certPath: "path/to/certificate.pem.crt",
  //       caPath: "path/to/AmazonRootCA1.pem",
  //       clientId: awsConfig.clientId,
  //       host: awsConfig.endpoint,
  //     });

  //     try {
  //       await new Promise((resolve, reject) => {
  //         device.on('connect', () => {
  //           console.log('Connected to AWS IoT');
  //           device.subscribe('topic');
  //           device.publish('topic2', JSON.stringify({ test_data: 1 }));
  //           resolve();
  //         });

  //         device.on('message', (topic, payload) => {
  //           console.log('Message received', topic, payload.toString());
  //         });

  //         device.on('error', (error) => {
  //           console.error('Error', error);
  //           reject(error);
  //         });
  //       });
  //     } catch (error) {
  //       console.error('Failed to connect to AWS IoT', error);
  //     }
  //   };

  //   connectToAwsIoT();
  // }, []);

  const [x,setx] = useState('')

  const connectToAwsIoT = async () => {
    const device = new IotDevice({
      clientId: awsConfig.clientId,
      hostName: awsConfig.endpoint,
      // protocols: ['mqtts'],
      privateKey: 'C:/Users/desha/Desktop/MyIoTApp/awsTest/private.pem.key',
      clientCert: 'C:/Users/desha/Desktop/MyIoTApp/awsTest/certificate.pem.crt',
      caCert: 'C:/Users/desha/Desktop/MyIoTApp/awsTest/AmazonRootCA1.pem',
    });

    setx(device)
   
    // Subscribe to a topic
    device.subscribe('message');

    // Publish a message
    device.publish('message', JSON.stringify({ test_data: 1 }));

    device.on('connect', () => {
      console.log('Connected to AWS IoT');
    });

    device.on('message', (topic, payload) => {
      console.log(`Received message on topic ${topic}: ${payload.toString()}`);
    });

    device.on('error', (error) => {
      console.error('Error', error);
      // Handle errors here, you may want to show an alert or take other actions
    });
  };

  useEffect(()=>{

    

    connectToAwsIoT();
  },[])
 
  const handle = ()=>{
    connectToAwsIoT();
    console.log(x);
  }

  return (
    <SafeAreaView>
      <View>
        <Text>aws IoT</Text>
      </View>
      <TouchableOpacity onPress={handle}>
        <Text>touch</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
