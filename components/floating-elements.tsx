"use client";

export function FloatingElements() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full blur-2xl opacity-30" />
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-pink-200 rounded-full blur-2xl opacity-30" />
    </div>
  );
}
