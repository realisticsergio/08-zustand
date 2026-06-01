import axios from 'axios';
import type { Note, NoteFormValues } from '../types/note';

interface NOTEHUBResponse {
  notes: Note[];
  totalPages: number;
}

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    accept: 'application/json',
  },
});

export const fetchNotes = async (query: string, page: number, tag?: string) => {
  const { data } = await instance.get<NOTEHUBResponse>('/notes', {
    params: {
      search: query,
      page,
      ...(tag && { tag }),
    },
  });
  return data;
};

export const createNote = async (newPost: NoteFormValues): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', newPost);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};
