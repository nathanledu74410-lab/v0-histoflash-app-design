import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse, type NextRequest } from "next/server"

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY

// Sans clés Clerk, le site tourne en mode dégradé : pas d'authentification.
export default clerkEnabled ? clerkMiddleware() : (_req: NextRequest) => NextResponse.next()

export const config = {
  matcher: [
    // Toutes les pages sauf les fichiers statiques et internes de Next.js.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|txt|xml)).*)",
    "/(api|trpc)(.*)",
  ],
}
