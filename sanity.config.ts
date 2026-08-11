import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./lib/sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "caminando",
  title: "Caminando.lat — Panel de contenido",
  basePath: "/studio",
  projectId: projectId || "",
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    // "Vista previa" en el menú del Studio: el sitio real a un lado, clic en
    // una foto o un texto para saltar directo al campo que lo edita.
    presentationTool({
      title: "Vista previa",
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
