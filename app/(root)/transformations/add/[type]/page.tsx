import Header from '@/components/shared/Header'
import { redirect } from 'next/navigation';
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm';
import { auth } from '@clerk/nextjs';
import { getUserById } from '@/lib/actions/user.actions';
import {users} from '@/constants/data.js';


const AddTransformationTypePage = (
  {params: {type}}: SearchParamProps
) => {
  
  const transformation = transformationTypes[type];

  

  const randomIndex = Math.floor(Math.random() * users.length);
  const user = users[randomIndex];
  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
      <section className="mt-10">
        <TransformationForm 
          action='Add'
          userId={user.email}
          type={transformation.type as 
          TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
      
    </>
    
  )
}

export default AddTransformationTypePage