export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          start_time: string
          end_time: string
          priority: number
          status: 'pending' | 'finished'
          actual_completion_time: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          start_time: string
          end_time: string
          priority: number
          status: 'pending' | 'finished'
          actual_completion_time?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          start_time?: string
          end_time?: string
          priority?: number
          status?: 'pending' | 'finished'
          actual_completion_time?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}