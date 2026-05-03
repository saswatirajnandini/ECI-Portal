import { Request, Response } from 'express';
import { supabase } from '../services/supabase.service';

export const getNews = async (req: Request, res: Response) => {
  const { category, page = 1, limit = 10 } = req.query;
  const from = (Number(page) - 1) * Number(limit);
  const to = from + Number(limit) - 1;

  try {
    let query = supabase.from('news').select('*', { count: 'exact' });
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error, count } = await query
      .order('published_at', { ascending: false })
      .range(from, to);
    
    if (error) throw error;
    
    res.status(200).json({
      data,
      count,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil((count || 0) / Number(limit))
    });
  } catch (error) {
    console.error('Supabase Error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

export const getNewsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Supabase Error:', error);
    res.status(500).json({ error: 'Failed to fetch news item' });
  }
};
