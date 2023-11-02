export type PersonalType = {
  name: string
  email: string
  phoneNumber: string
}

export type Plan = {
  name: string
  monthly: number
  yearly: number
  iconName: string
  isMonthlyPeriod?: boolean
}

export type addon = {
  title: string
  description: string
  price: number
}

export type Form = {
  personalInfo: PersonalType
  plan: Plan
  addons: addon[]
}
