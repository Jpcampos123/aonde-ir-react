
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next'


import { parseCookies } from 'nookies'


export  function canSSRGuest<P>(fn: GetServerSideProps) {

    return async (ctx: GetServerSidePropsContext) =>{

        const cookies = parseCookies(ctx);

        if(cookies['@nextauth.token']){


            return {

                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
        return await fn(ctx);

     }
}