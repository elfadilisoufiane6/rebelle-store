import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Rebelle",
};

export default function PolitiqueConfidentialite() {
  return (
    <LegalPage
      eyebrow="Tes données, ta confiance"
      title="Politique de confidentialité"
    >
      <p>
        Rebelle respecte la confidentialité de ses clientes. Cette politique
        détaille comment nous collectons, utilisons et protégeons tes
        informations personnelles.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Données collectées
      </h2>
      <p>
        Nous collectons uniquement les informations nécessaires pour traiter ta
        commande&nbsp;: prénom, numéro de téléphone, adresse de livraison.
        Aucune information bancaire n&apos;est jamais demandée — tout se fait à
        la livraison.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Utilisation des données
      </h2>
      <p>
        Tes données servent exclusivement à&nbsp;: confirmer ta commande,
        organiser la livraison, te contacter en cas de question. Nous ne
        vendons, ne louons et ne partageons jamais tes informations avec des
        tiers.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Cookies et suivi
      </h2>
      <p>
        Nous utilisons des cookies de session pour le bon fonctionnement du
        site et de mesure d&apos;audience pour améliorer notre service.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Tes droits
      </h2>
      <p>
        Tu peux à tout moment demander la consultation, la modification ou la
        suppression de tes données en écrivant à contact@rebelle.ma.
      </p>
    </LegalPage>
  );
}
