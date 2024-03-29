'use client';
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { aspectRatioOptions, transformationTypes } from '@/constants';
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
import { useState } from 'react';
import { AspectRatioKey, debounce } from '@/lib/utils';

export const formSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string()
  })

const TransformationForm = ({action, data,  type,  config=null}: TransformationFormProps) => {

    const transformationType = transformationTypes[type];

    const [image, setImage] = useState(data);
    const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);  
    const [isTransforming, setIsTransforming] = useState(false);
    const [transformationConfig, setTransformationConfig] = useState(config);
   
    //Valores iniciales por sí ya hay un registro y se va a editatr
    const initialValues = data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        //publicId: data?.publicId,
    } : defaultValues;

    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if(action === 'Update') {
      const newImageToUpload = {
        ...data,
        _id: data._id,
      }
      console.log('newImageToUpload', newImageToUpload)
  }
}

  const onSelectFieldHandler = (value: string,
    onChandeField: (value: string) => void) => {
      const imageSize = aspectRatioOptions[value as AspectRatioKey];
      setImage((prevState: any) => ({
        ...prevState,
        aspectRatio: imageSize.aspectRatio,
        width: imageSize.width,
        height: imageSize.height
        })
      );
      setNewTransformation(transformationType.config);

      return onChandeField(value);
    
  }
  const onInputChangeHandler = (fieldName: string, value: string, type: string,
    onChandeField: (value: string) => void) => {
      debounce(() => {
        setNewTransformation((prevState: any) => ({
          ...prevState,
          [type]: {
            ...prevState?.[type],
            [fieldName === 'prompt' ? 'prompt' : fieldName]: value
          }
          })
        );
        return onChandeField(value);
      }, 1000);
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
                    <Select 
                      onValueChange={(value) =>
                        onSelectFieldHandler(value, field.onChange)
                      }
                      {...field} >
                        <SelectTrigger className='select-field'>
                            <SelectValue
                              placeholder="Select size"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(aspectRatioOptions).map((key) => (
                                <SelectItem key={key} value={key}
                                  className='select-item'
                                >
                                    {aspectRatioOptions[key as AspectRatioKey].label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
        )}

        {(type === "remove" || type === "recolor") && (
            <div className="prompt-field">
                <CustomField
                    control={form.control}
                    name='prompt'
                    formLabel={
                      type === "remove" ? "Remove " : "Recolor "
                    }
                    className='w-full'
                    render={({field}) => (
                        <Input {...field}
                          value={field.value}
                            className='input-field'
                            onChange={(e) => onInputChangeHandler(
                              'prompt',
                              e.target.value,
                              type,
                              field.onChange
                            )}
                        />
                    )}
                />
                {type === "recolor" && (
                    <CustomField
                        control={form.control}
                        name='color'
                        formLabel='Replacement Color'
                        className='w-full'
                        render={({field}) => (
                            <Input {...field}
                                className='input-field'
                                onChange={(e) => onInputChangeHandler(
                                  'color',
                                  e.target.value,
                                  'recolor',
                                  field.onChange
                                )}
                            />
                        )}
                    />
                )}
            </div>
        )}
        <div className="flex flex-col gap-4">
        <Button
         type='submit'
         className='submit-button capitalize'
         disabled={isTransforming || newTransformation === null}
        >
          {isTransforming ? 'Transforming...' : 'Apply Transformation'}
        </Button>
        <Button
         type='submit'
         className='submit-button capitalize'
         disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Save Image'}
        </Button>
        </div>
        
      </form>
    </Form>
  )
}

export default TransformationForm