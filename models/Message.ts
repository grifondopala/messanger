export interface Message{
    ID: number,
    CreatedAt: string,
    DeletedAt: string,
    UpdatedAt: string,
    sender_id: number,
    text: string,
    chat_id: number,
}