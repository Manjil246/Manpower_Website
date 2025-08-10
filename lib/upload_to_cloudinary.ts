// utils/uploadToCloudinary.ts

export async function uploadFileToCloudinary(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Upload failed");
    }

    const result = await response.json();
    return result.url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
