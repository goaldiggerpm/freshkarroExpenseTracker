import { LoginForm } from '@/components/custom/loginForm';
import createClient from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const { data: users } = await supabase.from("users").select();
  const { data: expenses } = await supabase.from("expenses").select();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <pre className='mt-40'  >{JSON.stringify(users, null, 2)}</pre>
      <pre className='mt-40'  >{JSON.stringify(expenses, null, 2)}</pre>
      <LoginForm />
    </div>
  );
}
