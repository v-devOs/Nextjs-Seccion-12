import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwt } from "./utils";

export async function middleware( req: NextRequest, ev: NextFetchEvent ){
  
  const previousPage = req.nextUrl.pathname

  if (previousPage.startsWith("/checkout")) {
    const token = req.cookies.get("token")?.value || ''


    // if (!token) {
    //   return NextResponse.redirect(
    //     new URL(`/auth/login?p=${previousPage}`, req.url)
    //   );
    // }

    return NextResponse.next();


    try {
      console.log('Entre aqui')
      const resp = await jwt.isValidToken(token)

      console.log(resp + 'hola')
      return NextResponse.next();


    } catch (error) {


      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      );
    }
  }
}
 
export const config = {
  matcher: ["/checkout/:path*"],
};