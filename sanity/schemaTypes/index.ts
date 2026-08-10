import type { SchemaTypeDefinition } from "sanity";
import { country } from "./country";
import { opportunity } from "./opportunity";
import { story } from "./story";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [country, opportunity, story, siteSettings],
};
