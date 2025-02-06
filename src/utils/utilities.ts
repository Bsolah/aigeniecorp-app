import { ObjectId } from 'bson';
import moment from 'moment';
type Message = {
  sender: string;
  receiver: string;
  msg: string;
  createdAt: string;
  type: string;
  name: string;
  id: string | null;
  status: string;
};

type User = {
  email: string;
  id: string;
  messages: Message;
  name: string;
  role: string;
  status: string;
};
export type MessageData = {
  status: string;
  name: string;
  email: string;
  role: string;
  id: string | null;
  messages: Message;
};

export type GroupedMessagesType = {
  receiver: string;
  latestMessage: Message;
  conversations: MessageData[];
};
export function getLatestMessageObject(users: User[]): User | null {
  return users.reduce((latestUser: User | null, user: User) => {
    if (
      !latestUser ||
      new Date(user.messages.createdAt) > new Date(latestUser.messages.createdAt)
    ) {
      return user;
    }
    return latestUser;
  }, null);
}

export const generateBsonId = (): string => {
  return new ObjectId().toHexString();
};

export const groupMessagesByReceiver = (data: MessageData[]): GroupedMessagesType[] => {
  const grouped = data.reduce<Record<string, GroupedMessagesType>>((acc, item) => {
    const { messages, id, email, name, role, status } = item;
    console.log(item, 'item');
    const receiver = messages.receiver;

    if (!acc[receiver]) {
      acc[receiver] = {
        receiver,
        latestMessage: messages,
        conversations: [],
      };
    }

    if (new Date(messages.createdAt) > new Date(acc[receiver].latestMessage.createdAt)) {
      acc[receiver].latestMessage = { ...messages, id, name, status };
    }

    acc[receiver].conversations.push(item);
    return acc;
  }, {});

  return Object.values(grouped);
};

type GroupedChats = {
  today: MessageData[];
  yesterday: MessageData[];
  lastWeek: MessageData[];
  older: MessageData[];
};

export const groupChatsByDate = (chats: MessageData[]) => {
  const today: MessageData[] = [];
  const yesterday: MessageData[] = [];
  const lastWeek: MessageData[] = [];
  const older: MessageData[] = [];

  const todayStart = moment().startOf('day');
  const yesterdayStart = moment().subtract(1, 'days').startOf('day');
  const lastWeekStart = moment().subtract(7, 'days').startOf('day');

  chats.forEach((chat) => {
    const chatDate = moment(chat.messages.createdAt);
    if (chatDate.isSame(todayStart, 'day')) {
      today.push(chat);
    } else if (chatDate.isSame(yesterdayStart, 'day')) {
      yesterday.push(chat);
    } else if (chatDate.isAfter(lastWeekStart)) {
      lastWeek.push(chat);
    } else {
      older.push(chat);
    }
  });
  var d = { today: today, yesterday: yesterday, lastWeek: lastWeek, older: older };
  console.log(d.today, 'ghj');
  return d;
};
