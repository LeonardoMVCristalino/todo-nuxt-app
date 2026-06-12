export type Todo = {
  id: number
  title: string
  description: string
  is_completed: boolean
  created_at: string
  updated_at: string
}
export type Colors = 'success' | 'error' | 'primary' | 'secondary' | 'info' | 'warning' | 'neutral' | undefined
