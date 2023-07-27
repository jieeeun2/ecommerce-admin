import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST (
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()  
    const body = await req.json()
    
    const { name, billboardId } = body

    if(!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    } //Unauthenticated: 사용자가 로그인하지 않았다

    if(!name) {
      return new NextResponse("Name is required", { status: 400 })
    }
    if(!billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 })
    }
    if(!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    /* userId가 해당 params.storeId를 가지고있는지 확인 */
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if(!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    } //Unauthorized: 사용자 로그인 되어있지만 변경하려고하는 내용을 변경할 권한이 없다

    const category = await prismadb.category.create({
      data: {
        name, 
        billboardId,
        storeId: params.storeId
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORIES_POST]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}


export async function GET (
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if(!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const category = await prismadb.category.findMany({
      where: {
        storeId: params.storeId
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORIES_GET]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}