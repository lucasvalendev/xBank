import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"

const destinationCountries = [
  "Estados Unidos",
  "Portugal",
  "Espanha",
  "Brasil",
]

type CountrySelectProps = {
  id?: string
  value: string
  onValueChange: (value: string) => void
  "aria-label"?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
}

export function CountrySelect({
  id,
  value,
  onValueChange,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: CountrySelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        id={id}
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
      >
        <SelectValue placeholder="Selecione o país" />
      </SelectTrigger>
      <SelectContent>
        {destinationCountries.map((country) => (
          <SelectItem key={country} value={country}>
            {country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
