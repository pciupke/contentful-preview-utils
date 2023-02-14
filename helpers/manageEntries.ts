import { createClient } from "contentful-management";

export const client = createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken:
    process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_MANAGEMENT_TOKEN || "",
});

export const updateEntryAsDraft = async (entryId: string, data: any) => {
  try {
    const space = await client.getSpace(
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || ""
    );
    const environment = await space.getEnvironment(
      process.env.CONTENTFUL_ENV || "master"
    );
    const entry = await environment.getEntry(entryId);
    Object.keys(entry.fields).map((field) => {
      if (field !== "internal") {
        entry.fields[field]["en-US"] = data[field];
      }
    });
    await entry.update();
  } catch (error: any) {
    console.error(error);
  }
};

export const updateAndPublishEntry = async (entryId: string, data: any) => {
  try {
    const space = await client.getSpace(
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || ""
    );
    const environment = await space.getEnvironment(
      process.env.CONTENTFUL_ENV || "master"
    );
    const entry = await environment.getEntry(entryId);
    Object.keys(entry.fields).map((field) => {
      if (field !== "internal") {
        entry.fields[field]["en-US"] = data[field];
      }
    });
    const updatedEntry = await entry.update();
    await updatedEntry.publish();
  } catch (error: any) {
    console.error(error);
  }
};
