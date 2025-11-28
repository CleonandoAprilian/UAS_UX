import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Cari produk..." }) {
  return (
    <div className="flex justify-center mb-10">
      <div className="relative w-80">
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
          <span className="text-border h-8">|</span>
          <Search className="w-5 h-5" />
        </div>

        <input type="text" placeholder={placeholder} value={value} onChange={onChange} className="border border-border pl-10 pr-4 py-2 rounded-full w-full focus:ring-2 focus:ring-primary outline-none" />
      </div>
    </div>
  );
}
