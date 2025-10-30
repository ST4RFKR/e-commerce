'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui"
import { UserPen } from "lucide-react"
import { ProfileFormPersonalData } from "../profile-form-personal-data"
import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl"


export function PersonalData() {

    const session = useSession()
    const t = useTranslations("ProfilePage")
    const image = session.data?.user?.image
    const name = session.data?.user?.name

    return (
        <div className="flex flex-col gap-2 p-2">

            <div>
                <h2 className="text-2xl font-bold">{t("title")}</h2>
                <p className="text-muted-foreground">{t("description")}</p>
            </div>


            <Accordion type="single" defaultValue="item-1" collapsible className="border rounded-2xl">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2 px-2">
                            <UserPen />
                            <span> {t("accordion.personalData")}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-2 flex flex-col gap-2">
                        <Avatar className="w-24 h-24" >
                            <AvatarImage src={image} />
                            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <ProfileFormPersonalData />

                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/** TODO: Accordion for order history */}
        </div>
    )
}
