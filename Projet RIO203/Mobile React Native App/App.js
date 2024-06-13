import React, { useState, useEffect } from 'react';
import { View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

const CameraScreen = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = React.useRef(null);

  const startCapturingImages = async () => {
    const intervalId = setInterval(async () => {
      captureImage();
    }, 5000);
    return () => clearInterval(intervalId);
  };

  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
      sendImage(photo.uri);
    }
  };

  const sendImage = async (imageUri) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try{
      //effectuer requete get pour tester la connexion
      console.log('Tentative de connexion au serveur...');
      const response = await axios.get('http://137.194.147.151:3000/');
      setData(response.data);
      console.log('Connexion au serveur réussie:', response.data);
    }
    catch(error){
      console.error('Erreur lors de la connexion au serveur:', error);
    }
    try {
      const response = await axios.post('http://137.194.147.151:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image envoyée avec succès:', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'image:', error);
    }
  };


  useEffect(() => {
    startCapturingImages();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
      />
      {capturedImage && (
        <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
          <Image source={{ uri: capturedImage }} style={{ width: 100, height: 100 }} />
        </View>
      )}
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Button title="Arrêter la capture" onPress={() => clearInterval(intervalId)} />
      </View>
    </View>
  );
};

export default CameraScreen;
