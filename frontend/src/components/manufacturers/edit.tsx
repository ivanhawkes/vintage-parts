import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getManufacturer, putManufacturer, manufacturerQK } from '#/api/rest'
import { ManufacturerFields } from './fields'
import { Button, buttonVariants } from '@/components/ui/button'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { defaultManufacturer } from '#/api/interfaces'
import { FieldInfo } from './field-info.tsx'
import { cn } from '#/lib/utils'

export function Edit({ id: manufacturerId }: { id: number }) {
  const queryClient = useQueryClient()

  // GET
  const { data, isPending, error } = useQuery({
    queryKey: manufacturerQK.detail(manufacturerId),
    queryFn: () => getManufacturer(manufacturerId),
  })

  // Use a mutation to handle the 'PUT' request.
  const mutation = useMutation({
    mutationFn: putManufacturer,
    mutationKey: manufacturerQK.detail(manufacturerId),

    onSuccess: () => {
      const navigate = useNavigate()
      navigate({
        to: '/admin/manufacturers',
      })
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: manufacturerQK.detail(manufacturerId),
      })
    },
  })

  const form = useForm({
    defaultValues: data,
    onSubmit: async ({ value }) => {
      mutation.mutateAsync(value)
    },
  })

  if (isPending) return <span>Loading...</span>
  if (error) return <span>An error has occurred.</span>

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >

        {/* <ManufacturerFields m={data} isDisabled={false}></ManufacturerFields> */}

        <div>
          <form.Field
            name="manufacturerName"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Manufacturer Name:</label>
                <input
                  className={cn(
                    'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
                  )}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        <div>
          <form.Field
            name="manufacturerUrl"
            children={(field) => (
              <>
                <label htmlFor={field.name}>URL:</label>
                <input
                  className={cn(
                    'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
                  )}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        <div>
          <form.Field
            name="aliases"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Aliases:</label>
                <input
                  className={cn(
                    'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
                  )}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        <div>
          <form.Field
            name="description"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Description:</label>
                <input
                  className={cn(
                    'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
                  )}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        {/* <ManufacturerFields m={data} isDisabled={false}></ManufacturerFields>
        <div className="container mx-auto py-2">
          <Link
            to="/admin/manufacturers"
            className={buttonVariants({ variant: 'outline' })}
            activeProps={{ className: 'nav-link is-active' }}
          >
            Cancel
          </Link>
          <Button variant="outline" onClick={() => handleSubmit()}>
            Save
          </Button>
        </div> */}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <>
              <button
                type="submit"
                disabled={!canSubmit}
                className={buttonVariants({ variant: 'outline' })}
              >
                {isSubmitting ? '...' : 'Submit'}
              </button>
              <button
                type="reset"
                className={buttonVariants({ variant: 'outline' })}
                onClick={(e) => {
                  // Avoid unexpected resets of form elements (especially <select> elements)
                  e.preventDefault()
                  form.reset()
                }}
              >
                Reset
              </button>
            </>
          )}
        />
      </form>
    </div>
  )
}
