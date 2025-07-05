import { NextRequest, NextResponse } from 'next/server';

// Cloudinary SDK só pode ser usado no backend
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = 'nodejs'; // Garante que será executado no Node.js

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const category = formData.get('category') as string;
    const files = formData.getAll('images');

    if (!files.length) {
      return NextResponse.json({ error: 'Nenhuma imagem enviada.' }, { status: 400 });
    }

    const urls: string[] = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;
      // Converter File para buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // Upload para Cloudinary
      const result = await cloudinary.uploader.upload_stream({
        folder: `portal-aguas/${category}`,
        transformation: [
          { width: 1200, height: 800, crop: 'fill' },
          { quality: 'auto' }
        ]
      }, (error, result) => {
        if (error || !result) throw error || new Error('Erro no upload do Cloudinary');
        urls.push(result.secure_url);
      });
      // O upload_stream precisa de um stream, então:
      const stream = cloudinary.uploader.upload_stream({
        folder: `portal-aguas/${category}`,
        transformation: [
          { width: 1200, height: 800, crop: 'fill' },
          { quality: 'auto' }
        ]
      }, (error, result) => {
        if (error || !result) throw error || new Error('Erro no upload do Cloudinary');
        urls.push(result.secure_url);
      });
      stream.end(buffer);
      // Esperar o upload terminar
      await new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
      });
    }

    return NextResponse.json({ urls });
  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json({ error: 'Erro ao fazer upload das imagens.' }, { status: 500 });
  }
} 