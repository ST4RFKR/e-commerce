import { redirect } from "@/app/i18n/navigation";
import { ProfilePage } from "@/features/profile";
import { getUserSession } from "@/shared/lib/get-user-session";
import { getLocale } from "next-intl/server";

export default async function ProfileHomePage() {

    const user = await getUserSession();
    const locale = await getLocale();

    if (!user) {
        return redirect({
            href: '/not-auth',
            locale
        });
    }
    return (
        <ProfilePage />
    );
}
