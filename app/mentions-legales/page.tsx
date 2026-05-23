import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Mentions légales — Rebelle" };

export default function MentionsLegales() {
  return (
    <LegalPage eyebrow="Informations légales" title="Mentions légales">
      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Éditeur du site
      </h2>
      <p>
        Le site rebelle.ma est édité par Rebelle, marque de maroquinerie féminine
        basée au Maroc.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Hébergement
      </h2>
      <p>
        Le site est hébergé sur une infrastructure cloud sécurisée respectant
        les standards internationaux.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Propriété intellectuelle
      </h2>
      <p>
        L&apos;ensemble des contenus, photos, textes et identité visuelle
        présents sur ce site sont la propriété de Rebelle et protégés par les
        lois en vigueur sur la propriété intellectuelle.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Contact
      </h2>
      <p>
        Pour toute question relative aux mentions légales, contacte-nous à
        contact@rebelle.ma.
      </p>
    </LegalPage>
  );
}
