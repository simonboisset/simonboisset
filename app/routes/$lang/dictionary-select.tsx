import { useLocation, useNavigate } from "@remix-run/react";
import { Language } from "~/domains/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select";

export const DictionarySelect = ({ value }: { value: Language }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onSelect = (locale: Language) => {
    const newPathname = location.pathname
      .split("/")
      .map((part) => {
        if (part === value) return locale;
        return part;
      })
      .join("/");

    navigate(newPathname);
  };

  return (
    <Select value={value} onValueChange={onSelect}>
      <SelectTrigger className="w-16 h-10">
        <SelectValue>
          {localeOptions.find((locale) => locale.value === value)?.flag}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {localeOptions.map((locale) => (
          <SelectItem key={locale.value} value={locale.value}>
            <span className="hidden sm:inline">{locale.label}</span>
            <span className="sm:hidden">{locale.flag}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const localeOptions: { value: Language; label: string; flag: string }[] = [
  { value: "en", label: "🇺🇸 English", flag: "🇺🇸" },
  { value: "fr", label: "🇫🇷 Français", flag: "🇫🇷" },
];
