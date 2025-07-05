// Função para enviar imagens para a API interna que faz upload no Cloudinary
export const uploadImages = async (images: File[], category: string): Promise<string[]> => {
  if (!images.length) return [];

  const formData = new FormData();
  images.forEach((image, idx) => {
    formData.append('images', image);
  });
  formData.append('category', category);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Erro ao enviar imagens para o servidor.');
  }

  const data = await res.json();
  return data.urls as string[];
};
