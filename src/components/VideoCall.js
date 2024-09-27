import React, {useState} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';

const APP_ID = '3cc6edec8ae842a49014e3562adc141c'; // Replace with your Agora App ID
const CHANNEL_NAME = 'AgoraTestCall'; // Change this to your preferred channel
const TEMP_TOKEN =
  '007eJxTYIhVXehzc9IqmagZf8v+CMREy7G4/bv2MNdDXjVa4cWfsAoFBuPkZLPUlNRki8RUCxOjRBNLA0OTVGNTM6PElGRDE8Pko/Hf0hoCGRl+pO1mYmSAQBCfl8ExPb8oMSS1uMQ5MSeHgQEAi2gjtw=='; // Replace with your Agora temp token if required

const VideoCall = () => {
  const [videoCall, setVideoCall] = useState(true);

  const connectionData = {
    appId: APP_ID,
    channel: CHANNEL_NAME,
    token: TEMP_TOKEN, // You can skip this if not using a token
  };

  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };

  return (
    <>
      {videoCall ? (
        <AgoraUIKit
          connectionData={connectionData}
          rtcCallbacks={rtcCallbacks}
        />
      ) : (
        <Button title="Start Call" onPress={() => setVideoCall(true)} />
      )}
      <Button title="End Call" onPress={() => rtcCallbacks?.EndCall()} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoCall;
