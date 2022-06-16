'use client';

import Link from "next/link";
import { notFound } from "next/navigation";

export default function Tools() {
    notFound()
    return (
        <Link href='/discord/userinfo' > USER INFO</Link>
    )
}
