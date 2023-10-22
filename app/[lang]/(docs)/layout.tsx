import { cn } from '@/ui/utils';

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'prose mx-auto prose-p:text-justify prose-a:underline prose-a:font-bold',
        'prose-img:rounded-lg prose-img:shadow-lg prose-img:object-cover prose-img:p-0',
        'prose-headings:text-primary prose-p:text-primary prose-code:text-primary',
        'prose-li:text-primary prose-a:text-primary prose-li:marker:text-primary',
        'w-full max-w-screen-lg mx-auto mt-32 px-12',
      )}>
      {children}
    </div>
  );
}
