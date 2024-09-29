import { Enum } from "@solana/web3.js";

export class ProjectCategory extends Enum {
    static Technology = new ProjectCategory({ technology: "technology" });
    static Art = new ProjectCategory({ art: "art" });
    static Education = new ProjectCategory({ education: "education" });
    static Health = new ProjectCategory({ health: "health" });
    static Environment = new ProjectCategory({ environment: "environment" });
    static SocialImpact = new ProjectCategory({ socialImpact: "socialImpact" });
    static Entertainment = new ProjectCategory({ entertainment: "entertainment" });
    static Science = new ProjectCategory({ science: "science" });
    static Finance = new ProjectCategory({ finance: "finance" });
    static Sports = new ProjectCategory({ sports: "sports" });
}

