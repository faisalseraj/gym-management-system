import { HTMLInputTypeAttribute } from "react"

export const SelectField = ({icon, state, name, label, options, ...rest}:any) =>  {
    return <>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
            {label}
          </label>
          <div className="relative">
            <select
              id={name}
              name={name}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby={`${name}-error`}

            >
              <option value="" disabled>
                Select a blood group
              </option>
              {options.map((option: {id:string, value:string, label:string}) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {
              icon
            }
          </div>
          <div id={`${name}-error`} aria-live="polite" aria-atomic="true">
            {state.errors?.[name] &&
              state.errors?.[name].map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
     </>
}