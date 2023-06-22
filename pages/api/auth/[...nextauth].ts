
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { IUser } from "@/interfaces"

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

        return { name: 'Uriel', role: 'admin', email: 'uriel@google.com', id: ''}
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),


  ],

  jwt: {

  },

  

  // Callbacks

  callbacks: {
    async jwt({token, user, account}){
      // console.log({ token, user, account }, 'Impresion del callback jwt')

      if( account ){

        token.accessToken = account.access_token

        switch( account.type ){

          case 'oauth':
            // TODO: crear usuario o verificar si existe en base de datos
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

