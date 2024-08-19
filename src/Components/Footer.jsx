export default function Footer() {
  return (
    <footer className="bg-base-300 gap-6 mx-auto py-8 px-2">
      <small className="font-semibold sm:text-lg md:text-xl font-[lato]">&copy; {new Date().getFullYear()} All rights reserved.</small>
    </footer>
  );
}
