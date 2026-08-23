export type View = 'auth' | 'dash'

export type ActivityStatus = 'reply' | 'open' | 'click' | 'sent'

export interface ActivityItem {
  mail: string
  subject: string
  status: ActivityStatus
}
