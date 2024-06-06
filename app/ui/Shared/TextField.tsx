import { HTMLInputTypeAttribute } from "react"

export const TextField = ({icon, state, name, label, ...rest}:any) =>  {
    return <>
     <label htmlFor={name} className="mb-2 block text-sm font-medium">
            {label}
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id={name}
                name={name}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby={`${name}-error`}
                {...rest}
              />
              {icon}
            {/* //   <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
          <div id={`${name}-error`} aria-live="polite" aria-atomic="true">
            {state.errors?.[name] &&
              state?.errors?.[name].map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div></>
}