import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from 'next/headers';
import { envVar } from './utils/envVar';

const sellerRoutes = ["/medicines", "/seller-dashboard"];
const customerRoutes = ["/dashboard"];
const adminRoutes = ["/admin-dashboard"]

export async function proxy(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    console.log("proxy.ts",pathname )

    const condition = sellerRoutes.includes(pathname) || customerRoutes.includes(pathname) || adminRoutes.includes(pathname)
    if(condition) {
        if(!token || token?.value == "") {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        let decoded;

        try {
            decoded = jwt.verify(token?.value as string, envVar.jwt_secret as string) as JwtPayload;
        } catch(error) {
            console.log(error);
            // return;
            const res = NextResponse.redirect(new URL('/login', request.url));
            res.cookies.delete("token");
            return res;
        }
        
        // dashboard redirect 
        console.log(decoded)
        if(pathname == "/dashboard") {
            console.log(decoded?.role === "SELLER")
            if (decoded?.role === "ADMIN") return NextResponse.redirect(new URL('/admin-dashboard', request.url))
            if (decoded?.role === "SELLER") return NextResponse.redirect(new URL('/seller-dashboard', request.url))
            if (decoded?.role === "CUSTOMER") return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        
        const unAuthorizedCondition = (sellerRoutes.includes(pathname) && decoded?.role !== "SELLER")
                                    || (customerRoutes.includes(pathname) && decoded?.role !== "CUSTOMER")
                                    || (adminRoutes.includes(pathname) && decoded?.role !== "ADMIN");
        console.log(unAuthorizedCondition);
        if(unAuthorizedCondition) {
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }

        
    }

    return NextResponse.next();
}
 