import { userService } from "@/entities/user/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const data = await req.json();
        await userService.updateUserInfo(Number(id), data);

        return NextResponse.json(
            { message: "User updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("[USER_PATCH] Error", error);

        if (error instanceof Error) {
            if (error.message === "USER_NOT_FOUND") {
                return NextResponse.json(
                    { error: "User not found" },
                    { status: 404 }
                );
            }
        }

        return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 }
        );
    }
}
