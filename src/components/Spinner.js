import React from 'react'
import loding from './Loading.gif';

export default function Spinner() {
  return (
    <div className='text-center mt-6'>
        <img src={loding} alt="loding" />
    </div>
  )
}
