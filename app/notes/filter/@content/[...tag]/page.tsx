import NotesClient from '@/app/notes/Notes.client';
import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface Props {
  params: Promise<{ tag: string[] }>;
}

export default async function FilteredNotesPage({ params }: Props) {
  const { tag } = await params;
  const currentTag = tag[0];
  const apiTag = currentTag === 'all' ? '' : currentTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, apiTag],
    queryFn: () => fetchNotes('', 1, apiTag || undefined),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={apiTag} isFilterPage />
    </HydrationBoundary>
  );
}
