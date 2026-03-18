export default function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#f5f3ef' }}>
      <div className="text-center" style={{ animation: 'fadeUp 1.2s ease forwards', opacity: 0 }}>
        <style>{`@keyframes fadeUp { to { opacity:1; transform:translateY(0); } } div { transform: translateY(30px); }`}</style>
        <h1 className="serif text-5xl md:text-6xl mb-8">Thank You</h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto mb-10 leading-relaxed">
          Your inquiry has been successfully sent. We'll carefully review your details and get back to you soon.
        </p>
        <a href="/" className="inline-block border border-black px-10 py-4 hover:bg-black hover:text-white transition">
          Return Home
        </a>
      </div>
    </div>
  )
}
