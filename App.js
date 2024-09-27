import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';

const APP_ID = '3cc6edec8ae842a49014e3562adc141c'; // Replace with your Agora App ID
const CHANNEL_NAME = 'AgoraTestCall'; // Change this to your preferred channel
const TEMP_TOKEN =
  '007eJxTYIhVXehzc9IqmagZf8v+CMREy7G4/bv2MNdDXjVa4cWfsAoFBuPkZLPUlNRki8RUCxOjRBNLA0OTVGNTM6PElGRDE8Pko/Hf0hoCGRl+pO1mYmSAQBCfl8ExPb8oMSS1uMQ5MSeHgQEAi2gjtw=='; // Replace with your Agora temp token if required

const connectionData = {
  appId: APP_ID,
  channel: CHANNEL_NAME,
  token: TEMP_TOKEN, // You can skip this if not using a token
};

const App = () => {
  const [videoCall, setVideoCall] = useState(false);

  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };
  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
    width: '100%',
  },
});

export default App;
