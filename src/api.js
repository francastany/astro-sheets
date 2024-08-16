import { z } from "astro:content";
import slugify from "slugify";

export const projectSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  tipo: z.string(),
  precio: z.number(),
  stock: z.number(),
  estado: z.string(),
  imagen: z.string(),
});

const api = {
  list: async () => {
    const document = await fetch(
      "https://docs.google.com/spreadsheets/d/1u1bTtfC1ccZ8_7fVak7NXU2P0qsDlZqRzhWlKQQGlQ8/pub?output=tsv"
    ).then((res) => res.text());
    const rows = document
      .split("\n")
      .slice(1)
      .map((row) => row.trim().split("\t"));

    return rows.map(([nombre, tipo, precio, stock, estado, imagen]) =>
      projectSchema.parse({
        id: slugify(nombre, { lower: true }),
        nombre,
        tipo,
        precio: Number(precio),
        stock: Number(stock),
        estado,
        imagen,
      })
    );
  },
};

export default api;
