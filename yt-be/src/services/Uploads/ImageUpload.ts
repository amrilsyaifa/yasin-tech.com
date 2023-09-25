import { Request } from "express";
import mime from "mime";
import { join } from "path";
// import * as dateFn from 'date-fns';
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";
import { identityToken } from "../../constant/token";
import { verifyJWT } from "../../helpers/tokenHelper";

const ImageUpload = async (
  req: Request
): Promise<{
  fields: formidable.Fields;
  files: formidable.Files;
  id: string;
}> => {
  return new Promise(async (resolve, reject) => {
    let token: string | undefined;

    if (req.cookies && req.cookies?.[identityToken] && !token) {
      token = req.cookies[identityToken];
    } else if (req.headers.authorization) {
      token = req.headers.authorization.replace("Bearer ", "");
    }

    if (!token) {
      return reject({ status: 400, message: "Invalid request" });
    }
    const props = await verifyJWT<{
      sub: string;
      isRefreshToken?: boolean;
    }>(token);
    const { sub } = props;
    const uploadDir = join(
      process.env.ROOT_DIR || process.cwd(),
      // `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`
      `public/uploads/temp/${sub}`
    );

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        reject(e);
        return;
      }
    }

    const form = formidable({
      maxFiles: 2,
      maxFileSize: 10_000_000,
      uploadDir,
      filename: (name, _ext, part) => {
        const newName = name?.replace(/ /g, "-") || "unknown";
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${newName}-${uniqueSuffix}.${
          mime?.getExtension(part.mimetype || "") || "unknown"
        }`;
        return filename;
      },
      filter: (part) => {
        return part.name === "media";
      },
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      if (!files.media) reject(err);
      else resolve({ fields, files, id: sub });
    });
  });
};

export default ImageUpload;
