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
    
    const { 
      name,
      categoryId,
      price,
      isFeatured,
      isArchived,
      sizeId,
      colorId,
      images 
    } = body

    if(!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    } //Unauthenticated: 사용자가 로그인하지 않았다

    if(!name) {
      return new NextResponse("Name is required", { status: 400 })
    }
    if(!categoryId) {
      return new NextResponse("Category id is required", { status: 400 })
    }
    if(!price) {
      return new NextResponse("Price is required", { status: 400 })
    }
    if(!sizeId) {
      return new NextResponse("Size id required", { status: 400 })
    }
    if(!colorId) {
      return new NextResponse("Color id required", { status: 400 })
    }
    if(!images || !images.length) {
      return new NextResponse("Images is required", { status: 400 })
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

    const product = await prismadb.product.create({
      data: {
        name,
        categoryId,
        price,
        isFeatured,
        isArchived,
        sizeId,
        colorId,
        images: {
          createMany: { //???
            data: [
              ...images.map((image: { url: string }) => image)
            ]
          }
        },
        storeId: params.storeId
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCTS_POST]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}


export async function GET (
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get("categoryId") || undefined
    const isFeatured = searchParams.get("isFeatured") //???
    const sizeId = searchParams.get("sizeId") || undefined
    const colorId = searchParams.get("colorId") || undefined
    
    if(!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const product = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        isFeatured: isFeatured ? true: undefined, //???
        isArchived: false, //???
        sizeId,
        colorId
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCTS_GET]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}