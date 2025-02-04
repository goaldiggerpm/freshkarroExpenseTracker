import { LoginForm } from '@/components/custom/loginForm';
// import createClient from '@/utils/supabase/server';

export default async function Home() {

  return (
    <div className="grid grid-rows-[0.6fr_1fr] items-center justify-items-center gap-0 h-[100vh] w-full p-8 m-auto font-[family-name:var(--font-geist-sans)]">
      <div className="h-[20%] text-2xl">
        <span className='block text-5xl' >Expense Tracker</span>
        <div className='flex flex-row justify-end w-full' >
          <span className='text-1xl' >by</span>
          <span className='text-green-500 ml-1' >FreshKarro</span>
        </div>
      </div>
      <div className='flex flex-row justify-items-start items-start h-full' >
        <LoginForm />
      </div>
    </div>
  );
}
