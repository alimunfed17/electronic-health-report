import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { baseUrl, firmPrefix, apiKey, username, password } =
      await req.json();

    if (!baseUrl || !firmPrefix || !apiKey || !username || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const authUrl = `${baseUrl}/${firmPrefix}/ema/ws/oauth2/grant`;

    const body = new URLSearchParams({
      grant_type: "password",
      username,
      password,
    });

    const response = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-api-key": apiKey,
        accept: "application/json",
      },
      body,
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: errText || "Failed to authenticate" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const res = NextResponse.json({
      success: true,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      scope: data.scope,
    });

    res.cookies.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });

    res.cookies.set("refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
