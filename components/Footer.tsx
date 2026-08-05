export default function Footer() {
  return (
    <footer className="border-t border-black/[.08] py-8 text-sm text-zinc-500 dark:border-white/[.12]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} iPhone eShop. Tous droits réservés.</p>
        <p>Téléphones & gadgets · Livraison offerte dès 50 €</p>
      </div>
    </footer>
  );
}
