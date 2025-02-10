type attachType = {
  icon?: string;
  file?: string;
  fileSize?: string;
};

export type MessageType = {
  createdAt?: any;
  chatRoomId?: string;
  msg?: string;
  prompts?: string[];
  content?: string;
  senderId: number | string;
  type: string;
  userId?: string;
  attachment: attachType[];
  id: string;
};

export interface ChatsType {
  id: number | string;
  name: string;
  excerpt: string;
  status: string;
  thumb: string;
  chatRoomId?: string;
  recent?: boolean;
  userId?: string;
  chatHistory?: any[];
  messages: MessageType[];
}
