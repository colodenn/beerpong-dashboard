import { supabase } from '@/utils/client';

export function getSeasonData(id: string) {
  return id != '0'
    ? supabase.from('seasons').select('*').eq('id', id).single()
    : null;
}
