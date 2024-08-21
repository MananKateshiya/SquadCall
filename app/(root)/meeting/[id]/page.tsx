import React from 'react'


interface Params {
    params: {
        id: number
    }
}

function Meeting({ params }: Params) {
    return (
        <div>Meeting Room: #{params.id}</div>

    )
}

export default Meeting