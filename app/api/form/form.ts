import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { TGuestInfo } from "@/types/invite.types";

export async function sendFormData(request: NextRequest) {
  if (request.method === "POST") {
    const body = await request.json();
    const {
      guests: data,
      invite,
    }: { guests: Array<TGuestInfo>; invite: string } = body;

    const credentials = process.env.GOOGLE_API_CREDENTIALS;

    if (!credentials) {
      return NextResponse.json(
        { message: "Google API credentials are not defined" },
        { status: 500 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(
        Buffer.from(credentials, "base64").toString("utf-8")
      ),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!spreadsheetId) {
      return NextResponse.json(
        { message: "spreadsheet Id is not defined" },
        { status: 500 }
      );
    }

    try {
      const parsedData = data.map((guest: TGuestInfo) => [
        ...Object.values(guest),
        invite,
      ]);
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Hoja1!A:G",
        valueInputOption: "RAW",
        requestBody: {
          values: parsedData,
        },
      });
      return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
      console.error("Error sending data to Google Sheets:", error);
      return NextResponse.json(
        { message: "Error sending data to Google Sheets" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: `Method ${request.method} no available` },
      { status: 405 }
    );
  }
}
