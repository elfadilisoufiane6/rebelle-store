import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Politique de retour — Rebelle",
};

export default function PolitiqueRetours() {
  return (
    <LegalPage eyebrow="Satisfaction garantie" title="Politique de retour">
      <p>
        Chez Rebelle, ta satisfaction est notre engagement. Si ton sac ne te
        convient pas, on t&apos;explique comment le retourner — sans
        complication.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Délai de retour
      </h2>
      <p>
        Tu disposes de <strong>7 jours</strong> à compter de la réception pour
        retourner ton sac, sans avoir à justifier ta décision.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Conditions
      </h2>
      <p>
        Le sac doit être retourné dans son état d&apos;origine&nbsp;: non
        utilisé, avec son emballage et ses étiquettes. Tout retour non conforme
        pourra être refusé.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Procédure
      </h2>
      <p>
        Contacte-nous via contact@rebelle.ma ou Instagram pour initier le
        retour. Notre équipe organise alors la collecte de ton colis. Le
        remboursement est effectué dans les 7 jours suivant la réception du
        sac retourné.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Frais
      </h2>
      <p>
        Le premier retour est offert. Pour les retours suivants, des frais
        modestes peuvent s&apos;appliquer selon ta ville.
      </p>
    </LegalPage>
  );
}
