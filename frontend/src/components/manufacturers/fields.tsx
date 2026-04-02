import type { Manufacturer } from '#/interfaces/interfaces'
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function ManufacturerFields({
  m,
  isEnabled,
}: {
  m: Manufacturer
  isEnabled: boolean
}) {
  return (
    <div className="container mx-auto py-2">
      <FieldSet>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            disabled={isEnabled ? false : true}
            id="name"
            autoComplete="off"
            placeholder={m.manufacturerName}
          />
          <FieldDescription>The name of the manufacturer.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="url">URL</FieldLabel>
          <Input
            disabled={isEnabled ? false : true}
            id="url"
            autoComplete="off"
            placeholder={m.manufacturerUrl}
          />
          <FieldDescription>Their main retail website.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="aliases">Aliases</FieldLabel>
          <Input
            disabled={isEnabled ? false : true}
            id="aliases"
            autoComplete="off"
            placeholder={m.aliases}
          />
          <FieldDescription>
            Any other names for this manufacturer.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Input
            disabled={isEnabled ? false : true}
            id="description"
            autoComplete="off"
            placeholder={m.description}
          />
          <FieldDescription>A short description.</FieldDescription>
        </Field>
      </FieldSet>
    </div>
  )
}
