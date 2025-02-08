type attachType = {
  icon?: string;
  file?: string;
  fileSize?: string;
};

export type MessageType = {
  createdAt?: any;
  timestamp?: any;
  msg?: string;
  prompts?: string[];
  content?: string;
  senderId: number | string;
  type: string;
  attachment: attachType[];
  id: string;
};

export interface ChatsType {
  id: number | string;
  name?: string;
  status?: string;
  thumb?: string;
  recent?: boolean;
  excerpt?: string;
  chatHistory?: any[];
  isNewChat?: boolean;
  messages?: MessageType[];
  latestMessage?: string;
  msg?: string
  createdAt?: any;
  type?: string
}
