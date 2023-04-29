import Section from "#/components/Section";
import type { Metadata } from "next";

export default function Tools() {
    return (
        <>
            <Section title="Snowflake">
                {/* things around manipulating snowflakes (ie, get date) */}
                {/* maybe Distance Calculator */}
                TODO...
            </Section>

            <Section title="Discord Time">
                {/* things around manipulating discord time (ie, <t:11111>) */}
                TODO...
                {/* https://hammertime.cyou/ */}
            </Section>



        </>
    )
}


export const metadata: Metadata = {
    title: 'Snowflake',
    description: 'Tools around snowflakes [todo]',
}
