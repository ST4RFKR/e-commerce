'use client';

import { usePathname, useRouter } from '@/app/i18n/navigation';
import { routing } from '@/app/i18n/routing';
import { useParams } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../../ui/select';
import { FlagIcon } from '../../icons/flag-icon/flag-icon';

const languageNames: Record<string, string> = {
    it: 'IT',
    uk: 'UA',
    en: 'EN',
};

export function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    const currentLocale = params.locale as string;

    const handleLanguageChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="flex items-center gap-2 ">
            <Select value={currentLocale} onValueChange={handleLanguageChange}>
                <SelectTrigger className='border-primary h-10' aria-label="Select language">
                    <SelectValue placeholder="Select language">
                        <span className="flex items-center gap-2">
                            <FlagIcon locale={currentLocale} />
                            {languageNames[currentLocale]}
                        </span>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {routing.locales.map((locale) => (
                        <SelectItem key={locale} value={locale}>
                            <span className="flex items-center gap-2">
                                <FlagIcon locale={locale} />
                                {languageNames[locale]}
                            </span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
