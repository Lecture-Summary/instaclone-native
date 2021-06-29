import React, { VFC, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Image,
  StatusBar,
  useWindowDimensions,
} from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavParamList } from '../navigators/navigators'

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

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`

type SelectPhotoScreenNavigationProp = StackNavigationProp<
  NavParamList,
  'Select'
>

interface IProps {
  navigation: SelectPhotoScreenNavigationProp
}

const SelectPhoto: VFC<IProps> = ({ navigation }) => {
  const numColumns = 4
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
        getPhotos()
      }
    } else if (accessPrivileges !== 'none') {
      getPhotos()
    }
  }

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('UploadForm', { file: chosenPhoto })}
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  )
  useEffect(() => {
    getPermissions()
  }, [])
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    })
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
        <Ionicons
          name='checkmark-circle'
          size={18}
          color={photo.uri === chosenPhoto ? colors.blue : 'white'}
        />
      </IconContainer>
    </ImageContainer>
  )

  return (
    <Container>
      <StatusBar hidden={false} />
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
