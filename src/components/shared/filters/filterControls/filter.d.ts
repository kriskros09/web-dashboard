export type FilterType = {
  label: string
  light?: boolean
  content?: any

  getFilterData:
    | ((e: React.MouseEvent<HTMLButtonElement>) => void)
    | ((e: React.FormEvent<HTMLFormElement>) => void)
  resetFilter: (e: React.MouseEvent<HTMLButtonElement>) => void
}
