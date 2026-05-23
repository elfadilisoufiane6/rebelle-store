import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Livraison — Rebelle",
};

export default function Livraison() {
  return (
    <LegalPage eyebrow="Partout au Maroc" title="Livraison">
      <p>
        On livre chaque sac avec le même soin qu&apos;on a mis à le choisir.
        Voici comment ça se passe.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Délais
      </h2>
      <p>
        <strong>2 à 4 jours ouvrables</strong> partout au Maroc. Les grandes
        villes — Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir — sont
        souvent livrées en 2-3 jours. 93% de nos commandes arrivent dans les
        délais annoncés.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Frais
      </h2>
      <p>
        <strong>Livraison gratuite</strong> sur toutes les commandes, partout
        au Maroc, sans condition de montant.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Paiement à la livraison
      </h2>
      <p>
        Tu ne paies rien au moment de la commande. Tu règles le montant total
        en espèces, au livreur, quand ton sac est dans tes mains. Aucune
        avance, aucun risque.
      </p>

      <h2 className="font-cormorant font-medium text-charcoal text-2xl mt-2">
        Suivi de commande
      </h2>
      <p>
        Notre équipe te contacte dès la prise en charge de ta commande pour
        confirmer la livraison et te tenir informée jusqu&apos;à la réception.
      </p>
    </LegalPage>
  );
}
