import { supabase } from '@/utils/client';

export function getSeasonData(id: string) {
  return supabase.from('seasons').select('*').eq('id', id).single();
}
