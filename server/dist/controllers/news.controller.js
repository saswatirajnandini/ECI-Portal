"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewsById = exports.getNews = void 0;
const supabase_service_1 = require("../services/supabase.service");
const getNews = async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;
    const from = (Number(page) - 1) * Number(limit);
    const to = from + Number(limit) - 1;
    try {
        let query = supabase_service_1.supabase.from('news').select('*', { count: 'exact' });
        if (category) {
            query = query.eq('category', category);
        }
        const { data, error, count } = await query
            .order('published_at', { ascending: false })
            .range(from, to);
        if (error)
            throw error;
        res.status(200).json({
            data,
            count,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil((count || 0) / Number(limit))
        });
    }
    catch (error) {
        console.error('Supabase Error:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
};
exports.getNews = getNews;
const getNewsById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase_service_1.supabase
            .from('news')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw error;
        res.status(200).json(data);
    }
    catch (error) {
        console.error('Supabase Error:', error);
        res.status(500).json({ error: 'Failed to fetch news item' });
    }
};
exports.getNewsById = getNewsById;
