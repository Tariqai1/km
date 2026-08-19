import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import { comparePassword, signToken, COOKIE_CONFIG } from '@/lib/auth';
import { loginSchema } from '@/lib/validations';
import { ZodError } from 'zod';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { email, password } = loginSchema.parse(body);

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await comparePassword(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = signToken({
      userId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_CONFIG.name, token, COOKIE_CONFIG.options);

    return NextResponse.json({
      success: true,
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      }
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
