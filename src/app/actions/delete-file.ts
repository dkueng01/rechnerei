"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteFile(fileUrl: string) {
  if (!fileUrl) return;

  try {
    const fileKey = fileUrl.split("/f/")[1];

    if (!fileKey) {
      console.error("Invalid UploadThing URL:", fileUrl);
      return;
    }

    await utapi.deleteFiles(fileKey);
    console.log("Deleted old logo:", fileKey);
  } catch (error) {
    console.error("Error deleting file from UploadThing:", error);
  }
}