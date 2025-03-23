"use client"

import * as React from "react"
import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Calendar} from "./calendar"
import {FieldError} from "react-hook-form";

type Props = {
  onChangeAction: (date: string) => void,
  date: string,
  error?: FieldError | undefined
}

export function DatePicker({
                             onChangeAction,
                             date,
                             error
                           }: Props) {
  const [open, setOpen] = React.useState(false);

  return (<>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            type="button"
            className={
              cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground",
                error && "border-red-600"
              )}
          >
            <CalendarIcon className="mr-2 h-4 w-4"/>
            {date ? format(new Date(date), "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            captionLayout="dropdown-buttons"
            selected={date ? new Date(date) : undefined}
            onSelect={(newDate) => {
              if (newDate) {
                onChangeAction(newDate.toISOString());
              }
              setOpen(false);
            }}
            fromYear={1900}
            toYear={new Date().getFullYear()}
          />
        </PopoverContent>
      </Popover>
      {error && <p className='text-red-600 text-xs'>{error.message}</p>}
    </>

  )
}
