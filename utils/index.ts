import { get } from "lodash";
import { ApolloError } from "@apollo/client";
import { TMessageError } from "api/errors";
import { FieldData } from "rc-field-form/es/interface";

export const extractFormError = (error: ApolloError): FieldData[] => {
  const messages: TMessageError[] =
    get(error?.graphQLErrors?.[0], "formError") || [];

  const fields: FieldData[] = [];

  for (const item of messages) {
    const [key] = Object.entries(item);
    fields.push({
      name: key[0],
      errors: [key?.[1]?.[0]],
    });
  }

  return fields;
};

export const isFormError = (error: ApolloError) => {
  return (
    error && typeof get(error?.graphQLErrors?.[0], "formError") === "object"
  );
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const DEFAULT_TABLE_LIMIT_ROW = 10;

export const safeParseJsonType = <T = unknown>(data: string): T | null => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};
