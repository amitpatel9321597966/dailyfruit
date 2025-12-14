export default function Footer() {
  return (
    <>
      {/* Normal Footer */}
      <footer className="bg-emerald-800 text-white py-8 mt-10">
        <div className="max-w-screen-xl mx-auto px-4 text-center space-y-2">
          <p className="text-xs text-emerald-100">
            DailyFruit is inspired by a family-owned local fruit shop, bringing fresh fruits to customers through simple and reliable technology.
          </p>
        </div>
            <div className="bg-red-800 text-white py-4 text-center">
      <p className="font-semibold">
        <a
          href="https://wa.me/9321597966"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          📞 Contact Via WhatsApp
        </a>
      </p>
      <p className="text-sm mt-1">© 2025 DailyFruit</p>
    </div>
      </footer>

      {/* Fixed Bottom Line with professional background */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 text-white py-2 text-center shadow-inner z-50">
        <p className="text-sm font-semibold tracking-wide">
          🍃 All fruits are freshly sourced and best consumed within 6–9 days. 🌱
        </p>
      </div>
    </>
  );
}


   
        
  

