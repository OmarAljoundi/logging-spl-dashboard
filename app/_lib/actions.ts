export function mapOpenSearchFieldsToObjects(osResponse: any, prefix = "") {
  let fields: any = {};

  for (const topLevelKey in osResponse.properties) {
    const topLevelValue = osResponse.properties[topLevelKey];

    if (topLevelValue.properties) {
      const subFields = mapOpenSearchFieldsToObjects(
        topLevelValue,
        prefix ? `${prefix}.${topLevelKey}` : topLevelKey
      );
      fields = { ...fields, ...subFields };
    } else {
      const fieldName = prefix ? `${prefix}.${topLevelKey}` : topLevelKey;
      if (
        topLevelValue.fields &&
        topLevelValue.fields.keyword &&
        topLevelValue.fields.keyword.type
      ) {
        fields[`${fieldName}.${topLevelValue.fields.keyword.type}`] = {
          label: topLevelKey,
          type: MapOsType(topLevelValue.type),
        };
      } else {
        fields[fieldName] = {
          label: topLevelKey,
          type: MapOsType(topLevelValue.type),
        };
      }
    }
  }

  return fields;
}

function MapOsType(type: string): string {
  switch (type) {
    case "long":
      return "number";
    case "date":
      return "datetime";
    default:
      return type;
  }
}
