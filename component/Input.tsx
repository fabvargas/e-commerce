import { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} 
  className='bg-foreground-card py-2 px-4 rounded-lg outline-0' 
  />;
}
