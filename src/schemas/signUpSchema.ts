import { z } from "zod";

const nameField = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .min(2, `${label} must be at least 2 characters.`)
    .max(30, `${label} must be 30 characters or fewer.`);
