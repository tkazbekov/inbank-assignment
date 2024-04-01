export interface ApplicationData {
  firstName: string
  lastName: string
  mobile: string
  email: string
  income: number
  amount: number
  period: number
}

export interface LoanData extends ApplicationData {
  monthly: number
}
