import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { FlatList, ListRenderItem, TouchableOpacity } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import styled from 'styled-components/native'
import { useEffect } from 'react'
import { useState } from 'react'
import { Image } from 'react-native'
import { useWindowDimensions } from 'react-native'

const Container = styled.View`
  flex: 1;
  background-color: black;
`

const Top = styled.View`
  flex: 1;
  background-color: black;
`

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`

const ImageContainer = styled.TouchableOpacity``
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`

const SelectPhoto = () => {
  const numColumns = 4
  const [ok, setOk] = useState(false)
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([])
  const [chosenPhoto, setChosenPhoto] = useState('')
  const { width } = useWindowDimensions()

  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync()
    setPhotos(photos)
    setChosenPhoto(photos[0]?.uri)
  }

  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync()
    if (accessPrivileges === 'none' && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync()
      if (accessPrivileges !== 'none') {
        setOk(true)
        getPhotos()
      }
    } else if (accessPrivileges !== 'none') {
      setOk(true)
      getPhotos()
    }
  }

  useEffect(() => {
    getPermissions()
  }, [])

  const choosePhoto = (uri: string) => {
    setChosenPhoto(uri)
  }

  const renderItem: ListRenderItem<MediaLibrary.Asset> = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons name='checkmark-circle' size={18} color='white' />
      </IconContainer>
    </ImageContainer>
  )

  return (
    <Container>
      <Top>
        {chosenPhoto !== '' ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: '100%' }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  )
}

export default SelectPhoto
