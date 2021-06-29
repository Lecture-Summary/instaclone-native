import { Camera } from 'expo-camera'
import React, { VFC } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { TouchableOpacity, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import Slider from '@react-native-community/slider'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavParamList } from '../navigators/navigators'
import { useRef } from 'react'

const Container = styled.View`
  flex: 1;
  background-color: black;
`

const Actions = styled.View`
  flex: 0.35;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
`

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`

const SliderContainer = styled.View``
const ActionsContainer = styled.View`
  flex-direction: row;
`

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`

type TakePhotoNavProp = StackNavigationProp<NavParamList, 'TakePhoto'>

interface IProps {
  navigation: TakePhotoNavProp
}

const TakePhoto: VFC<IProps> = ({ navigation }) => {
  const camera = useRef<Camera>(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [ok, setOk] = useState(false)
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)
  const [zoom, setZoom] = useState(0)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync()
    setOk(granted)
  }

  useEffect(() => {
    getPermissions()
  }, [])

  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back)
    } else {
      setCameraType(Camera.Constants.Type.front)
    }
  }

  const onZoomValueChange = (e: number) => {
    setZoom(e)
  }

  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on)
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto)
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off)
    }
  }

  const onCameraReady = () => setCameraReady(true)

  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const photo = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      })
      console.log(photo)
    }
  }

  return (
    <Container>
      <StatusBar hidden={true} />
      <Camera
        type={cameraType}
        style={{ flex: 1 }}
        zoom={zoom}
        ref={camera}
        onCameraReady={onCameraReady}
      >
        <CloseButton onPress={() => navigation.navigate('Tabs')}>
          <Ionicons name='close' color='white' size={30} />
        </CloseButton>
      </Camera>
      <Actions>
        <SliderContainer>
          <Slider
            style={{ width: 200, height: 20 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor='#FFFFFF'
            maximumTrackTintColor='rgba(255, 255, 255, 0.5)'
            onValueChange={onZoomValueChange}
          />
        </SliderContainer>
        <ButtonsContainer>
          <TakePhotoBtn onPress={takePhoto} />
          <ActionsContainer>
            <TouchableOpacity
              onPress={onFlashChange}
              style={{ marginRight: 30 }}
            >
              <Ionicons
                size={30}
                color='white'
                // @ts-ignore
                name={
                  flashMode === Camera.Constants.FlashMode.off
                    ? 'flash-off'
                    : flashMode === Camera.Constants.FlashMode.on
                    ? 'flash'
                    : flashMode === Camera.Constants.FlashMode.auto
                    ? 'eye'
                    : ''
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onCameraSwitch}>
              <Ionicons
                size={30}
                color='white'
                name={
                  cameraType === Camera.Constants.Type.front
                    ? 'camera-reverse'
                    : 'camera'
                }
              />
            </TouchableOpacity>
          </ActionsContainer>
        </ButtonsContainer>
      </Actions>
    </Container>
  )
}

export default TakePhoto
