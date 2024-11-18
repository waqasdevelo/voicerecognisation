import React, {useRef} from 'react';
import {View, Button, StyleSheet, Alert, PixelRatio} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import ImageResizer from '@bam.tech/react-native-image-resizer';

const App = () => {
  const viewRef = useRef(null);

  const takeScreenshot = async () => {
    if (!viewRef.current) {
      console.error('View reference is null!');
      return;
    }

    try {
      const uri = await captureRef(viewRef, {
        format: 'jpg',
        quality: 1,
        width: 1080,
        height: 1080,
        scale: 1,
      });

      // Resize the captured image to 1080 x 1080
      const resizedImage = await ImageResizer.createResizedImage(
        uri,
        1080,
        1080,
        'JPEG',
        100, // Quality (0-100)
      );

      console.log('Resized image URI:', resizedImage.uri);

      // Define the download path
      const fileName = `screenshot_${Date.now()}.jpg`;
      const downloadPath =
        Platform.OS === 'android'
          ? `${RNFS.DownloadDirectoryPath}/${fileName}` // Android Downloads folder
          : `${RNFS.CachesDirectoryPath}/${fileName}`; // iOS Documents folder

      try {
        // Save the file to Downloads/Documents folder
        await RNFS.copyFile(resizedImage.uri, downloadPath);
        Alert.alert('Success', `Screenshot saved to ${downloadPath}`);
        console.log('Screenshot saved to:', downloadPath);
      } catch (error) {
        console.error('Error saving file:', error);
        Alert.alert('Error', 'Failed to save the screenshot.');
      }
    } catch (error) {
      console.error('Failed to take screenshot:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View ref={viewRef} style={styles.captureArea}>
        <View style={styles.box} />
      </View>
      <Button title="Take Screenshot" onPress={takeScreenshot} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureArea: {
    width: 300,
    height: 300,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default App;
