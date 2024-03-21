'use client';
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { transformationTypes } from '@/constants';
import {
    Form,
  } from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Input } from "@/components/ui/input"
import { defaultValues } from '@/constants';
import { CustomField } from './CustomField';

export const formSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string()
  })

const TransformationForm = ({action, data = null, userId, type, creditBalance}: TransformationFormProps) => {

    const transformationType = transformationTypes[type];
   
    //Valores iniciales por sí ya hay un registro y se va a editatr
    const initialValues = data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
    } : defaultValues;

    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField 
            control={form.control}
            name='title'
            formLabel='ImageTitle'
            className='w-full'
            render={({field}) => (
                <Input {...field} 
                    className='input-field'
                />
            )}
        />
        {type === "fill" && (
            <CustomField
                control={form.control}
                name='aspectRatio'
                formLabel='Aspect Ratio'
                className='w-full'
                render={({field}) => (
                    <Select {...field} className='input-field'>
                        <SelectTrigger>
                            <SelectValue>{field.value || "Select an aspect ratio"}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1:1">1:1</SelectItem>
                            <SelectItem value="4:3">4:3</SelectItem>
                            <SelectItem value="16:9">16:9</SelectItem>
                            <SelectItem value="20:1">20:1</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />
        )}
      </form>
    </Form>
  )
}

export default TransformationForm