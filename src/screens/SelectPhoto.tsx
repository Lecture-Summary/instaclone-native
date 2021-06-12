import React from 'react'
import * as MediaLibrary from 'expo-media-library'
import styled from 'styled-components/native'
import { useEffect } from 'react'
import { useState } from 'react'

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

const SelectPhoto = () => {
  const [ok, setOk] = useState(false)
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([])

  const getPhotos = async () => {
    if (ok) {
      const { assets: photos } = await MediaLibrary.getAssetsAsync()
      setPhotos(photos)
    }
  }

  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync()
    if (accessPrivileges === 'none' && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync()
      if (accessPrivileges !== 'none') {
        setOk(true)
      }
    } else if (accessPrivileges !== 'none') {
      setOk(true)
    }
  }

  useEffect(() => {
    getPermissions()
    getPhotos()
  }, [])

  return (
    <Container>
      <Top></Top>
      <Bottom></Bottom>
    </Container>
  )
}

export default SelectPhoto
