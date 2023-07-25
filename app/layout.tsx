import {NavigationBarComponent} from "@/components/navigation-bar/navigation-bar.component";
import {Providers} from "@/app/providers";

export const metadata = {
    title: 'GBH - Techradar',
    description: 'Techradar',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head />
            <body>
                <Providers>
                    <NavigationBarComponent/>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
