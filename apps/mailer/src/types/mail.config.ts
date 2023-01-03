export interface TemplateConfig {
    name: string;
    data: Record<string, string>;
}

export interface MailCidAttachment {
    cid: string;
    filename: string;
    path: string;
}

export type MailAttachment = MailCidAttachment;

export interface MailConfig {
    subject: string;
    email: string;
    template: TemplateConfig;
    attachments?: MailCidAttachment[];
}
