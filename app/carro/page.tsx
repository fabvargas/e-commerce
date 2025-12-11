import Carro from '@/component/Carro'
import FormEnvio from '@/component/FormEnvio'
import React from 'react'

export default function page() {
    
  return (
    <div className='w-full  flex lg:flex-row flex-col gap-6 p-4 md:p-10'>
    
    <Carro/>
    <FormEnvio></FormEnvio>
    </div>

  )
}
