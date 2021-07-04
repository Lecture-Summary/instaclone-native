/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RoomParts
// ====================================================

export interface RoomParts_users {
  __typename: "User";
  avatar: string | null;
  username: string;
}

export interface RoomParts {
  __typename: "Room";
  id: number;
  unreadTotal: number;
  users: (RoomParts_users | null)[] | null;
}
