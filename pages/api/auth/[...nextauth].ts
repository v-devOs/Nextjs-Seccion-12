
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "@/database"

export default NextAuth({
  
  // Configure one or more authentication providers
  providers: [
    
    // ...add more providers here

    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo', type: 'email', placeholder: 'correo@google.com'},
        password: { label: 'Contraseña', type: 'password', placeholder: 'contaseña' }
      },
      async authorize( credentials ){
        
        console.log({credentials})

        // TODO: VALIDAR CONTRA BASE DE DATOS
        // return { name: 'Uriel', role: 'admin', email: 'uriel@google.com', id: ''}

        return await dbUsers.checkUserEmailPassowrd( credentials!.email, credentials!.password)
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  // Custom pages

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  // Callbacks
  jwt: {

  },

  session: {
    maxAge: 2592000, // Cada mes
    strategy: 'jwt',
    updateAge: 86400 // Cada dia
  },


  callbacks: {
    async jwt({token, user, account}){
      // console.log({ token, user, account }, 'Impresion del callback jwt')

      if( account ){

        token.accessToken = account.access_token

        switch( account.type ){

          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser( user?.email || '' , user?.name || '')
            break;
          case 'credentials':
            token.user = user
            break;
        }
      }

      return token
    },

    async session({ session, token, user }: any){

      session.accessToken = token.accessToken
      session.user = token.user as any

      return session
    }
  },
})

