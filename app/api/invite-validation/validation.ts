import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function getInviteValidation(request: NextRequest) {
  if (request.method === "GET") {
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
      const searchParams = request.nextUrl.searchParams;
      const inviteId = searchParams.get("id");
      if (!inviteId) {
        return NextResponse.json(
          { message: "Invite ID is required" },
          { status: 500 }
        );
      }
      const invitationsData = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `Hoja1!A:G`,
      });
      const confirmedGuests = (invitationsData.data.values || []).filter(
        (id) => id[6] === inviteId
      );
      return NextResponse.json(
        {
          data: { confirmedGuests },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error getting data from Google Sheets:", error);
      return NextResponse.json(
        { message: "Error getting data from Google Sheets" },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      { message: `Method ${request.method} no available` },
      { status: 405 }
    );
  }
}
