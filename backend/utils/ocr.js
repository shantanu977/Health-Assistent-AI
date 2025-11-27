import Tesseract from "tesseract.js";
import fs from "fs";

export const extractText = async (filePath) => {
  const { data: { text } } = await Tesseract.recognize(filePath, "eng");
  fs.unlinkSync(filePath);     // delete file after extraction
  return text;
};

