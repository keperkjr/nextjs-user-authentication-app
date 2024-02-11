import { NextRequest, NextResponse } from 'next/server'
import { getUser, createUserAsync } from '@/repository/userRepository'


export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        const existing = getUser(body.email);
        if (existing) {
            throw new Error(`A user with the email '${body.email}' already exists!`);
        }

        const user = await createUserAsync(body.name, body.email?.trim(), body.password);

        console.log('user created', user);
        return NextResponse.json({
            status: 'success',
            user
        });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            status: 'error',
            error: String(error?.message || '')
        }, 
        {
            status: 500
        });
    }
}