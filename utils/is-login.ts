export const isLogin = async (cookie?: string | undefined): Promise<boolean> => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/is-login', {
    headers: {
      "Authorization": 'Bearer ' + cookie
    }
  }).then(response => response.status == 200)
}