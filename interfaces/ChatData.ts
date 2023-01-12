import { MessageData } from "./MessageData"
import { UserMetadata } from "./UserMetadata"

export interface ChatData {
  chatId: string
  friendMetadata: UserMetadata
  messageData: MessageData[]
}