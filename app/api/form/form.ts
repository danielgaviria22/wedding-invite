import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

type TFormData = {
  name: string;
  transport: string;
};

export async function sendFormData(request: NextRequest) {
  if (request.method === "POST") {
    const body = await request.json();
    const { name, transport }: TFormData = body;

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
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Hoja1!A:B",
        valueInputOption: "RAW",
        requestBody: {
          values: [[name, transport]],
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
