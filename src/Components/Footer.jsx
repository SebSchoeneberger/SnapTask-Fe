export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside className="flex flex-col gap-2">
        <div
          onClick={() => navigate("/")}
          className="flex gap-3 align-middle justify-center  hover:cursor-pointer"
        >
          <img className="w-8" src="src/assets/Logo.png" alt="Logo" />
          <p className="text-xl ">SnapTask</p>
        </div>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          SnapTask
        </p>
      </aside>
    </footer>
  );
}
