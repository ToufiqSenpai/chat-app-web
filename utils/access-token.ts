interface Token {
    accessToken: string
    tokenType: string
    expiresIn: number
    status: number
    message: string
}

async function accessToken(callback?: (token: Token) => void): Promise<Token> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/access-token', {
        method: 'GET',
        credentials: 'include'
    }).then(async response => response.json())
    .then(response => response)

    callback && callback(response)

    return response
}

export default accessToken