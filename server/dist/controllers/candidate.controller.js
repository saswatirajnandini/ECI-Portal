"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCandidateById = exports.getCandidates = void 0;
const supabase_service_1 = require("../services/supabase.service");
const getCandidates = async (req, res) => {
    const { constituency, party, state, page = 1, limit = 20, search } = req.query;
    const from = (Number(page) - 1) * Number(limit);
    const to = from + Number(limit) - 1;
    try {
        let query = supabase_service_1.supabase.from('candidates').select('*', { count: 'exact' });
        if (state) {
            query = query.eq('state', state);
        }
        if (constituency) {
            query = query.ilike('constituency', `%${constituency}%`);
        }
        if (party) {
            query = query.eq('party', party);
        }
        if (search) {
            query = query.or(`name.ilike.%${search}%,party.ilike.%${search}%,constituency.ilike.%${search}%`);
        }
        const { data, error, count } = await query
            .order('created_at', { ascending: false })
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
        res.status(500).json({ error: 'Failed to fetch candidates' });
    }
};
exports.getCandidates = getCandidates;
const getCandidateById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase_service_1.supabase
            .from('candidates')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw error;
        res.status(200).json(data);
    }
    catch (error) {
        console.error('Supabase Error:', error);
        res.status(500).json({ error: 'Failed to fetch candidate details' });
    }
};
exports.getCandidateById = getCandidateById;
