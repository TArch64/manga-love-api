export interface TemplateConfig {
    name: string;
    data: Record<string, string>;
}

export interface MailConfig {
    subject: string;
    email: string;
    template: TemplateConfig;
}
