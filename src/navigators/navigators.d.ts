import { seeRooms_seeRooms_users } from '../__generated__/seeRooms'

export type NavParamList = {
  Welcome: undefined
  LogIn: { username?: string; password?: string } | undefined
  CreateAccount: undefined
  Feed: undefined
  Search: undefined
  Notifications: undefined
  Me: undefined
  Camera: undefined
  Photo: { photoId: number }
  Profile: { username: string; id: number }
  Likes: { photoId: string }
  Comments: undefined
  Tabs: undefined
  Upload: undefined
  Select: undefined
  TakePhoto: undefined
  UploadForm: { file: string }
  Rooms: undefined
  Room: { id: number; talkingTo: seeRooms_seeRooms_users }
  Messages: undefined
}
