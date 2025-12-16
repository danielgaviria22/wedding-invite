import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

import { TEventData } from "@/types/invite.types";

export async function getEventData(request: NextRequest) {
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
      const eventId = searchParams.get("id");
      if (!eventId) {
        return NextResponse.json(
          { message: "Invite ID is required" },
          { status: 500 }
        );
      }
      const eventsData = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `events!A:G`,
      });
      const eventData = (eventsData.data.values || []).filter(
        (row) => row[0] === eventId
      )[0];
      return NextResponse.json(
        {
          data: {
            id: eventData[0],
            name: eventData[1],
            date: eventData[2],
            place: eventData[3],
            googleMaps: eventData[4],
            dressCode: eventData[5],
            templateId: eventData[6],
          } as TEventData,
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
