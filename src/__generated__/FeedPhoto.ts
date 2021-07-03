/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedPhoto
// ====================================================

export interface FeedPhoto_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface FeedPhoto {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  user: FeedPhoto_user;
  caption: string | null;
  createdAt: string;
  isMine: boolean;
}
