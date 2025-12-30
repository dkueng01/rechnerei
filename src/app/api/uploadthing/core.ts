import { stackServerApp } from "@/stack/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  companyLogo: f({
    "image/png": {
      maxFileSize: "1MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await stackServerApp.getUser();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Logo uploaded by:", metadata.userId);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;