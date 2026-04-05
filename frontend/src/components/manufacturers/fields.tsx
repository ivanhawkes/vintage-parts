import type { Manufacturer } from '#/api/interfaces'
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { FieldInfo } from './field-info.tsx'
import { cn } from '#/lib/utils'

export function ManufacturerFields({
  m,
  isDisabled: isDisabled,
}: {
  m: Manufacturer
  isDisabled: boolean
}) {
  return (
    <div className="container mx-auto py-2">




      {/* <FieldSet>
        <Field>
          <FieldLabel htmlFor="name">
            Name: <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            disabled={isDisabled}
            id="name"
            autoComplete="off"
            defaultValue={ m.manufacturerName }
            required
          />
          <FieldDescription>The name of the manufacturer.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="url">URL:</FieldLabel>
          <Input
            disabled={isDisabled}
            id="url"
            autoComplete="off"
            defaultValue={m.manufacturerUrl}
          />
          <FieldDescription>Their main retail website.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="aliases">Aliases:</FieldLabel>
          <Input
            disabled={isDisabled}
            id="aliases"
            autoComplete="off"
            defaultValue={m.aliases}
          />
          <FieldDescription>
            Any other names for this manufacturer.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="description">Description:</FieldLabel>
          <Input
            disabled={isDisabled}
            id="description"
            autoComplete="off"
            defaultValue={m.description}
          />
          <FieldDescription>A short description.</FieldDescription>
        </Field>
      </FieldSet> */}
    </div>
  )
}
