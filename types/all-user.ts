import { ReactNode } from "react";

export interface jsonObj {
    admin_stds: {
        matricNumber: string
    },
    others: {
        Name: string;
        PostalName: string | null;
        Passport: Buffer | string | null;
    }
}
