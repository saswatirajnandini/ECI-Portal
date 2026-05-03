import { createClient } from '@supabase/supabase-js';
import { config } from '../config';
import logger from './logger.service';

if (!config.supabase.url || !config.supabase.anonKey) {
  logger.error('Supabase credentials missing in configuration');
}

export const supabase = createClient(config.supabase.url, config.supabase.anonKey);
