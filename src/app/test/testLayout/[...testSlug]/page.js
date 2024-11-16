import React from 'react'

export default async function TestSlug({params}) {
    const slug = (await params).testSlug
    return (
        <div>
            <div>
                1. {slug[0]}
            </div>
            <div>
                2. {slug[1]}
            </div>
        </div>
    )
}
