import { redirect } from "@/app/i18n/navigation";
import { getUserSession } from "@/shared/lib/get-user-session";
import { getLocale } from "next-intl/server";

export default async function ProfilePage() {

    const user = await getUserSession();
    const locale = await getLocale();

    if (!user) {
        return redirect({
            href: '/not-auth',
            locale
        });
    }
    return (<div>{user.id}
        < div />
    </div>);
}
