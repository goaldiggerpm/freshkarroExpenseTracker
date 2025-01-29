import { ProfileForm } from '@/components/custom/form';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const { data: users } = await supabase.from("users").select();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <pre className='mt-40'  >{JSON.stringify(users, null, 2)}</pre>
      <ProfileForm />
    </div>
  );
}
