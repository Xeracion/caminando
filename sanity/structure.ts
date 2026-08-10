import type { StructureResolver } from "sanity/structure";

/** Pins "Ajustes del sitio" as a singleton so editors can't accidentally create a second one. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.documentTypeListItem("opportunity").title("Oportunidades"),
      S.documentTypeListItem("story").title("Historias"),
      S.documentTypeListItem("country").title("Países"),
      S.divider(),
      S.listItem()
        .title("Ajustes del sitio")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
