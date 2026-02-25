export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()

    // hapus aksen
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

    // ganti non huruf angka jadi dash
    .replace(/[^a-z0-9]+/g, "-")

    // hapus dash di awal akhir
    .replace(/^-+|-+$/g, "")

    // hapus dash double
    .replace(/-+/g, "-");
}