/**
 * BharatGram - Cloud Storage Abstraction (AWS S3 & Firebase Storage)
 * Handles image and short video reel uploads with CDN URLs and compression hints
 */

export interface UploadResult {
  url: string;
  key: string;
  contentType: string;
  sizeBytes: number;
}

export class StorageService {
  private static provider: 's3' | 'firebase' = 's3';

  /**
   * Generates a pre-signed PUT URL for direct client-to-S3 uploads
   * or direct Firebase Storage upload tokens
   */
  static async getPresignedUploadUrl(
    filename: string,
    contentType: string,
    folder: 'posts' | 'reels' | 'stories' | 'avatars' = 'posts'
  ): Promise<{ uploadUrl: string; finalUrl: string; key: string }> {
    const timestamp = Date.now();
    const cleanFileName = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const key = `bharatgram/${folder}/${timestamp}-${cleanFileName}`;

    // S3 configuration mockup
    const bucket = process.env.AWS_S3_BUCKET || 'bharatgram-media-cdn';
    const region = process.env.AWS_REGION || 'ap-south-1'; // AWS Mumbai Region

    const uploadUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}?mock_presigned_signature=true`;
    const finalUrl = `https://cdn.bharatgram.in/${key}`;

    return { uploadUrl, finalUrl, key };
  }

  /**
   * Mock direct file upload utility for development and local testing
   */
  static async uploadFile(
    file: File | Blob,
    filename: string,
    folder: 'posts' | 'reels' | 'stories' | 'avatars' = 'posts'
  ): Promise<UploadResult> {
    // In local demo/MVP mode, convert to ObjectURL or Base64 data URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          url: reader.result as string,
          key: `local-${Date.now()}-${filename}`,
          contentType: file.type,
          sizeBytes: file.size,
        });
      };
      reader.readAsDataURL(file);
    });
  }
}

