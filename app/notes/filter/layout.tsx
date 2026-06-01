import { ReactNode } from 'react';
import css from './layout.module.css';

interface FilterLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
}

export default function FilterLayout({ sidebar, content }: FilterLayoutProps) {
  return (
    <div className={css.filterContainer}>
      <aside className={css.sidebarSlot}>{sidebar}</aside>
      <main className={css.contentSlot}>{content}</main>
    </div>
  );
}
