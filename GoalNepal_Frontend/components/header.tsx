import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#fefee3] border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        <div className="flex items-center gap-2">
          <Image
            src="/images/GoalNepalLogo.png"
            alt="GoalNepal Logo"
            width={100}
            height={100}
          />
        </div>

        <nav className="flex items-center gap-8 text-gray-700">
          <Link
            href="/tournaments"
            className="font-medium bg-gray-200 px-4 py-2 rounded-full"
          >
            Tournaments
          </Link>
          <Link href="/news">News</Link>
          <Link href="/saved">Saved</Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </div>
    </header>
  );
}
