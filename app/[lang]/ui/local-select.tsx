'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '../dictionaries';

export const LocalSelect = ({ value }: { value: Locale }) => {
  const router = useRouter();
  const patname = usePathname();
  const onSelect = (locale: Locale) => {
    const newPathname = patname
      .split('/')
      .map((part) => {
        if (part === value) return locale;
        return part;
      })
      .join('/');
    router.push(newPathname);
  };

  return (
    <Select value={value} onValueChange={onSelect}>
      <SelectTrigger className='sm:w-[120px] w-12'>
        <SelectValue placeholder='' />
      </SelectTrigger>
      <SelectContent>
        {localeOptions.map((locale) => (
          <SelectItem key={locale.value} value={locale.value}>
            <span className='hidden sm:inline'>{locale.label}</span>
            <span className='sm:hidden'>{locale.flag}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const localeOptions: { value: Locale; label: string; flag: string }[] = [
  { value: 'en', label: '🇺🇸 English', flag: '🇺🇸' },
  { value: 'fr', label: '🇫🇷 Français', flag: '🇫🇷' },
];
