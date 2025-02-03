import { LoginForm } from '@/components/custom/loginForm';
// import createClient from '@/utils/supabase/server';

export default async function Home() {
  // const supabase = await createClient();
  // const { data: users } = await supabase.from("users").select();
  // const { data: expenses } = await supabase.from("expenses").select();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-[100vh] w-full p-8 m-auto font-[family-name:var(--font-geist-sans)]">
      <div className="h-[10%]">FreshKarro Expense Tracker</div>
      {/* <pre className='mt-40'  >{JSON.stringify(users, null, 2)}</pre>
      <pre className='mt-40'  >{JSON.stringify(expenses, null, 2)}</pre> */}
      <LoginForm />
    </div>
  );
}
