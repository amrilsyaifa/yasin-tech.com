import Mail from "nodemailer/lib/mailer";
import internal from "stream";

export interface SendingEmailProps {
  from: Mail.Address | string;
  to: Mail.Address | string;
  subject: string;
  text: string | Buffer | internal.Readable | Mail.AttachmentLike | undefined;
  html: string | Buffer | internal.Readable | Mail.AttachmentLike | undefined;
}
