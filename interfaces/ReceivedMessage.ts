import { MessageData } from "./MessageData"

export interface ReceivedMessage {
  chatId: string
  messageData: MessageData
}