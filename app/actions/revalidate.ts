"use server";

import { revalidatePath } from "next/cache";

/**
 * Server action to invalidate the Next.js Data Cache for a specific path.
 * This should be called by the Admin CMS after creating, updating, or deleting content
 * so that the public-facing site instantly reflects the new database state 
 * without requiring a full redeployment.
 */
export async function revalidateContent(path: string) {
  try {
    revalidatePath(path);
    return { success: true };
  } catch (error) {
    console.error(`Failed to revalidate path: ${path}`, error);
    return { success: false, error: "Failed to revalidate" };
  }
}
