import { Client } from "@opensearch-project/opensearch";
import crypto from "crypto";
import { NextResponse } from "next/server";
const client = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "admin",
    password: "admin",
  },
});

function generateRandomDate() {
  const startDate = new Date("2022-01-01").getTime();
  const currentDate = new Date().getTime();
  const randomTimestamp = startDate + Math.random() * (currentDate - startDate);
  return new Date(randomTimestamp).toISOString();
}
function generateRandomLog(index: string) {
  const randomNameNumber = Math.floor(Math.random() * 100);
  const randomMessageId = Math.floor(Math.random() * 1000000000);
  const randomPhoneNumber =
    "+1" + crypto.randomBytes(10).toString("hex").slice(0, 10);
  const randomEmail = `user${randomNameNumber}@example.com`;
  const randomDate = generateRandomDate();

  return {
    index: {
      _index: index,
      _id: crypto.randomUUID(),
    },
    name: `User ${randomNameNumber}`,
    phone: randomPhoneNumber,
    email: randomEmail,
    sentDate: randomDate,
    messageId: randomMessageId,
  };
}

export async function GET() {
  const actions = [];

  for (let i = 0; i < 10000; i++) {
    actions.push(generateRandomLog("billing"));
  }

  try {
    const response = await client.bulk({
      body: actions.flatMap((doc) => [{ index: doc.index }, doc]),
    });
    return NextResponse.json({ success: true, message: response.statusCode });
  } catch (error) {
    return NextResponse.json({ success: true, error });
  }
}
